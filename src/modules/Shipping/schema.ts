import { gql } from 'apollo-server';

const shippingSchema = gql`
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

export default shippingSchema;