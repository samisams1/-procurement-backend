import { Model } from 'sequelize';
interface PasswordResetAttributes {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
declare class PasswordReset extends Model<PasswordResetAttributes> implements PasswordResetAttributes {
    id: string;
    userId: string;
    token: string;
    expiresAt: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    static associate(models: any): void;
}
export default PasswordReset;
