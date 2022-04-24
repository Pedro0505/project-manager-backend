import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/WorkspaceCard';
import auth from '../middlewares/auth';
import { validateCreateWorkspaceCard } from '../middlewares/CreateWorkspaceCard';
import { updateWorkspaceCard } from '../middlewares/UpdateWorkspaceCard';

const WorkspaceCardRoutes = express.Router();

WorkspaceCardRoutes.post('/', auth, validateCreateWorkspaceCard, rescue(Controller.create));
WorkspaceCardRoutes.delete('/:id', auth, rescue(Controller.exclude));
WorkspaceCardRoutes.patch('/:id', auth, updateWorkspaceCard, rescue(Controller.update));
WorkspaceCardRoutes.patch('/', auth, rescue(Controller.updateMany));

export { WorkspaceCardRoutes };
