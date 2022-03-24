import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/WorkspaceColumn';

const WorkspaceColumnRoutes = express.Router();

WorkspaceColumnRoutes.post('/', rescue(Controller.Create));

export { WorkspaceColumnRoutes };
