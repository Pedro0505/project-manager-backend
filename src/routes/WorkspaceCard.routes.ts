import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/WorkspaceCard';
import { validateCreateWorkspaceCard } from '../middlewares/CreateWorkspaceCard';

const WorkspaceCardRoutes = express.Router();

WorkspaceCardRoutes.post('/', validateCreateWorkspaceCard, rescue(Controller.Create));

export { WorkspaceCardRoutes };
