import ResponseError from "./ResponseError";
export default class CustomeErr extends ResponseError {
  constructor(msg: string, status: number) {
    super(msg, status);
  }
}
