"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const paymentSchema = (0, apollo_server_1.gql) `
scalar Date

  type Payment {
    id: Int!
    amount: Float!
    paidAt: String!
    paymentMethod: String
    userId: Int!
    orderId: Int!
    status: String
    referenceNumber: String
    fullName: String!
  }
  input CreatePaymentInput {
    amount: Float!
    paidAt: String!
    paymentMethod: String
    userId: Int!
    orderId: Int!
    status: String
    referenceNumber: String
    fullName: String!
  }
  type Query {
    payment(id: Int!): Payment
    paymentBycustomer(customerId: Int!): [Payment]
    payments: [Payment] 
    supplierPayments(id: Int!): [Payment]
    countPaymentSatus(status: String!): Int! 
  }
  type Mutation {
    createPayment(input: CreatePaymentInput!): Payment
  }
`;
exports.default = paymentSchema;
