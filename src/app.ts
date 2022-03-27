import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middlewares';
import { UserRoutes, WorkspaceCardRoutes, WorkspaceColumnRoutes, WorkspaceRoutes } from './routes';
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user', UserRoutes);
app.use('/workspace', WorkspaceRoutes);
app.use('/column', WorkspaceColumnRoutes);
app.use('/card', WorkspaceCardRoutes);

app.use(errorMiddleware);

export default app;
