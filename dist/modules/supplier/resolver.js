"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../Category/model"));
const model_2 = __importDefault(require("./model"));
const supplierResolver = {
    Query: {
        suppliers: async () => {
            // Retrieve all suppliers
            try {
                const suppliers = await model_2.default.findAll();
                return suppliers;
            }
            catch (error) {
                console.error('Failed to fetch suppliers:', error);
                throw new Error('Failed to fetch suppliers');
            }
        },
        supplier: async (_, { id }) => {
            // Retrieve a supplier by ID
            try {
                const supplier = await model_2.default.findByPk(id);
                return supplier;
            }
            catch (error) {
                console.error(`Failed to fetch supplier with ID ${id}:`, error);
                throw new Error(`Failed to fetch supplier with ID ${id}`);
            }
        },
        suppliersByCategoryId: async (_, { categoryId }) => {
            try {
                const suppliers = await model_2.default.findAll({
                    where: { categoryId },
                });
                return suppliers;
            }
            catch (error) {
                console.error(`Failed to fetch suppliers with categoryId ${categoryId}:`, error);
                throw new Error(`Failed to fetch suppliers with categoryId ${categoryId}`);
            }
        },
        supplierCategory: async (_, { categoryId }) => {
            // Retrieve a supplier by ID
            try {
                const supplier = await model_2.default.findAll({
                    include: [
                        { model: model_1.default, as: 'category' }
                    ]
                });
                return supplier;
            }
            catch (error) {
                console.error(`Failed to fetch supplier  :`, error);
                throw new Error(`Failed to fetch supplier   `);
            }
        },
        supplierIdByUserId: async (parent, { userId }) => {
            try {
                const notification = await model_2.default.findOne({
                    where: { userId: userId }
                });
                return notification;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve notification');
            }
        }
    },
};
exports.default = supplierResolver;
