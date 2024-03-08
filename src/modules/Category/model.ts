import { Model, DataTypes } from 'sequelize';
import sequelize  from '../../config/database';

interface CategoryAttributes {
  name: string;
}

class Category extends Model<CategoryAttributes> implements CategoryAttributes {
  public id!: number;
  public name!: string;
}

Category.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Category',
    tableName: 'categories',
    schema: 'et_proforma',
  }
);

export default Category;
export { Category as CategoryModel, CategoryAttributes };