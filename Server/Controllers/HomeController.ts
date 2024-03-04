import { ParamsDictionary } from "express-serve-static-core";
import { Model } from "mongoose";
import { ParsedQs } from "qs";
import Controller from "./Controller";
import { Request, Response } from "express";

export default class HomeController extends Controller {
    protected model: Model<any, {}, {}, {}, any, any>;
    create(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    get(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    all(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    delete(req: Request, res: Response): Promise<Response> {
        throw new Error("Method not implemented.");
    }
    
}