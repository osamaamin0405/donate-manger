import { model as mongomodel, Schema, Model as MongoModel } from "mongoose";
import DBConection from "../db/DBConnection";

export default class Model extends DBConection {
  protected tbl: string = "";
  protected schema: Schema = new Schema();
  protected model: MongoModel<any>;
  constructor() {
    super();
    this.model = mongomodel(this.tbl, this.schema);
  }
}
