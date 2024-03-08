"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const model_1 = __importDefault(require("./model"));
const sequelize_1 = require("sequelize");
const notificationResolver = {
    Query: {
        notificationById: async (parent, { id }) => {
            try {
                const notification = await model_1.default.findByPk(id);
                return notification;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve notification');
            }
        },
        notifications: async () => {
            try {
                const notifications = await model_1.default.findAll();
                return notifications;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to retrieve notifications');
            }
        },
        // notificationCount: () => Notification.count(),
        notificationsByUserIdInfo: async (parent, { recipientId }) => {
            const notifications = await model_1.default.findAll({
                where: { recipientId, status: { [sequelize_1.Op.ne]: 'read' } },
                order: [['createdAt', 'DESC']],
            });
            const count = await model_1.default.count({
                where: { recipientId, status: { [sequelize_1.Op.ne]: 'read' } },
            });
            return { notifications, count };
        },
        notificationsInfo: async () => {
            const notifications = await model_1.default.findAll({
                where: { status: { [sequelize_1.Op.ne]: 'read' } },
                order: [['createdAt', 'DESC']],
            });
            const count = await model_1.default.count({
                where: { status: { [sequelize_1.Op.ne]: 'read' } },
            });
            return { notifications, count };
        }
    },
    Mutation: {
        createNotification: async (parent, { input }) => {
            try {
                const notification = await model_1.default.create(input);
                return notification;
            }
            catch (error) {
                console.error(error);
                throw new Error('Failed to create notification');
            }
        },
        updateNotification: async (_, { id }) => {
            try {
                const notification = await model_1.default.findByPk(id);
                if (!notification) {
                    throw new apollo_server_express_1.ApolloError('Notification not found', 'NOT_FOUND');
                }
                notification.status = 'read';
                await notification.save();
                return notification;
            }
            catch (error) {
                console.error(error);
                throw new apollo_server_express_1.ApolloError('Failed to update notification', 'INTERNAL_SERVER_ERROR');
            }
        },
    },
};
exports.default = notificationResolver;
