import { Router } from "express";
import * as UserController from "../controllers/users"; 

const router = Router();

router
.post('/createUser',UserController.createUser)
.get('/getUserId/:id',UserController.getUserId)
.get('/getUsers',UserController.getUsers)
.delete('/deleteUser/:id',UserController.deleteUser)
.put('/updateUser/:id',UserController.updateUser)



export default router;
