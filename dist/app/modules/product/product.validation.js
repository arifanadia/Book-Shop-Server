"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
exports.productValidationSchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    author: zod_1.z.string().min(3),
    price: zod_1.z.number().min(0, 'Price must be a positive number.'),
    category: zod_1.z.enum([
        'Fiction',
        'Science',
        'SelfDevelopment',
        'Poetry',
        'Religious',
    ]),
    description: zod_1.z.string().min(10),
    quantity: zod_1.z.number().min(1, 'Quantity must be a positive number.'),
    inStock: zod_1.z.boolean(),
});
