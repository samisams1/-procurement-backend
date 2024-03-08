import Order from "../order/model";
import Shipping from "./model";

const shippingResolver = {
  Query: {
    shippingById: async (parent: any, { id }: { id: number }) => {
      try {
        const shipping = await Shipping.findByPk(id);
        return shipping;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve shipping');
      }
    },
    shippingByUserId: async (parent: any, { userId }: { userId: number }) => {
      try {
        const shipping = await Shipping.findAll({
          where:{userId},
         /* include:[
            { model: Order,as:'order'},
          ]*/
        });
        return shipping;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve shipping');
      }
    },
    shippings: async () => {
      try {
        const shippings = await Shipping.findAll();
        return shippings;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve shippings');
      }
    },
  },
  Mutation: {
    createShipping: async (parent: any, { input }: { input: any }) => {
      try {
        const shipping = await Shipping.create(input);
        return shipping;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create shipping');
      }
    },
  },
};

export default shippingResolver;