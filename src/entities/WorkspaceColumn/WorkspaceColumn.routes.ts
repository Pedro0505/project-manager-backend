import express from 'express';
import rescue from 'express-rescue';
import * as Controller from './controllers';
import auth from '../../middlewares/auth';
import { validateCreateWorkspaceColumn } from '../../middlewares/CreateWorkspaceColumn';

const WorkspaceColumnRoutes = express.Router();

WorkspaceColumnRoutes.post('/', auth, validateCreateWorkspaceColumn, rescue(Controller.create));
WorkspaceColumnRoutes.put('/:id', auth, rescue(Controller.update));
WorkspaceColumnRoutes.patch('/', auth, rescue(Controller.updateMany));
WorkspaceColumnRoutes.delete('/:id', auth, rescue(Controller.exclude));

export { WorkspaceColumnRoutes };
