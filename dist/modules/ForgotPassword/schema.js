"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const forgotPasswordSchema = (0, apollo_server_1.gql) `
type User {
    id: ID!
    email: String!
  }

  input ResetPasswordInput {
    email: String!
    password: String!
    token: String!
  }
  input ChangePasswordInput {
    username: String!
    currentPassword: String!
    newPassword: String!
  }
  type ChangePasswordResponse {
    username: String!
  }
type Mutation {
    forgotPassword(email: String!): Boolean
    resetPassword(input: ResetPasswordInput!): User
    changePassword(input: ChangePasswordInput!): ChangePasswordResponse

  }
`;
exports.default = forgotPasswordSchema;
