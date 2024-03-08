"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const forgotPasswordSchema = (0, apollo_server_1.gql) `
type Mutation {
    forgotPassword(email: String!): Boolean
  }
`;
exports.default = forgotPasswordSchema;
