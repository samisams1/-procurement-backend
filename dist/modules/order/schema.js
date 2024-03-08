"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const orderSchema = (0, apollo_server_1.gql) `
scalar Date
  type Order {
    id: Int!
    customerId: Int
    supplierId: Int
    totalPrice: Int
    tax: Float
    shippingCost: Float
    status: String
    createdAt: Date
    updatedAt: String
    referenceNumber: String
    purchaseRequestId: Int
    supplier: Supplier
    customer: User
    category : Category
    orderDetails:OrderDetails
  }
  type Customer {
    user: User
  }
  input CountOrder {
    customerId: Int!
    status: String!
  }
  input orderBySupplierId {
    supplierId: Int!
    status: String!
  }
  type OrderDetails {
    id: Int
    orderId: Int
    title: String
    price: Float
    quantity: Int
    productId: Int!
    createdAt: String
    updatedAt: String
  }
  type User {
    name: String!
    email: String
  }
  type Supplier {
    id: Int!
    name: String!
  }
  input CreateOrderInput {
    customerId: Int!
    supplierId: Int!
    totalPrice: Int!
    tax: Float
    productPriceIds: [Int!]!
    orderDetails: [OrderDetailInput!]!
    shippingCost: Float
    status: String
    referenceNumber: String
    purchaseRequestId: Int
  }
  input OrderDetailInput {
    title: String!
    productId: Int!
    price: Float!
    quantity: Int!
  }
  type Query { 
    getOrderById(id: Int!): Order  
    getOrderByUserId(id: Int!): [Order] 
    getOrderBySupplierId(id: Int!,status:String): [Order] 
    getApprovedOrderByCustomerId(id: Int!): [Order]  
    countOrderBystatus(data: CountOrder!): Int!  
    countOrderBySupplierId(data: orderBySupplierId!): Int!  
    countAllrderByStatus(status: String!): Int! 
    orders: [Order]
  }

  type Mutation {
    createOrder(input: [CreateOrderInput]!): [Order]

    updateOrder(id: Int!, input: String!): Order
    

  }
  type Subscription {
    orderUpdated:  Int!
  }
  
  type OrderCountPayload {
    orderCount: Int!
  }
`;
exports.default = orderSchema;
