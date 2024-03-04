import * as bcrypt from "bcrypt";
import { config } from "dotenv";
config();
export default class PasswordManger {
  static hash(password: string): string {
    return bcrypt.hashSync(password + process.env.ADDED_PASSWORD, parseInt(process.env.SALT_ROUND as string))
  }
  static compare(password: string, hashed_password: string): boolean {
    return bcrypt.compareSync(password + process.env.ADDED_PASSWORD, hashed_password)
  }
}
