import express, { Request, Response } from 'express';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (_req: Request, res:Response) => {
  res.status(200).json('po');
});

app.listen(PORT, () => console.log('Online'));
