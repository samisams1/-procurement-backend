"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const model_1 = __importDefault(require("../user/model"));
const model_2 = __importDefault(require("../order/model"));
const model_3 = __importDefault(require("./model"));
const model_4 = __importDefault(require("../supplier/model"));
const model_5 = __importDefault(require("../product/model"));
const model_6 = __importDefault(require("../Category/model"));
const orderDetailResolver = {
    Query: {
        /*GetOrderDetailByOrderId: async (parent: any, { id }: { id: number }) => {
          try {
            const orderDetail = await OrderDetail.findByPk(id);
            return orderDetail;
          } catch (error) {
            console.error(error);
            throw new Error('Failed to retrieve order detail');
          }
        },*/
        getOrderDetailByOrderId: async (parent, { id }) => {
            try {
                const orderDetails = await model_3.default.findAll({
                    include: [
                        // { model: Order, as: 'order' },
                        { model: model_2.default, as: 'order', where: { id: id }, include: [{ model: model_1.default, as: 'customer' }, { model: model_4.default, as: 'supplier',
                                    include: [{ model: model_6.default, as: 'category' }]
                                }] },
                        { model: model_5.default, as: 'product' }
                    ]
                });
                return orderDetails;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order details');
            }
        },
        orderDetails: async () => {
            try {
                const orderDetails = await model_3.default.findAll({
                    include: [
                        // { model: Order, as: 'order' },
                        { model: model_2.default, as: 'order', include: [{ model: model_1.default, as: 'customer' }, { model: model_4.default, as: 'supplier' }] },
                        { model: model_5.default, as: 'product' }
                    ]
                });
                return orderDetails;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve order details');
            }
        },
    },
    Mutation: {
        createOrderDetail: async (parent, { input }) => {
            try {
                const orderDetail = await model_3.default.create(input);
                return orderDetail;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create order detail');
            }
        },
    },
};
exports.default = orderDetailResolver;
