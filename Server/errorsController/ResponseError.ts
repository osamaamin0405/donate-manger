import { Request, Response } from "express";
// import { Result, ValidationError } from "express-validator";
export default class ResponseError {
  private msg: string;
  private statusCode: number;
  private name?: string;
  private errData?: any;
  constructor(
    msg: string,
    statusCode: number,
    name?: string,
    errData?: any
  ) {
    this.msg = msg;
    this.statusCode = statusCode;
    this.name = name;
    this.errData = errData;
  }

  responseErr(req: Request, res: Response): Response {
    return res.status(this.statusCode).json({
      error: true,
      name: this.name || "",
      message: this.msg,
      status: this.statusCode,
      errors: this.errData,
    });
  }
}
