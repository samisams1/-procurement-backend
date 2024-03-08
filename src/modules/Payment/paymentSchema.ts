import { gql } from 'apollo-server';

const paymentSchema = gql`
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

export default paymentSchema;