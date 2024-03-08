import { gql } from 'apollo-server';

const orderDetailSchema = gql`
scalar Date
  type OrderDetail {
    id: Int!
    orderId: Int!
    title: String
    price: Float
    quantity: Int
    productId: Int!
    createdAt: Date
    updatedAt: String
    order:Order
    product:Product
  }
 
  input CreateOrderDetailInput {
    orderId: Int!
    title: String
    price: Float
    quantity: Int
    productId: Int!
  }

  type Query {
    getOrderDetailByOrderId(id:Int!): [OrderDetail]
    orderDetails: [OrderDetail]
  }

  type Mutation {
    createOrderDetail(input: CreateOrderDetailInput!): OrderDetail
  }
`;

export default orderDetailSchema;