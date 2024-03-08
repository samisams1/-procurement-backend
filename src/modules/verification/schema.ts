import { gql } from 'apollo-server';

const verificationSchema = gql`
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

export default verificationSchema;