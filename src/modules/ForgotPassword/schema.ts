import { gql } from 'apollo-server';

const forgotPasswordSchema = gql`
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

export default forgotPasswordSchema;