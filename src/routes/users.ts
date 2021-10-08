import { Router } from "express";
import * as UserController from "../controllers/users"; 

const router = Router();

router
.post('/user',UserController.createUser)
.get('/user/:id',UserController.getUserId)
.get('/user',UserController.getUsers)
.delete('/user/:id',UserController.deleteUser)
.put('/user/:id',UserController.updateUser)



export default router;
