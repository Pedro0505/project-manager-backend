import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/Workspace';

const WorkspaceRoutes = express.Router();

WorkspaceRoutes.post('/', rescue(Controller.Create));

export { WorkspaceRoutes };
