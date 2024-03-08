"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../order/model"));
const model_2 = __importDefault(require("./model"));
const model_3 = __importDefault(require("../Notification/model"));
const model_4 = __importDefault(require("../Shipping/model"));
const paymentResolver = {
    Query: {
        payment: async (parent, { id }) => {
            try {
                const payment = await model_2.default.findByPk(id);
                return payment;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve payment');
            }
        },
        paymentBycustomer: async (parent, { customerId }) => {
            try {
                const payments = await model_2.default.findAll({
                    where: { userId: customerId }
                });
                return payments;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve payment');
            }
        },
        payments: async () => {
            try {
                const payments = await model_2.default.findAll();
                return payments;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve payments');
            }
        },
        supplierPayments: async (parent, { id }) => {
            try {
                const payments = await model_2.default.findAll({ include: [{ model: model_1.default, as: 'order', where: { supplierId: id } }] });
                return payments;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve payments');
            }
        },
        countPaymentSatus: async (_, { status }) => {
            try {
                const count = await model_2.default.count({ where: { status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve orders');
            }
        }
    },
    Mutation: {
        createPayment: async (parent, { input }) => {
            try {
                const payment = await model_2.default.create(input);
                const { orderId, userId } = input;
                const order = await model_1.default.findOne({ where: { id: orderId } });
                if (!order) {
                    throw new Error(`Order with ID ${orderId} not found`);
                }
                order.status = "paid";
                await order.save();
                await model_4.default.create({
                    userId: userId,
                    address: 'samisams eko',
                    orderId: orderId,
                    status: 'In Transit',
                });
                await model_3.default.create({
                    type: 'payment',
                    message: 'payment',
                    recipientId: userId,
                    specificid: payment.id,
                    timestamp: new Date(),
                    status: 'paid',
                });
                return payment;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create payment');
            }
        },
    },
};
exports.default = paymentResolver;
