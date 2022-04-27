import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './middlewares';
import 'dotenv/config';
import { UserRoutes } from './entities/User/User.routes';
import { WorkspaceRoutes } from './entities/Workspace/Workspace.routes';
import { WorkspaceColumnRoutes } from './entities/WorkspaceColumn/WorkspaceColumn.routes';
import { WorkspaceCardRoutes } from './entities/WorkspaceCard/WorkspaceCard.routes';

const app = express();

app.use(express.json());
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'] }));

app.use('/user', UserRoutes);
app.use('/workspace', WorkspaceRoutes);
app.use('/column', WorkspaceColumnRoutes);
app.use('/card', WorkspaceCardRoutes);

app.use(errorMiddleware);

export default app;
