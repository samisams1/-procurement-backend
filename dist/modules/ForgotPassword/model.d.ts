import { Model, Optional } from 'sequelize';
interface ForgotPasswordAttributes {
    id: number;
    email: string;
    token: string;
    expiresAt: Date | null;
    createdAt: Date;
}
interface ForgotPasswordCreationAttributes extends Optional<ForgotPasswordAttributes, 'id'> {
}
declare class ForgotPassword extends Model<ForgotPasswordAttributes, ForgotPasswordCreationAttributes> implements ForgotPasswordAttributes {
    id: number;
    email: string;
    token: string;
    expiresAt: Date | null;
    createdAt: Date;
}
export default ForgotPassword;
