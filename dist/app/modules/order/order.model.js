"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    product: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Products',
        required: [true, 'Product is required'],
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});
const Orders = (0, mongoose_1.model)('Orders', orderSchema);
exports.default = Orders;
