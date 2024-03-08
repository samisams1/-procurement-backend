import { Model, Optional } from 'sequelize';
import Category from '../Category/model';
import User from '../user/model';
interface SupplierAttributes {
    id: number;
    name?: string;
    email?: string;
    country?: string;
    city?: string;
    isVerified?: boolean;
    subCity?: string;
    houseNumber?: string;
    contactNumber?: string;
    specificName?: string;
    userId: number;
    categoryId: number;
    createdAt?: Date;
    updatedAt?: Date;
}
interface SupplierCreationAttributes extends Optional<SupplierAttributes, 'id'> {
}
declare class Supplier extends Model<SupplierAttributes, SupplierCreationAttributes> implements SupplierAttributes {
    id: number;
    name: string;
    email: string;
    country: string;
    city: string;
    subCity?: string;
    houseNumber: string;
    contactNumber: string;
    specificName: string;
    isVerified: boolean;
    userId: number;
    categoryId: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
    readonly category?: Category;
    readonly user?: User;
    static associate(models: any): void;
}
export default Supplier;
