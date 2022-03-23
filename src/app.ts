import express from 'express';
import errorMiddleware from './middlewares/error';
import { UserRoutes, WorkspaceCardRoutes, WorkspaceColumnRoutes, WorkspaceRoutes } from './routes';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/user', UserRoutes);
app.use('/workspace', WorkspaceRoutes);
app.use('/column', WorkspaceColumnRoutes);
app.use('/card', WorkspaceCardRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log('Online'));
