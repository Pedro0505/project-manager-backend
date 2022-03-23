import { IPayloadJwt } from "../../interfaces/IPayloadJwt";


declare global{
  namespace Express {
      interface Request {
        tokenData?: IPayloadJwt
      }
  }
}
