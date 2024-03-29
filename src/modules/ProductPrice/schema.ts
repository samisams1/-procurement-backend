import { gql } from 'apollo-server-express';

const ProductPriceSchema = gql`
scalar Date
  type ProductPrice {
    id: Int!
    productId: Int!
    price: Float!
    remark:String
    sentBy:String
    quotationId: Int!
    status: String!
    createdAt: Date!
    updatedAt: String!
    product: Product
    quotation: Quotation
  }

  type Quotation {
    id: Int!
  }

  input CreateProductPriceInput {
    price: Float!
    productId: Int!
    quotationId: Int!
    status: String!
  }

  input UpdateProductPriceInput {
    shippingPrice: Float
    status: String
    productPrices: [ProductPriceInput]
  }
  input ProductPriceItemInput {
    id: Int!
    price: Float
    disCountPrice:Float
  }

  input ProductPriceInput {
    id: ID!
    price: Float
    disCountPrice:Float
  }
  input CreateProductPriceQuotationRequestInput {
    productPrices: [CreateProductPriceInput!]!
    status: String!
    shippingPrice: Float!
  }
  type Query {
    getAllProductPrices(id:Int!): [ProductPrice]
    quotationByRequestId(id: Int!): [ProductPrice]
    quotationByRequestIdAdSupplierId(id:Int!,supplierId:Int!):[ProductPrice]
    

  }
  type Mutation {
    createProductPrice(input: CreateProductPriceQuotationRequestInput!): [ProductPrice!]!
    updateProductPrices(id: Int!, input: UpdateProductPriceInput!): ProductPrice!
  }
`;

export default ProductPriceSchema;