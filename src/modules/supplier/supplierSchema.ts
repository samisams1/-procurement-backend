const supplierSchema = `
  type Supplier {
    id: Int!
    name: String
    country:String
    city:String
    subCity:String
    contactNumber:String
    houseNumber:String
    specificName:String
    userId: Int!
    isVerified:Boolean
    categoryId: Int!
    createdAt: String!
    updatedAt: String!
    category:Category
  }

  input CreateSupplierInput {
    name: String
    country:String
    city:String
    subCity:String
    contactNumber:String
    houseNumber:String
    specificName:String
    userId: Int!
    categoryId: Int!
  }

  input UpdateSupplierInput {
    name: String
    country:String
    city:String
    subCity:String
    contactNumber:String
    houseNumber:String
    specificName:String
    userId: Int
    categoryId: Int
  }
  
  type Query {
    suppliers: [Supplier!]!
    supplier(id: Int!): Supplier
    suppliersByCategoryId(categoryId: Int!): [Supplier!]!
    supplierCategory:[Supplier!]!
    supplierIdByUserId(userId: Int!): Supplier!
  }

  type Mutation {
    createSupplier(input: CreateSupplierInput!): Supplier!
    updateSupplier(id: Int!, input: UpdateSupplierInput!): Supplier!
    deleteSupplier(id: Int!): Boolean!
  }
`;

export default supplierSchema;