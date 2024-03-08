import { ApolloError } from 'apollo-server-express';
import Notification from './model';
import { Op } from 'sequelize';

const notificationResolver = {
  Query: {
    notificationById: async (parent: any, { id }: { id: number }) => {
      try {
        const notification = await Notification.findByPk(id);
        return notification;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve notification');
      }
    },
    notifications: async () => {
      try {
        const notifications = await Notification.findAll();
        return notifications;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve notifications');
      }
    },
   // notificationCount: () => Notification.count(),
   notificationsByUserIdInfo: async (parent: any, { recipientId }: { recipientId: number }) => {
    const notifications = await Notification.findAll({
      where: { recipientId, status: { [Op.ne]: 'read' } },
      order: [['createdAt', 'DESC']],
    });
    const count = await Notification.count({
      where: {recipientId, status: { [Op.ne]: 'read' } },
    });
    return { notifications, count };
  },
   notificationsInfo: async () => {
    const notifications = await Notification.findAll({
      where: {status: { [Op.ne]: 'read' } },
      order: [['createdAt', 'DESC']],
    });
    const count = await Notification.count({
      where: { status: { [Op.ne]: 'read' } },
    });
    return { notifications, count };
  }
  
  },
  Mutation: {
    createNotification: async (parent: any, { input }: { input: any }) => {
      try {
        const notification = await Notification.create(input);
        return notification;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create notification');
      }
    },
      updateNotification: async (_: any, { id }: { id: string }) => {
        try {
          const notification = await Notification.findByPk(id);
          if (!notification) {
            throw new ApolloError('Notification not found', 'NOT_FOUND');
          }
          notification.status = 'read';
          await notification.save();
          return notification;
        } catch (error) {
          console.error(error);
          throw new ApolloError('Failed to update notification', 'INTERNAL_SERVER_ERROR');
        }
      },
   },
};

export default notificationResolver;