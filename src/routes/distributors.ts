import { Router } from "express";
import * as distributorsController from "../controllers/distributors" 

const router = Router();

router
.post('/distributor',distributorsController.createDistributor)
.get('/distributor/:id',distributorsController.getDistributorId)
.get('/distributor',distributorsController.getDistributors)
.delete('/distributor/:id',distributorsController.deleteDistributor)
.put('/distributor/:id',distributorsController.updateDistributor)
.post('/distributor/all',distributorsController.createDistributorComplete)

export default router;

