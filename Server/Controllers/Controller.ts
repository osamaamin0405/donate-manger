import { Request, Response } from "express";
import { model, Model as mongoModel } from "mongoose";
import DBConection from "../db/DBConnection";
import Model from "../Schema/Model";

export default abstract class Controller extends DBConection {
  protected abstract model: mongoModel<any>;
  abstract create(
    req: Request,
    res: Response,
    ...prams: []
  ): Response | Promise<Response>;
  abstract get(
    req: Request,
    res: Response,
    ...prams: []
  ): Response | Promise<Response>;
  abstract all(
    req: Request,
    res: Response,
    ...prams: []
  ): Response | Promise<Response>;
  abstract delete(
    req: Request,
    res: Response,
    ...prams: []
  ): Response | Promise<Response>;
}
