import { Model } from 'sequelize';
interface UserAttributes {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER';
    createdAt: Date;
    updatedAt: Date;
    status: string;
    isVerified: boolean;
    profilepicture?: string;
}
declare class User extends Model<UserAttributes> implements UserAttributes {
    username: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    address: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'CUSTOMER' | 'SUPPLIER';
    createdAt: Date;
    updatedAt: Date;
    status: string;
    isVerified: boolean;
    profilepicture?: string;
}
export default User;
