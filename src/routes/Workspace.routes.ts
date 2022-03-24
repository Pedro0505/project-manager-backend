import express from 'express';
import * as Controller from '../controllers/Workspace';

const WorkspaceRoutes = express.Router();

WorkspaceRoutes.post('/', Controller.Create);

export { WorkspaceRoutes };
