import { JwtPayload } from 'jsonwebtoken';
import { IPayloadJwt } from './IPayloadJwt';

export interface IDecoded extends JwtPayload {
  tokenData: IPayloadJwt
}
