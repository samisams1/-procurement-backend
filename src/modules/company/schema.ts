import { gql } from 'apollo-server';

const companySchema = gql`
  type Company {
    id: Int!
    name: String!
    userId: Int!
    email: String
    address: String
    phonenumber: String
    createdAt: String!
    updatedAt: String!
    country: String
    city: String
    houseNumber: String
    contactNumber: String
    specificName: String
    subCity: String
    isVerified: Boolean
  }

  input CreateCompanyInput {
    name: String!
    userId: Int!
    email: String
    address: String
    phonenumber: String
    createdAt: String
    updatedAt: String
    country: String
    city: String
    houseNumber: String
    contactNumber: String
    specificName: String
    subCity: String
    isVerified: Boolean
  }
  input UpdateCompanyInput {
    name: String
    email: String
    address: String
    phonenumber: String
    country: String
    city: String
    houseNumber: String
    contactNumber: String
    specificName: String
    subCity: String
    isVerified: Boolean
  }
  type Query {
    companies: [Company!]!
    companyByUserId(userId: Int!): Company!
  }

  type Mutation {
    createCompany(input: CreateCompanyInput!): Company!
    updateCompany(id: Int!, input: UpdateCompanyInput!): Company!
  }
`;

export default companySchema;