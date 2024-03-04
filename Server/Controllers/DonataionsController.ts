import { Model, Schema, model } from "mongoose";
import Controller from "./Controller";
import { Request, Response } from "express";
import ResponseError from "../errorsController/ResponseError";
import { config } from "dotenv";
import { donationsSchema } from "../Schema/DontationsSchema";
import fileUpload from "express-fileupload";
import path from "path";
import moment from "moment";
config();
export default class DonataionsController extends Controller {
    protected model: Model<any, {}, {}, {}, any, any>;
    protected tbl: string = "donations";
    protected schema: Schema = donationsSchema;

    constructor() {
        super();
        this.model = model(this.tbl, this.schema);
    }


    upload(req:Request){
        const filePath: String[] = [];
        if(req.files) {
            for(const file in req.files){
                const fileObj = req.files[file];
                //@ts-ignore
                const uri = path.join("/donations/docs", (Math.random() * 50000) + Date.now().toString() + "." + fileObj.name);
                //@ts-ignore
                const filepath = path.join("./uploads", uri)
                //@ts-ignore
                fileObj.mv(filepath, function(err){
                    if(err) throw err;
                })
                filePath.push(uri);
            }
        }
        return filePath;
    }

    async create(req: Request, res: Response): Promise<Response> {
        const filePath = this.upload(req);
        return this.model.create({
                number: req.body.fund_number,
                value: req.body.fund_value,
                note: req.body.fund_note,
                docs: filePath,
                case: req.body.case_id,
                category: req.body.fund_category,
                created_user: req.body.user.id,
            })
            .then((result) => {
                return res.status(201).json({
                    status: 201,
                    message: `${result.value} Donations Success`,
                    // data: result,
                });
            })
            .catch((err) => {
                if (err.code == 11000) {
                    //  handle unique value error;
                    return new ResponseError(
                        `Donation ${JSON.stringify(err['keyValue'])} is exist`,
                        500,
                        'DONATIONS_FIAL!'
                    ).responseErr(req, res);
                }
                return new ResponseError(
                    "Inrerval Server Error",
                    500,
                    "Server_ERR",
                    err
                ).responseErr(req, res);
            });
    }

    async createCollection(req: Request, res: Response): Promise<Response> {
        const filePath = this.upload(req);
        let  data = JSON.parse(req.body.data);
        data = data.map((caseItem:any)=>{
                return{
                    number: Math.floor(Math.random() * 500000),
                    value: caseItem.value,
                    note: caseItem.note,
                    docs: filePath,
                    case: caseItem.id,
                    category: req.body.fund_category,
                    created_user: req.body.user.id,
                };
        });
        return this.model.insertMany(data)
        .then((result) => {
            return res.status(201).json({
                status: 201,
                message: `${result.length} Donations Succsess`,
                // data: result,
            });
        })
        .catch((err) => {
            if (err.code == 11000) {
                //  handle unique value error;
                return new ResponseError(
                    `Donation (number) is Exist, Please change it.`,
                    500,
                    'DONATIONS_FIAL!'
                ).responseErr(req, res);
            }
            return new ResponseError(
                "Inrerval Server Error",
                500,
                "Server_ERR",
                err
            ).responseErr(req, res);
        });
    }

    async update(req: Request, res: Response): Promise<Response> {
        const filePath = this.upload(req);
        const updateObject = {
            number: req.body.fund_number,
            value: req.body.fund_value,
            note: req.body.fund_note,
            case: req.body.case_id,
            category: req.body.fund_category,
            created_user: req.body.user.id,
        };

        //@ts-ignore set update file or igonre it to not modify orignal value if empty;
        if(filePath) updateObject['docs'] = filePath;

        return this.model.updateOne({_id: req.params.id}, updateObject).then((result) => {
            return res.status(201).json({
                status: 201,
                message: `${result.modifiedCount} Rows updated Successfuly`,
                // data: result,
            });
        })
        .catch((err) => {
            if (err.code == 11000) {
                //  handle unique value error;
                return new ResponseError(
                    `Donation ${JSON.stringify(err['keyValue'])} is exist`,
                    500,
                    'UPDATE_ERR'
                ).responseErr(req, res);
            }
            return new ResponseError(
                "Inrerval Server Error",
                500,
                "Server_ERR",
                err
            ).responseErr(req, res);
        });
    }

    async get(req: Request, res: Response): Promise<Response> {
        return this.model.findOne({ _id: req.params.id })
            .populate("created_user", "username")
            .populate("case", "name")
            .populate("category", "category_name")
            .exec()
            .then(doc => {
                const user = doc
                return res.json({
                    status: 200,
                    message: "success",
                    donation: doc,
                })
            })
            .catch(err => {
                console.error(err)
                return new ResponseError(
                    "Fild to fetch data",
                    500,
                    "SERVER_ERR",
                ).responseErr(req, res);
            });
    }

    async all(req: Request, res: Response): Promise<Response> {
        const page = parseInt(req.params.page) - 1,
            Perpage = parseInt(req.params.Perpage),
            column = req.params.col;
        let q:any = req.params.q;        
        
        switch(column){
            case "case": 
                q = await this.model.schema.methods.findByCaseName(new RegExp(q, "g")) || '';
                break;
            case "category":
                q = await this.model.schema.methods.findByCategoryName(new RegExp(q, "g")) || '';
                break;
            case "created_user":
                q = await this.model.schema.methods.findByCreatedUser(new RegExp(q, "g")) || ''
                break;
            case "created_at":
                const startDate = moment(new Date(q)).startOf("day"),
                    endDate = moment(new Date(q)).endOf("day")
                q = {
                    $gte: startDate,
                    $lte: endDate,
                };
                break;
            default:
                q = new RegExp(q);
                break;
        }


        const search = (column != undefined && q != '') ? { ['' + column + '']: Array.isArray(q) ? {$in:  q} : q} : {};
        return this.model.find(search)
            .skip(page * Perpage)
            .limit(Perpage)
            .populate("case", "name")
            .populate("category", "category_name")
            .populate("created_user", "username")
            .sort({created_at: -1})
            .exec()
            .then(async docs => {
                const total = await this.model.count();
                return res.json({
                    data: docs,
                    message: "succsess",
                    status: 200,
                    total: total,
                    page: page,
                    records: docs.length,
                })
            })
            .catch(err => {
                return new ResponseError("Fialed to fetch data", 500, 'SERVER_ERR', err).responseErr(req, res);
            })

    }


    async delete(req: Request, res: Response): Promise<Response> {
        return this.model.deleteOne({_id: req.params.id})
                .then(result=>{
                    return res.json({
                        status: 200,
                        message: `${result.deletedCount} Donation Deleted Successfuly`,
                    })
                }).catch(err=>{
                    return new ResponseError("fild To delete donation contact admin", 500, "SERVER_ERR", err).responseErr(req, res);
                })    
    }
}
