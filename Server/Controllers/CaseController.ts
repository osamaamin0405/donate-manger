import mongoose, { Model, model } from "mongoose";
import Controller from "./Controller";
import { Request, Response } from "express";
import caseSchema from "../Schema/CaseSchema";
import ResponseError from "../errorsController/ResponseError";
import path from "path";

export default class CaseController extends Controller {
  protected tbl: string = "cases";
  protected schema = caseSchema;
  protected model: Model<any>;
  constructor() {
    super();
    this.model = model(this.tbl, this.schema);
  }


  upload(req:Request){
    const filePath: String[] = [];
    if(req.files) {
        let index = 0;
        for(const file in req.files){
            const fileObj = req.files[file];
            //@ts-ignore
            let uri = path.join("/cases/docs", (Math.random() * 50000) + Date.now().toString() + "." + fileObj.name);
            if(index++ == 3){
                //@ts-ignore
                uri = path.join("/cases/images", (Math.random() * 50000) + Date.now().toString() + "." + fileObj.name);
            }
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
    return this.model
      .create({
        name: req.body.name,
        phone: req.body.phone,
        national_id: req.body.national_id,
        address: req.body.address,
        dob: req.body.dob,
        gender: req.body.gender,
        maritalStatus: req.body.marital_status,
        created_user: req.body.user.id,
        id_photo: filePath.slice(0, 2),
        image: filePath.slice(2)[0]
      })
      .then((result) => {
        return res.status(201).json({
          status: 201,
          message: `Case: ${result.name} Created Successfuly`,
          // case: result,
        });
      })
      .catch((err) => {
        if(err.code == 11000 ){
          //  handle unique value error;
          return new ResponseError(
            `${JSON.stringify(err['keyValue'])} is exist`,
            500,
            'unique value exist'
          ).responseErr(req,res);
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

    return this.model.findById(req.params.id)
      .then(doc=>{
        return res.json({
          message: "Success",
          data: doc,
        })
      })
      .catch(err=>{
        return new ResponseError(
          `Not Found Case By ID ${req.params.id}`,
          404,
          "NOT_FOUND",
          err
        ).responseErr(req, res);
      });

  }
  async all(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.params.page)-1,
          Perpage = parseInt(req.params.Perpage),
          column = req.params.col;
          let q  = new RegExp(req.params.q);
        //@ts-ignore
      if(column == "_id") q = req.params.q;
    const search = (column != undefined && req.params.q != undefined) ? {['' + column + '']: q} : {};
    return this.model.find(search)
              .skip(page * Perpage)
              .select(['name', 'national_id', 'gender', 'address', 'phone', 'dob', 'image'])
              .limit(Perpage)
              .sort({
                created_at: -1
              })
              .exec()
              .then(async docs=>{
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
              .catch(err=>{
                return new ResponseError('Error to Fetch Data', 500, 'Fetch Error', err).responseErr(req, res);
              })
    // return res.send({});
    // throw new Error("Method not implemented.");
  }

  async allInfo(req: Request, res: Response): Promise<Response>{
    let id;
    try{
      id =  new mongoose.Types.ObjectId(req.params.id)
    } catch{
      return new ResponseError("ID not correct", 404, 'SERVER_ERR').responseErr(req, res);
    }
    return this.model.aggregate(
      [
        {
          $match:{
              _id: id
          }
        },
        {$limit: 1},
        {
          $lookup:{
            from:"donations",
            foreignField: "case",
            localField: "_id",
            pipeline: [
                {
                    $match: {
                        $where:function(){
                            return this.case == req.params.id
                        },
                    }
                },
                {
                  $lookup:{
                    from:"categories",
                    foreignField: "_id",
                    localField: "category",
                    as: "category",
                    pipeline:[
                      {
                        $limit: 1
                      },
                      {
                        $project: {
                          category_name: 1
                        }
                      }
                    ]
                  }
                }
            ],
            as: "donations"
          }
        },
        {
          $lookup:{
            from:"users",
            foreignField: "_id",
            localField: "created_user",
            pipeline: [
                {
                    $match: {
                        $where:function(){
                            return this._id == '$case.created_user'
                        },
                    }
                },
                {
                  $project:{
                    fname: 1,
                    lname: 1,
                  }
                },
                {$limit: 1}
            ],
            as: "created_user"
          }
        }
      ]
    )
    .exec().then(docs=>{
      return res.json({
          status: 200,
          message: "Success",
          //findOne
          data: docs[0]
      })
  }).catch(err=>{
      return new ResponseError("Fild to fetch data", 500, 'SERVER_ERR', err).responseErr(req, res);
  });

  }

  async update(req: Request, res: Response): Promise<Response> {
    const filePath = this.upload(req),
      updateObej = {
        name: req.body.name,
        phone: req.body.phone,
        national_id: req.body.national_id,
        address: req.body.address,
        dob: req.body.dob,
        gender: req.body.gender,
        maritalStatus: req.body.marital_status,
        created_user: req.body.user.id,
      };

      if(filePath && filePath.length == 3){
        //@ts-ignore
        updateObej['id_photo'] = filePath.slice(0,2)
        //@ts-ignore
        updateObej['image'] = filePath.slice(2)[0];
      }
    
    return this.model.updateOne({_id:req.params.id},updateObej).then(doc=>{
      return res.json({
        name: "UPDATED",
        message: `${doc.modifiedCount} Row Updated Successfuly`,
        status: 200,
        data: doc,
      })
    })
    .catch(err=>{
      if(err.code == 11000 ){
        //  handle unique value error;
        return new ResponseError(
          `${JSON.stringify(err['keyValue'])} is exist`,
          500,
          'unique value exist'
        ).responseErr(req,res);
      }
      return new ResponseError(
        "Inrerval Server Error",
        500,
        "Server_ERR",
        err
      ).responseErr(req, res);
    })
  }

  async delete(req: Request, res: Response): Promise<Response>{
    return this.model.deleteOne({_id: req.params.id})
    .then(doc=>{
      return res.json({
        name: "DELETED",
        message: `${doc.deletedCount} Case Deleted Successfuly`,
        status: 200,
        data: doc,
      })
    })
    .catch(err=>{
      return new ResponseError(
        "Inrerval Server Error",
        500,
        "Server_ERR",
        err
      ).responseErr(req, res);
    })
  }
}
