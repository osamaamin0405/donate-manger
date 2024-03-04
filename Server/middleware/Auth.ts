import express from "express";
import TokenManger from "../utils/TokenManger";
import ResponseError from "../errorsController/ResponseError";

export function auth(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction
) {
  const token = request.headers.authorization?.split(" ")[1];
  return TokenManger.decodeToken(token as string)
    .then(decoded => {
          request.body.user = decoded;
          return next();
    })
    .catch(error=>{
      return new ResponseError(
        "Not Authorized. Please Login",
        401,
        "Authorization Error",
      ).responseErr(request, response);
    });
}
