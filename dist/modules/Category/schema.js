"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const categorySchema = (0, apollo_server_express_1.gql) `
  type Category {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Query {
    getCategory(id: ID!): Category
    getCategories: [Category!]!
  }

  type Mutation {
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Boolean!
  }
`;
exports.default = categorySchema;
