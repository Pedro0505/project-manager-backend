import express from 'express';
import { UserRoutes, WorkspaceCardRoutes, WorkspaceColumnRoutes, WorkspaceRoutes } from './routes';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use('/user', UserRoutes);
app.use('/workspace', WorkspaceRoutes);
app.use('/column', WorkspaceColumnRoutes);
app.use('/card', WorkspaceCardRoutes);

app.listen(PORT, () => console.log('Online'));
