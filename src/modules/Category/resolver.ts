import { ApolloError } from 'apollo-server';
import Category, { CategoryModel } from './model';

const CategoryResolvers = {
  Query: {
    getCategories: async (): Promise<CategoryModel[]> => {
      try {
        const categories = await Category.findAll();
        return categories;
      } catch (error) {
        throw new ApolloError('Failed to fetch categories', 'DATABASE_ERROR');
      }
    },
  },
  Mutation: {
    createCategory: async (_:any, { name }: { name: string }): Promise<CategoryModel> => {
      try {
        const category = await Category.create({ name });
        return category;
      } catch (error) {
        throw new ApolloError('Failed to create category', 'DATABASE_ERROR');
      }
    },
  },
};

export default CategoryResolvers;