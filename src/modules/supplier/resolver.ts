import Category  from "../Category/model";
import Supplier from "./model";

const supplierResolver = {
  Query: {
    suppliers: async () => {
      // Retrieve all suppliers
      try {
        const suppliers = await Supplier.findAll();
        return suppliers;
      } catch (error) {
        console.error('Failed to fetch suppliers:', error);
        throw new Error('Failed to fetch suppliers');
      }
    },
    supplier: async (_:any, { id }:{id:number}) => {
      // Retrieve a supplier by ID
      try {
        const supplier = await Supplier.findByPk(id);
        return supplier;
      } catch (error) {
        console.error(`Failed to fetch supplier with ID ${id}:`, error);
        throw new Error(`Failed to fetch supplier with ID ${id}`);
      }
    },
    suppliersByCategoryId: async (_:any, { categoryId }: { categoryId: number }): Promise<Supplier[]> => {
        try {
          const suppliers = await Supplier.findAll({
            where: { categoryId },
          });
          return suppliers;
        } catch (error) {
          console.error(`Failed to fetch suppliers with categoryId ${categoryId}:`, error);
          throw new Error(`Failed to fetch suppliers with categoryId ${categoryId}`);
        }
      },
    supplierCategory:  async (_:any, { categoryId }: { categoryId: number }): Promise<Supplier[]> => {
        // Retrieve a supplier by ID
        try {
          const supplier = await Supplier.findAll({
               include:[
            { model: Category,as:'category'}
            ] }
          );
          return supplier;
        } catch (error) {
          console.error(`Failed to fetch supplier  :`, error);
          throw new Error(`Failed to fetch supplier   `);
        }
      },
      supplierIdByUserId: async (parent: any, { userId }: { userId: number }) => {
        try {
          const notification = await Supplier.findOne({
          where:{userId:userId}
          });
          return notification;
        } catch (error) {
          console.error(error);
          throw new Error('Failed to retrieve notification');
        }
      }
  },
};

export default supplierResolver;