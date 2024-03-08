import { Model, Association } from 'sequelize';
import Quotation from '../Quotation/model';
import Product from '../product/model';
interface ProductPriceAttributes {
    id?: number;
    productId: number;
    price: number;
    quotationId: number;
    status?: string;
    disCountPrice?: number;
    createdAt?: Date;
    updatedAt?: Date;
}
declare class ProductPrice extends Model<ProductPriceAttributes> implements ProductPriceAttributes {
    id: number;
    productId: number;
    price: number;
    quotationId: number;
    status: string;
    disCountPrice: number;
    createdAt: Date;
    updatedAt: Date;
    readonly product?: Product[];
    static associations: {
        product: Association<ProductPrice, Product>;
        quotation: Association<ProductPrice, Quotation>;
    };
}
export { ProductPriceAttributes };
export default ProductPrice;
