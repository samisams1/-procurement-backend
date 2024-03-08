import  User  from '../user/model';
import Order from '../order/model';
import OrderDetail from './model';
import Supplier  from '../supplier/model';
import Product from '../product/model';
import  Category  from '../Category/model';

const orderDetailResolver = {
  Query: {
    /*GetOrderDetailByOrderId: async (parent: any, { id }: { id: number }) => {
      try {
        const orderDetail = await OrderDetail.findByPk(id);
        return orderDetail;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order detail');
      }
    },*/
    getOrderDetailByOrderId: async (parent: any, { id }: { id: number }) => {
      try {
        const orderDetails = await OrderDetail.findAll({
          include:[
           // { model: Order, as: 'order' },
           { model: Order, as: 'order',where:{id:id}, include: [{ model: User, as: 'customer' },{ model: Supplier, as: 'supplier',
           include: [{ model: Category, as: 'category' }]
          }] },
           { model: Product,as:'product'}
           
          ]
        });
        return orderDetails;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order details');
      }
    },
    orderDetails: async () => {
      try {
        const orderDetails = await OrderDetail.findAll({
          include:[
           // { model: Order, as: 'order' },
           { model: Order, as: 'order', include: [{ model: User, as: 'customer' },{ model: Supplier, as: 'supplier' }] },
           { model: Product,as:'product'}
          ]
        });
        return orderDetails;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order details');
      }
    },
  },
  Mutation: {
    createOrderDetail: async (parent: any, { input }: { input: any }) => {
      try {
        const orderDetail = await OrderDetail.create(input);
        return orderDetail;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create order detail');
      }
    },
  },
};

export default orderDetailResolver;