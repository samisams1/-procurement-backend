"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const shippingSchema = (0, apollo_server_1.gql) `
  type Shipping {
    id: Int!
    orderId: Int!
    address: String!
    userId: Int!
    status: String
    createdAt: String
    updatedAt: String
    order:Order
  }

  input CreateShippingInput {
    orderId: Int!
    address: String!
    userId: Int!
    status: String
  }
  type Query {
    shippingById(id: Int!): Shipping
    shippingByUserId(userId: Int!): [Shipping]
    shippings: [Shipping]
  }
  type Mutation {
    createShipping(input: CreateShippingInput!): Shipping
  }
`;
exports.default = shippingSchema;
