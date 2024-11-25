"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const productRouter = (0, express_1.Router)();
productRouter.post('/create-book', product_controller_1.productController.createBook);
productRouter.get('/', product_controller_1.productController.getAllBook);
productRouter.get('/:productId', product_controller_1.productController.getSingleBook);
productRouter.put('/:productId', product_controller_1.productController.updateBook);
productRouter.delete('/:productId', product_controller_1.productController.deleteBook);
exports.default = productRouter;
