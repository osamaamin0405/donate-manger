import { sign, verify } from "jsonwebtoken";
import { config } from "dotenv";
config();

export default class TokenManger {
  public static createToken(data: Object) {
    return new Promise((resolve, reject) => {
      sign(
        data,
        //@ts-ignore
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: process.env.LOGIN_EXPIRE,
        },
        (err, encoded) => {
          if (err) return reject(err);
          return resolve(encoded);
        }
      );
    });
  }
  public static decodeToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(
        token,
        //@ts-ignore
        process.env.JWT_SECRET_KEY,
        (err, decoded) => {
          if (err) return reject(err);
          return resolve(decoded);
        }
      );
    });
  }
}
