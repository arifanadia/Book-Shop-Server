"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_model_1 = __importDefault(require("./order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const config_1 = __importDefault(require("../../config"));
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, product, quantity, totalPrice } = req.body;
        const orderProduct = yield product_model_1.default.findById(product);
        if (!orderProduct) {
            res.status(404).json({
                success: false,
                message: 'book are not found',
            });
            return;
        }
        if (quantity <= 0) {
            res.status(400).json({
                success: false,
                message: 'invalid input',
            });
        }
        if (orderProduct.quantity < quantity) {
            res.status(400).json({
                success: false,
                message: 'Insufficient stock for the order',
            });
        }
        order_service_1.orderService.updateProductStock(product, quantity, orderProduct);
        const existingOrder = yield order_service_1.orderService.existingOrder(email, product);
        if (existingOrder) {
            existingOrder.quantity += quantity;
            existingOrder.totalPrice += totalPrice;
            const updatedOrder = yield existingOrder.save();
            res.status(200).json({
                success: true,
                message: 'Order updated successfully',
                data: updatedOrder,
            });
        }
        else {
            const payload = { email, product, quantity, totalPrice };
            const newOrder = yield order_service_1.orderService.createOrder(payload);
            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: newOrder,
            });
            return;
        }
    }
    catch (error) {
        res.json({
            success: false,
            message: 'validation Error',
            error,
            stack: config_1.default.node_env === 'development'
                ? new Error('Something went wrong').stack
                : undefined,
        });
    }
});
const allOrderRevenue = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const revenue = yield order_model_1.default.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalPrice' },
                },
            },
        ]);
        const totalRevenue = (_a = revenue[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue;
        res.json({
            message: 'Revenue calculated successfully',
            success: true,
            data: { totalRevenue },
        });
    }
    catch (error) {
        res.json({
            message: 'Something went wrong',
            success: false,
            error,
            stack: config_1.default.node_env === 'development'
                ? new Error('Something went wrong').stack
                : undefined,
        });
    }
});
exports.orderController = {
    createOrder,
    allOrderRevenue,
};
