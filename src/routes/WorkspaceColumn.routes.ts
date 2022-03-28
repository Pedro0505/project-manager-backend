import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/WorkspaceColumn';
import { validateCreateWorkspaceColumn } from '../middlewares/CreateWorkspaceColumn';

const WorkspaceColumnRoutes = express.Router();

WorkspaceColumnRoutes.post('/', validateCreateWorkspaceColumn, rescue(Controller.Create));

export { WorkspaceColumnRoutes };
