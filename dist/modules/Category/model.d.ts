import { Model } from 'sequelize';
interface CategoryAttributes {
    name: string;
}
declare class Category extends Model<CategoryAttributes> implements CategoryAttributes {
    id: number;
    name: string;
}
export default Category;
export { Category as CategoryModel, CategoryAttributes };
