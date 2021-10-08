import { Router } from "express";
import * as productsController from "../controllers/products" 

const router = Router();

router
.post('/product',productsController.createProduct)
.get('/product/:id',productsController.getProductId)
.get('/product',productsController.getProducts)
.delete('/product/:id',productsController.deleteProduct)
.put('/product/:id',productsController.updateProduct)


export default router;
