import { IPayloadJwt } from "../../interfaces/IPayloadJwt";

declare module 'express-serve-static-core' {
  interface Request {
    tokenData?: IPayloadJwt
  }
}
