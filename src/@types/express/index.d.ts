import { IPayloadJwt } from "../../interfaces/jwt/IPayloadJwt";

declare module 'express-serve-static-core' {
  interface Request {
    tokenData?: IPayloadJwt
  }
}
