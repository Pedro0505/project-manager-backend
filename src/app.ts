import express, { Request, Response } from 'express';
import prisma from './prisma';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', async (_req: Request, res:Response) => {
  const getAll = await prisma.user.findMany({ include: { workspaces: true } });

  res.status(200).json(getAll);
});

app.listen(PORT, () => console.log('Online'));
