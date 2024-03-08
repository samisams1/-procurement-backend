import { CategoryModel } from './model';
declare const CategoryResolvers: {
    Query: {
        getCategories: () => Promise<CategoryModel[]>;
    };
    Mutation: {
        createCategory: (_: any, { name }: {
            name: string;
        }) => Promise<CategoryModel>;
    };
};
export default CategoryResolvers;
