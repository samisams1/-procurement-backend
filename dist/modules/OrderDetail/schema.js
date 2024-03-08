"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const orderDetailSchema = (0, apollo_server_1.gql) `
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
exports.default = orderDetailSchema;
