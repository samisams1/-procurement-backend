"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("./model"));
const shippingResolver = {
    Query: {
        shippingById: async (parent, { id }) => {
            try {
                const shipping = await model_1.default.findByPk(id);
                return shipping;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve shipping');
            }
        },
        shippingByUserId: async (parent, { userId }) => {
            try {
                const shipping = await model_1.default.findAll({
                    where: { userId },
                    /* include:[
                       { model: Order,as:'order'},
                     ]*/
                });
                return shipping;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve shipping');
            }
        },
        shippings: async () => {
            try {
                const shippings = await model_1.default.findAll();
                return shippings;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve shippings');
            }
        },
    },
    Mutation: {
        createShipping: async (parent, { input }) => {
            try {
                const shipping = await model_1.default.create(input);
                return shipping;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create shipping');
            }
        },
    },
};
exports.default = shippingResolver;
