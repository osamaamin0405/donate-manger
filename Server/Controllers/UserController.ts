import { Model, Schema, model } from "mongoose";
import Controller from "./Controller";
import { Request, Response } from "express";
import userSchema from "../Schema/UserSchema";
import ResponseError from "../errorsController/ResponseError";
import PasswordManger from "../utils/PasswordManger";
import TokenManger from "../utils/TokenManger";
import { config } from "dotenv";
import path = require("path");
config();
export default class UserController extends Controller {
  protected model: Model<any, {}, {}, {}, any, any>;
  protected tbl: string = "users";
  protected schema: Schema = userSchema;
  
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
              const uri = path.join("images/users", (Math.random() * 50000) + Date.now().toString() + "." + fileObj.name);
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
    const filePath =  this.upload(req);
    return this.model
      .create({
        fname: req.body.fname,
        lname: req.body.lname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: PasswordManger.hash(req.body.password),
        image: filePath[0],
        gender: req.body.gender,
        role: req.body.role,
      })
      .then((result) => {
        return res.status(201).json({
          status: 201,
          message: `${result.fname + ' ' + result.lname} Created Successfuly`,
          data: result,
        });
      })
      .catch((err) => {
        if(err.code == 11000 ){
          //  handle unique value error;
          return new ResponseError(
            `${JSON.stringify(err['keyValue'])} is exist`,
            500,
            'Creating user Fial!'
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

  async update(req: Request, res: Response): Promise<Response>{
    const filePath = this.upload(req),
      updateObje = {
      fname: req.body.fname,
      lname: req.body.lname,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      role: req.body.role,
    };

    if(req.body.password){
      //@ts-ignore
      updateObje['password'] = PasswordManger.hash(req.body.password);
    }
    if(filePath.length == 1){
      //@ts-ignore
      updateObje['image'] = filePath[0];
    }
    return this.model.updateOne({_id: req.params.id}, updateObje).then((result) => {
      return res.status(201).json({
        status: 200,
        message: `${result.modifiedCount} Rows updated Successfuly`,
        data: result,
      });
    })
    .catch((err) => {
      if(err.code == 11000 ){
        //  handle unique value error;
        return new ResponseError(
          `${JSON.stringify(err['keyValue'])} is exist`,
          500,
          'Creating user Fial!'
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

  async login(req: Request, res: Response): Promise<Response> {
    const username = req.body.username,
        password = req.body.password;
    return this.model.findOne({$or: [{username: username}, {email: username}]}).then((doc)=>{
      const user:any = doc;
      const pass = PasswordManger.compare(password, user.password);
      if(pass){
        delete user._doc.password
        return TokenManger.createToken({
          id: user._id,
          image: user.image,
          role: user.role,
          status: user.status,
        }).then(token=>{
          return res.json({
            message: "login Sucsess",
            status: 200,
            token: token,
            user
          });

        }).catch(err=>{
          console.error(err)
          return new ResponseError("Invalid login Contact adminstrtor", 400).responseErr(req, res);
        })
      }
      return new ResponseError("Invalid username or password if you forget password contact admim", 401).responseErr(req, res);
    }).catch(err=>{
      console.error(err);
      return new ResponseError("username not found contact admin", 401).responseErr(req, res);
    });

  }



  async getAuthUser(req: Request, res: Response): Promise<Response> {
    
    return this.model.findOne({_id: req.body.user.id})
      .select("-password")
      .then(doc=>{
        const user = doc
        return res.json({
          status: 200,
          message: "success",
          user
        })
      })
      .catch(err=>{
        console.error(err)
        return new ResponseError(
          "error",
          500,
          "server"
        ).responseErr(req, res);
      });
  }

  async get(req: Request, res: Response): Promise<Response> {
    
    return this.model.findOne({_id: req.params.id})
      .select("-password")
      .then(doc=>{
        return res.json({
          status: 200,
          message: "success",
          user:doc
        })
      })
      .catch(err=>{
        console.error(err)
        return new ResponseError(
          "Not Found User",
          404,
          "NOT_FOUND"
        ).responseErr(req, res);
      });
  }


  async all(req: Request, res: Response): Promise<Response> {
    const page = parseInt(req.params.page)-1,
          Perpage = parseInt(req.params.Perpage),
          column = req.params.col,
          q = req.params.q,
    search = column != undefined ? {['' + column + '']: new RegExp(q)} : {};
    return this.model.find(search)
            .select(['fname', 'lname', 'email', 'gender', 'role', 'phone', 'username'])
            .skip(page * Perpage)
            .limit(Perpage)
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
              return new ResponseError("Fialed to fetch data", 500, 'SERVER_ERR', err).responseErr(req, res);
            })

  }

  async delete(req: Request, res: Response): Promise<Response> {
    return this.model.deleteOne({_id: req.params.id})
    .then(doc=>{
      return res.json({
        name: "DELETED",
        message: `${doc.deletedCount} User Deleted Successfuly`,
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
