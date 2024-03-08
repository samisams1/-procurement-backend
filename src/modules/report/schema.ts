import { gql } from 'apollo-server-express';

const reportSchema = gql`
scalar Date
  type Payment {
    id: Int!
    amount: Float!
    paidAt: String!
    paymentMethod: String!
    userId: Int!
    orderId: Int!
    status: String!
    referenceNumber: String!
    fullName: String!
  }
  
  type MonthlyReport {
    month: String
    totalAmount: Float!
  }
  
  type DailyReport {
    date: String!
    totalAmount: Float!
  }
  type YearlyReport {
    year: String!
    totalAmount: Float!
  }
  type Query {
    dailyReport(id: Int!): [DailyReport!]!
    monthlyReport(id: Int!): [MonthlyReport!]!
    yearlyReport(id: Int!): [YearlyReport!]!
  }
`;

export default reportSchema;