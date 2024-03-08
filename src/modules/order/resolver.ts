import User  from '../user/model';
import Supplier  from '../supplier/model';
import Order from './model';
import OrderDetail from '../OrderDetail/model';
import ProductPrice from '../ProductPrice/model';
import { PubSub } from 'graphql-subscriptions';
//import { pubsub } from '../../PubSub/pubsub';
import Notification  from '../Notification/model';
import  Category  from '../Category/model';

interface CreateOrderInput {
  customerId: number;
  supplierId: number;
  orderDetails: {
    title: string;
    productId: number;
    price: number;
    quantity: number;
  }[];
  productPriceIds:number[];
  totalPrice: number;
  tax: number;
  status: string;
  shippingCost: number;
}
interface OrderInput {
  customerId: number;
  supplierId: number;
  orderDetails: {
    title: string;
    productId: number;
    price: number;
    quantity: number;
  }[];
  productPriceIds: number[];
  totalPrice: number;
  tax: number;
  status: string;
  shippingCost: number;
}
interface OrderCreationAttributes {
  customerId: number;
  supplierId: number;
  totalPrice: number;
  tax: number;
  status: string;
  shippingCost: number;
  createdAt: Date; // Optional properties
  updatedAt: Date; // Optional properties
}
interface OrderWithDetails extends Order {
  orderDetails: OrderDetail[];
}

interface OrderDetailCreationAttributes {
  orderId: number;
  title: string;
  productId: number;
  price: number;
  quantity: number;
}
interface countOrder {
  customerId:number;
  status:string;
  supplierId:number;
}
const pubsub = new PubSub();

const orderResolver = {
  Query: {
    
    getOrderById: async (parent: any, { id }: { id: number }) => {
      try {
        const order = await Order.findByPk(id,{
          include: [
            { 
              model: Supplier, as: 'supplier',
              include: [
                { 
                  model: Category,
                  as: 'category',
                }
              ]
          
          },
            { model: User, as: 'customer' },
          ],
          order: [['id', 'DESC']],
        });
        return order;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    getOrderByUserId: async (parent: any, { id }: { id: number }) => {
      try {
        const order = await Order.findAll({
          where:{customerId:id},
          include: [
            { model: Supplier, as: 'supplier' },
            { model: User, as: 'customer' },
          ],
          order: [['id', 'DESC']],
        });
        return order;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    getOrderBySupplierId: async (parent: any, { id,status }: { id: number,status:string }) => {
      try {
        const order = await Order.findAll({
          where:{supplierId:id,status},
          include: [
            { model: Supplier, as: 'supplier' },
            { model: User, as: 'customer' },
          ],
          order: [['id', 'DESC']],
        });
        return order;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    
    getApprovedOrderByCustomerId: async (parent: any, { id }: { id: number }) => {
      try {
        const order = await Order.findAll({
          where:{customerId:id,status:"approved"},
          include: [
            { model: Supplier, as: 'supplier' },
            { model: User, as: 'customer' },
          ],
          order: [['id', 'DESC']],
        });
        return order;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
  /*  getApprovedOrderByCustomerId: async (parent: any, { customerId }: { customerId: number }) => {
      try {
        const order = await Order.findByPk(customerId);
        return order;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },*/
    orders: async () => {
      try {
        const orders = await Order.findAll({
          order: [['id', 'DESC']],
        });
        return orders;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve orders');
      }
    },
    /*countOrderBystatus: async (_:any,{ status }: { status: string },{ userId }: { userId: number }) => {
      try {
        const count = await Order.count({ where: { status:status,customerId:userId }});
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve orders');
      }
    },*/
    countOrderBystatus: async (parent: any, { data }: { data: countOrder }) => {
      const {customerId,status} =data;
      try {
        const count = await Order.count({ where: {customerId,status }});
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    countOrderBySupplierId: async (parent: any, { data }: { data: countOrder }) => {
      const {supplierId,status} =data;
      try {
        const count = await Order.count({ where: {supplierId,status }});
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve order');
      }
    },
    countAllrderByStatus: async (_:any,{ status }: { status: string }) => {
      try {
        const count = await Order.count({ where: { status } });
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve orders');
      }
    }
    
  },
  
    Subscription: {
      orderUpdated: {
        subscribe: () => pubsub.asyncIterator('ORDER_UPDATED'),
      },
    },
  Mutation: {
    createOrder: async (_: any, { input }: { input: CreateOrderInput[] }) => {
      try {
        const createdOrders: OrderWithDetails[] = [];
    
        for (const orderInput of input) {
          const order = await Order.create({
            ...orderInput,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
    
          const orderDetailsPromises = [];
    
          for (const orderDetailInput of orderInput.orderDetails) {
            const orderDetail = OrderDetail.build({
              orderId: order.id,
              title: orderDetailInput.title,
              productId: orderDetailInput.productId,
              price: orderDetailInput.price,
              quantity: orderDetailInput.quantity,
              createdAt: new Date(),
              updatedAt: new Date(),
            });
    
            await orderDetail.save();
    
            orderDetailsPromises.push(orderDetail);
          }
    
          const orderDetails = await Promise.all(orderDetailsPromises);

          (order as OrderWithDetails).orderDetails = orderDetails;
    
          createdOrders.push(order as OrderWithDetails);

          for (const productPriceId of orderInput.productPriceIds) {
            const quotation = await ProductPrice.findOne({
              where: { id: productPriceId },
            });
             
            if (!quotation) {
              throw new Error(`Quotation with ID ${productPriceId} not found`);
            }
            await Notification.create({
              type: 'order',
              message: 'Customer Send Order to supplier',
              recipientId: Number(order.supplierId),
              specificid:Number(order.id),
              timestamp: new Date(),
              status: 'unread',
            });
            await quotation.update({ status: 'ordered' });
          }
            

          
        }
    
        return createdOrders;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create orders');
      }
    },
    updateOrder : async (_: any, { id, input }: { id: number, input: string }) => {
      try {
        const order = await Order.findOne({ where: { id } });
    
        if (!order) {
          throw new Error(`Order with ID ${id} not found`);
        }
    
        order.status = input;
        await order.save();
        await Notification.create({
          type: 'updateOrder',
          message: 'Supplier Comfirm Your Order ',
          recipientId: Number(order.customerId),
          specificid:Number(order.id),
          timestamp: new Date(),
          status: 'unread',
        });
        return order;
      } catch (error) {
        throw new Error(`Failed to update order: ${error}`);
      }
    },
    
  },
};

export default orderResolver;