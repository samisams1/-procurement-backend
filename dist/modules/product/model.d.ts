import { Model, Sequelize, Association } from 'sequelize';
import Quotation from '../Quotation/model';
import ProductPrice from '../ProductPrice/model';
interface ProductAttributes {
    id?: number;
    title: string;
    mark?: string;
    model?: string;
    manufacturer?: string;
    code?: string;
    Description?: string;
    partNumber?: string;
    uom?: string;
    quantity: number;
    purchaseRequestId: number;
    imageUrl?: string;
}
interface ProductCreationAttributes extends ProductAttributes {
}
declare class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
    quantity: number;
    id: number;
    purchaseRequestId: number;
    title: string;
    mark: string;
    model: string;
    manufacturer: string;
    code: string;
    Description: string;
    partNumber: string;
    uom: string;
    imageUrl: string;
    static associations: {
        quotations: Association<Product, Quotation>;
        productPrices: Association<Product, ProductPrice>;
    };
    static initModel(sequelize: Sequelize): void;
}
export default Product;
