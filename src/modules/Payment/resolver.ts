import Order from '../order/model';
import Payment from './model';
import Notification  from '../Notification/model';
import  Shipping  from '../Shipping/model';
const paymentResolver = {
  Query: {
    payment: async (parent: any, { id }: { id: number }) => {
      try {
        const payment = await Payment.findByPk(id);
        return payment;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve payment');
      }
    },
    paymentBycustomer: async (parent: any, { customerId }: { customerId: number }) => {
      try {
        const payments = await Payment.findAll({
          where:{userId:customerId}
        });
        return payments;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve payment');
      }
    },   
    payments: async () => {
      try {
        const payments = await Payment.findAll();
        return payments;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve payments');
      }
    },
    supplierPayments: async (parent: any, { id }: { id: number }) => {
      try {
        const payments = await Payment.findAll(
        { include:[{ model: Order,as:'order',where:{supplierId:id}}]}
        );
        return payments;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve payments');
      }
    },
    countPaymentSatus: async (_:any,{ status }: { status: string }) => {
      try {
        const count = await Payment.count({ where: { status } });
        return count;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to retrieve orders');
      }
    }
  },
  Mutation: {
    createPayment: async (parent: any, { input }: { input: any }) => {
      try {
        const payment = await Payment.create(input);
        const {orderId,userId} = input;
        const order = await Order.findOne({ where: { id:orderId } });
    
        if (!order) {
          throw new Error(`Order with ID ${orderId} not found`);
        }
    
        order.status = "paid";
        await order.save();
        await Shipping.create({
          userId: userId,
          address: 'samisams eko',
          orderId: orderId,
          status: 'In Transit',
        });
        await Notification.create({
          type: 'payment',
          message: 'payment',
          recipientId: userId,
          specificid:payment.id,
          timestamp: new Date(),
          status: 'paid',
        });
        return payment;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create payment');
      }
    },
  },
};

export default paymentResolver;