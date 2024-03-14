"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const quotationSchema = (0, apollo_server_1.gql) `
scalar Date
  type Quotation {
    id: Int!
    supplierId: ID
    customerId: ID
    shippingPrice: Float
    availabilityDate:Int
    remark:String
    sentBy:String
    createdAt: Date!
    status: String!
    purchaseRequestId: ID
    supplier: Supplier
    customer: User
    productPrices:ProductPrice
    purchaseRequest:PurchaseRequest

  }
  type Supplier {
    id: Int!
    name: String!
  }
  type ProductPrice {
    id: Int
    price: Float
    disCountPrice:Float
    quotationId: Int
    status: String
    createdAt: Date
    updatedAt: String
  }
  input countQuotationSupplier  {
    supplierId:Int!
    status:String!
  }
  type Query {
    getQuotation(id: Int!): Quotation
    countGetQuotationByStatus(data: countQuotation!): Int!
    countQuotationBySupplierId(data: countQuotationSupplier!): Int!
    quotationBydSupplierId(suplierId: Int!): [Quotation]
  }
input countQuotation  {
  customerId:Int!
  status:String!
}
  input CreateQuotationInput {
    id: Int!
  }
  type User {
    name: String!
    email: String
  }
  input UpdateQuotationInput {
    status: String
    shippingPrice: Float
    availabilityDate :Int
    sentBy:String
    remark:String
    productPrices: [ProductPriceInput!]
  }
  type Mutation {
    createQuotation(input: CreateQuotationInput): Quotation
    updateQuotation(id:Int!,input: UpdateQuotationInput!): Quotation

    deleteQuotation(id: Int!): Boolean
  }
`;
exports.default = quotationSchema;
