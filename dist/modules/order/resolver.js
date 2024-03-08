"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../user/model"));
const model_2 = __importDefault(require("../supplier/model"));
const model_3 = __importDefault(require("./model"));
const model_4 = __importDefault(require("../OrderDetail/model"));
const model_5 = __importDefault(require("../ProductPrice/model"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
//import { pubsub } from '../../PubSub/pubsub';
const model_6 = __importDefault(require("../Notification/model"));
const model_7 = __importDefault(require("../Category/model"));
const pubsub = new graphql_subscriptions_1.PubSub();
const orderResolver = {
    Query: {
        getOrderById: async (parent, { id }) => {
            try {
                const order = await model_3.default.findByPk(id, {
                    include: [
                        {
                            model: model_2.default, as: 'supplier',
                            include: [
                                {
                                    model: model_7.default,
                                    as: 'category',
                                }
                            ]
                        },
                        { model: model_1.default, as: 'customer' },
                    ],
                    order: [['id', 'DESC']],
                });
                return order;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        getOrderByUserId: async (parent, { id }) => {
            try {
                const order = await model_3.default.findAll({
                    where: { customerId: id },
                    include: [
                        { model: model_2.default, as: 'supplier' },
                        { model: model_1.default, as: 'customer' },
                    ],
                    order: [['id', 'DESC']],
                });
                return order;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        getOrderBySupplierId: async (parent, { id, status }) => {
            try {
                const order = await model_3.default.findAll({
                    where: { supplierId: id, status },
                    include: [
                        { model: model_2.default, as: 'supplier' },
                        { model: model_1.default, as: 'customer' },
                    ],
                    order: [['id', 'DESC']],
                });
                return order;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        getApprovedOrderByCustomerId: async (parent, { id }) => {
            try {
                const order = await model_3.default.findAll({
                    where: { customerId: id, status: "approved" },
                    include: [
                        { model: model_2.default, as: 'supplier' },
                        { model: model_1.default, as: 'customer' },
                    ],
                    order: [['id', 'DESC']],
                });
                return order;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        /*  getApprovedOrderByCustomerId: async (parent: any, { customerId }: { customerId: number }) => {
            try {
              const order = await Order.findByPk(customerId);
              return order;
            } catch (error) {
              console.error(error);
              throw new Error('Failed to retrieve order');
            }
          },*/
        orders: async () => {
            try {
                const orders = await model_3.default.findAll({
                    order: [['id', 'DESC']],
                });
                return orders;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve orders');
            }
        },
        /*countOrderBystatus: async (_:any,{ status }: { status: string },{ userId }: { userId: number }) => {
          try {
            const count = await Order.count({ where: { status:status,customerId:userId }});
            return count;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve orders');
          }
        },*/
        countOrderBystatus: async (parent, { data }) => {
            const { customerId, status } = data;
            try {
                const count = await model_3.default.count({ where: { customerId, status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        countOrderBySupplierId: async (parent, { data }) => {
            const { supplierId, status } = data;
            try {
                const count = await model_3.default.count({ where: { supplierId, status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order');
            }
        },
        countAllrderByStatus: async (_, { status }) => {
            try {
                const count = await model_3.default.count({ where: { status } });
                return count;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve orders');
            }
        }
    },
    Subscription: {
        orderUpdated: {
            subscribe: () => pubsub.asyncIterator('ORDER_UPDATED'),
        },
    },
    Mutation: {
        createOrder: async (_, { input }) => {
            try {
                const createdOrders = [];
                for (const orderInput of input) {
                    const order = await model_3.default.create({
                        ...orderInput,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    });
                    const orderDetailsPromises = [];
                    for (const orderDetailInput of orderInput.orderDetails) {
                        const orderDetail = model_4.default.build({
                            orderId: order.id,
                            title: orderDetailInput.title,
                            productId: orderDetailInput.productId,
                            price: orderDetailInput.price,
                            quantity: orderDetailInput.quantity,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        });
                        await orderDetail.save();
                        orderDetailsPromises.push(orderDetail);
                    }
                    const orderDetails = await Promise.all(orderDetailsPromises);
                    order.orderDetails = orderDetails;
                    createdOrders.push(order);
                    for (const productPriceId of orderInput.productPriceIds) {
                        const quotation = await model_5.default.findOne({
                            where: { id: productPriceId },
                        });
                        if (!quotation) {
                            throw new Error(`Quotation with ID ${productPriceId} not found`);
                        }
                        await model_6.default.create({
                            type: 'order',
                            message: 'Customer Send Order to supplier',
                            recipientId: Number(order.supplierId),
                            specificid: Number(order.id),
                            timestamp: new Date(),
                            status: 'unread',
                        });
                        await quotation.update({ status: 'ordered' });
                    }
                }
                return createdOrders;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create orders');
            }
        },
        updateOrder: async (_, { id, input }) => {
            try {
                const order = await model_3.default.findOne({ where: { id } });
                if (!order) {
                    throw new Error(`Order with ID ${id} not found`);
                }
                order.status = input;
                await order.save();
                await model_6.default.create({
                    type: 'updateOrder',
                    message: 'Supplier Comfirm Your Order ',
                    recipientId: Number(order.customerId),
                    specificid: Number(order.id),
                    timestamp: new Date(),
                    status: 'unread',
                });
                return order;
            }
            catch (error) {
                throw new Error(`Failed to update order: ${error}`);
            }
        },
    },
};
exports.default = orderResolver;
