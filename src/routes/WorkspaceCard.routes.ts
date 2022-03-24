import express from 'express';
import rescue from 'express-rescue';
import * as Controller from '../controllers/WorkspaceCard';

const WorkspaceCardRoutes = express.Router();

WorkspaceCardRoutes.post('/', rescue(Controller.Create));

export { WorkspaceCardRoutes };
