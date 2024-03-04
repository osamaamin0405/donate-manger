import { connect } from "mongoose";
import { config } from "dotenv";
config();
export default class DBConection {
  private connection;
  constructor() {
    //@ts-ignore
    this.connection = connect(process.env.DB_URL)
      .then(() => {
        console.log("DB connection success");
      })
      .catch((err) => {
        console.error("DB connection err", err);
      });
  }
}
