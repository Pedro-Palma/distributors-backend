import { Router } from "express";
import * as ProcessController from "../controllers/process-schedules"; 

const router = Router();

router
.post('/schedule',ProcessController.createProcessSchedules)
.get('/schedule',ProcessController.getProcessSchedules)
.get('/schedule/:id',ProcessController.getProcessSchedulesId)
.delete('/schedule/:id',ProcessController.deleteProcessSchedules)
.put('/schedule/:id',ProcessController.updateProcessSchedules)


export default router;
