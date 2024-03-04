import { validationResult, ContextRunner } from "express-validator";
import express from "express";
import ResponseError from "../errorsController/ResponseError";

// sequential processing, stops running validations chain if the previous one fails.
const validate = (validations: ContextRunner[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return new ResponseError(
      "Bad Request",
      400,
      "Bad Request",
      errors.mapped()
    ).responseErr(req, res);
  };
};



export default validate;
