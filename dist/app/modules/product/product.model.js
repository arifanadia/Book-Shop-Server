"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Please provide your book title.'],
    },
    author: {
        type: String,
        required: [true, "Please provide the author's name."],
    },
    price: {
        type: Number,
        required: [true, 'Please specify the price of the book.'],
        min: [0, 'Price must be a positive number.'],
    },
    category: {
        type: String,
        enum: {
            values: [
                'Fiction',
                'Science',
                'SelfDevelopment',
                'Poetry',
                'Religious',
            ],
            message: '{VALUE} is not a valid category.',
        },
        required: [true, 'Please choose a category for the book.'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a brief description of the book.'],
    },
    quantity: {
        type: Number,
        required: [true, 'Please specify the quantity available.'],
        min: [0, 'Quantity must be a positive number.'],
    },
    inStock: {
        type: Boolean,
        required: [true, 'Please specify if the book is in stock.'],
    },
}, {
    timestamps: true,
});
const Products = (0, mongoose_1.model)('Products', productSchema);
exports.default = Products;
