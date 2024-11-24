import { Router } from "express";
import { productController } from "./product.controller";


const productRouter = Router();

productRouter.post('/create-book', productController.createBook)

export default productRouter;