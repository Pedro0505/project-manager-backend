import jwt, { SignOptions } from 'jsonwebtoken';
import { IPayloadJwt } from '../interfaces/IPayloadJwt';

const jwtConfig: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWT_SECRET = process.env.JWT_SECRET || 'BatatinhaFrita123';

export default (playload: IPayloadJwt) => jwt.sign({ tokenData: playload }, JWT_SECRET, jwtConfig);
