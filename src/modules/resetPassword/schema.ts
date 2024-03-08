import { gql } from 'apollo-server';

const forgotPasswordSchema = gql`
type Mutation {
    forgotPassword(email: String!): Boolean
  }
`;

export default forgotPasswordSchema;