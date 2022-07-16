import { Request } from 'express';

interface IPayloadJwt {
  email: string;
  userId: string;
}

export interface IRequestToken extends Request {
  tokenData: IPayloadJwt;
}
