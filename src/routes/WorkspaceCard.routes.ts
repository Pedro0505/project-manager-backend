import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/WorkspaceCard';
import auth from '../middlewares/auth';
import { validateCreateWorkspaceCard } from '../middlewares/CreateWorkspaceCard';

const WorkspaceCardRoutes = express.Router();

WorkspaceCardRoutes.post('/', validateCreateWorkspaceCard, rescue(Controller.create));
WorkspaceCardRoutes.delete('/:id', auth, rescue(Controller.exclude));

export { WorkspaceCardRoutes };
