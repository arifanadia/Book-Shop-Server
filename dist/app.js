"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_router_1 = __importDefault(require("./app/modules/product/product.router"));
const order_router_1 = __importDefault(require("./app/modules/order/order.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/api/products', product_router_1.default);
app.use('/api/orders', order_router_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to book store!');
});
exports.default = app;
