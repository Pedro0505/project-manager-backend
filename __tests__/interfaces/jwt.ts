import { JwtPayload } from "jsonwebtoken";

export interface IDecoded extends JwtPayload {
  tokenData: { 
    email: string;
    userId: string;
   }
}
