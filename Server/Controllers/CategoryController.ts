import { Model, Schema, model } from "mongoose";
import Controller from "./Controller";
import { Request, Response } from "express";
import categorySchema from "../Schema/CategorySchema";
import ResponseError from "../errorsController/ResponseError";
import { config } from "dotenv";
import moment from "moment";
config();
export default class CategoryController extends Controller {
    protected model: Model<any, {}, {}, {}, any, any>;
    protected tbl: string = "categories";
    protected schema: Schema = categorySchema;

    constructor() {
        super();
        this.model = model(this.tbl, this.schema);
    }

    async create(req: Request, res: Response): Promise<Response> {
        return this.model
            .create({
                category_name: req.body.category_name,
                description: req.body.category_description,
                show_report_card: req.body.show_card
            })
            .then((result) => {
                return res.status(201).json({
                    status: 201,
                    message: `${result.category_name} Category Created Successfuly`,
                    // data: result,
                });
            })
            .catch((err) => {
                if (err.code == 11000) {
                    //  handle unique value error;
                    return new ResponseError(
                        `${JSON.stringify(err['keyValue'])} is exist`,
                        500,
                        'Creating user Fial!'
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

    async edit(req: Request, res: Response): Promise<Response> {
        return this.model
            .updateOne({_id: req.params.id},{
                category_name: req.body.category_name,
                description: req.body.category_description,
                show_report_card: req.body.show_card
            })
            .then((result) => {
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
                        `${JSON.stringify(err['keyValue'])} is exist`,
                        500,
                        'Creating user Fial!'
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
            .then(doc => {
                return res.json({
                    status: 200,
                    message: "success",
                    category: doc,
                })
            })
            .catch(err => {
                console.error(err)
                return new ResponseError(
                    "error",
                    500,
                    "server"
                ).responseErr(req, res);
            });
    }

    async all(req: Request, res: Response): Promise<Response> {
        const page = parseInt(req.params.page) - 1,
            Perpage = parseInt(req.params.Perpage),
            column = req.params.col,
            q = req.params.q,
            search = column != undefined ? { ['' + column + '']: new RegExp(q) } : {};
        return this.model.find(search)
            .skip(page * Perpage)
            .limit(Perpage)
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

    
    async statics(req: Request, res: Response): Promise<Response>{
        const   startDate = moment(new Date(req.params.date_from)).startOf("day"),
                DateMatch = {
                    $gte: startDate,
                    $lte: moment(new Date()).endOf("day"),
                };
        return await this.model.aggregate([
            {
                $match:{
                    show_report_card: true,
                },
            },
            {
                $lookup: {
                    from:"donations",
                    foreignField: "category",
                    localField: "_id",
                    pipeline: [
                        {
                            $match: {
                                $where:function(){
                                    return (DateMatch.$gte > this.created_at) && (this.created_at > DateMatch.$lte); 
                                },
                            }
                        }
                    ],
                    as: "donations"
                },
                
            }
        ]).exec().then(docs=>{
            return res.json({
                status: 200,
                message: "Success",
                data: this.convertToStaticsCard(docs),
            })
        }).catch(err=>{
            return new ResponseError("Fild to fetch data", 500, 'SERVER_ERR', err).responseErr(req, res);
        });
    }

    private convertToStaticsCard(arr: any[]){
        return arr.map(item=>{
            const totalValue = item.donations.reduce((prev: any, curr: any)=>{
                try{
                    return parseFloat(prev) + parseFloat(curr.value);
                }catch{
                    // ignore this row;
                    return 0;
                }
            }, 0);
            return {
                category_name: item.category_name,
                total_cases: item.donations.length,
                total_value: totalValue
            }
        })
    }

    async delete(req: Request, res: Response): Promise<Response> {
        return this.model.deleteOne({_id: req.params.id})
            .then(result=>{
                return res.json({
                    status:200,
                    message: `succsess ${result.deletedCount} category deleted Successfuly`,
                })
            })
            .catch(err=>{
                return new ResponseError("Fild to delete Category", 500, 'SERVER_ERR').responseErr(req, res);
            })
    }
}
