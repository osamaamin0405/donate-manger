import { Request, Response } from "express";
import ResponseError from "./ResponseError";

export default function PageNotFound(req: Request, res: Response) {
  const err = new ResponseError(`${req.originalUrl} Not Found`, 404);
  return err.responseErr(req, res);
}
