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
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_validation_1 = require("./product.validation");
const config_1 = __importDefault(require("../../config"));
// create a book
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const result = yield product_service_1.productService.createBook(payload);
        res.json({
            message: 'Book created successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: 'ValidationError',
            success: false,
            error,
            stack: config_1.default.node_env === 'development'
                ? new Error('Something went wrong').stack
                : undefined,
        });
    }
});
// get all book and also by get search with category,tittle,author
const getAllBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.productService.getAllBook(searchTerm);
        if (result.length === 0) {
            res.status(404).json({
                message: 'No Books are found',
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: 'Resources Not Found',
            success: false,
            error,
        });
    }
});
// get single book by id
const getSingleBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield product_service_1.productService.getSingleBook(productId);
        if (!result) {
            res.status(404).json({
                message: 'Book not found',
                success: false,
            });
            return;
        }
        res.status(200).json({
            message: 'Books retrieved successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: 'Resources Not Found',
            success: false,
            error,
            stack: config_1.default.node_env === 'development'
                ? new Error('Something went wrong').stack
                : undefined,
        });
    }
});
// update a book
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const data = req.body;
        const validatedData = product_validation_1.productValidationSchema.parse(data);
        const result = yield product_service_1.productService.updateBook(productId, validatedData);
        res.status(200).json({
            message: 'Book updated successfully',
            success: true,
            data: result,
        });
    }
    catch (error) {
        res.json({
            message: 'Validation Error',
            success: false,
            error,
            stack: config_1.default.node_env === 'development'
                ? new Error('Something went wrong').stack
                : undefined,
        });
    }
});
// delete a book
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield product_service_1.productService.deleteBook(productId);
        res.status(200).json({
            message: 'Book deleted successfully',
            success: true,
            data: {},
        });
    }
    catch (error) {
        res.json({
            message: 'Validation Error',
            success: false,
            error,
            stack: config_1.default.node_env === 'development'
                ? new Error('Something went wrong').stack
                : undefined,
        });
    }
});
exports.productController = {
    createBook,
    getAllBook,
    getSingleBook,
    updateBook,
    deleteBook,
};
