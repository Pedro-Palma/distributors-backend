import { Router } from "express";
import * as productsController from "../controllers/products" 

const router = Router();

router
.post('/createProduct',productsController.createProduct)
.get('/getProductId/:id',productsController.getProductId)
.get('/getProducts',productsController.getProducts)
.delete('/deleteProduct/:id',productsController.deleteProduct)
.put('/updateProduct/:id',productsController.updateProduct)


export default router;
