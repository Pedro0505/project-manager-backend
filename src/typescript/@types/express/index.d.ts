import { IPayloadJwt } from '../../interfaces/jwt/IPayloadJwt';

declare global {
  namespace Express {
    interface Request {
      tokenData: IPayloadJwt;
    }
  }
}
