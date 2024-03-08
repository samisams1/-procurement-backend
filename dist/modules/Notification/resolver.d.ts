import Notification from './model';
declare const notificationResolver: {
    Query: {
        notificationById: (parent: any, { id }: {
            id: number;
        }) => Promise<Notification | null>;
        notifications: () => Promise<Notification[]>;
        notificationsByUserIdInfo: (parent: any, { recipientId }: {
            recipientId: number;
        }) => Promise<{
            notifications: Notification[];
            count: number;
        }>;
        notificationsInfo: () => Promise<{
            notifications: Notification[];
            count: number;
        }>;
    };
    Mutation: {
        createNotification: (parent: any, { input }: {
            input: any;
        }) => Promise<Notification>;
        updateNotification: (_: any, { id }: {
            id: string;
        }) => Promise<Notification>;
    };
};
export default notificationResolver;
