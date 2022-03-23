import 'dotenv/config';
import express, { Request, Response } from 'express';
import prisma from './prisma';

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', async (_req: Request, res: Response) => {
  const getAll = await prisma.user.findMany({
    include: {
      workspaces: {
        include: { columns: { include: { cards: true } } },
      },
    },
  });

  res.status(200).json(getAll);
});

app.listen(PORT, () => console.log('Online'));
