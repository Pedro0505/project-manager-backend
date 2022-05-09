import express from 'express';
import rescue from 'express-rescue';
import * as Controller from './controllers';
import { validateCreateWorkspace } from '../../middlewares';
import auth from '../../middlewares/auth';

const WorkspaceRoutes = express.Router();

WorkspaceRoutes.post('/', auth, validateCreateWorkspace, rescue(Controller.create));
WorkspaceRoutes.patch('/:id', auth, rescue(Controller.updateName));
WorkspaceRoutes.get('/', auth, rescue(Controller.getAll));
WorkspaceRoutes.get('/:id', auth, rescue(Controller.getById));
WorkspaceRoutes.delete('/:id', auth, rescue(Controller.exclude));

export { WorkspaceRoutes };
