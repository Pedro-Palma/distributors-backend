import { Router } from "express";
import * as ProcessController from "../controllers/process-schedules"; 

const router = Router();

router
.post('/createProcessSchedules',ProcessController.createProcessSchedules)
.get('/getProcessSchedules',ProcessController.getProcessSchedules)
.get('/getProcessSchedulesId/:id',ProcessController.getProcessSchedulesId)
.delete('/deleteProcessSchedules/:id',ProcessController.deleteProcessSchedules)
.put('/updateProcessSchedules/:id',ProcessController.updateProcessSchedules)


export default router;
