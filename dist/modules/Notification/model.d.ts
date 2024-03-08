import { Model, Optional } from 'sequelize';
interface NotificationAttributes {
    id: number;
    type: string | null;
    message: string | null;
    recipientId: number;
    timestamp: Date;
    status: string | null;
    specificid?: number;
}
interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id'> {
}
declare class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
    id: number;
    type: string | null;
    message: string | null;
    recipientId: number;
    specificid: number;
    timestamp: Date;
    status: string | null;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
export default Notification;
