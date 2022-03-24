import express from 'express';
import * as Controller from '../controllers/WorkspaceColumn';

const WorkspaceColumnRoutes = express.Router();

WorkspaceColumnRoutes.post('/', Controller.Create);

export { WorkspaceColumnRoutes };
