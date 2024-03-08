"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const verificationSchema = (0, apollo_server_1.gql) `
  type User {
    id: ID!
    name: String
    email: String
    isVerified: Boolean
  }
  
  type Verification {
    id: ID!
    token: String
    user: User
  }
  

  type Mutation {
    verifyUser(token: String!): User
    
  }
`;
exports.default = verificationSchema;
