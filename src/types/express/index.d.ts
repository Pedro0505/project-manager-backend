import { IPayloadJwt } from "../../interfaces/IPayloadJwt";

declare namespace Express {
  interface Request {
    tokenData?: IPayloadJwt
  }
}
