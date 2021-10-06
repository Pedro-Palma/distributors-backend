import { Router } from "express";
import * as distributorsController from "../controllers/distributors" 

const router = Router();

router
.post('/createDistributor',distributorsController.createDistributor)
.get('/getDistributorId/:id',distributorsController.getDistributorId)
.get('/getDistributors',distributorsController.getDistributors)
.delete('/deleteDistributor/:id',distributorsController.deleteDistributor)
.put('/updateDistributor/:id',distributorsController.updateDistributor)

export default router;

