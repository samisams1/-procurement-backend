import { gql } from 'apollo-server';
const purchaseRequestSchema = gql`
scalar Date
type Product {
  id: Int!
  Description: String
  code: String
  manufacturer: String
  model: String
  partNumber: String
  quantity: String
  title: String
  uom: String
  mark:String
  imageurl:String
}

  type Supplier {
    id: Int!
    name: String!
    address: String
    
  }

  type PurchaseRequest {
    id: Int
    userId: Int
    status: String
    remark: String
    imageUrl:String
    addressDetail: String
    estimatedDelivery: String
    referenceNumber:String
    approvedBy:String
    requestedBy:String
    createdAt:Date
    products: [Product]
    category:Category
    user:User
  }
  input PurchaseRequestInput {
    userId: Int
    status: String
    remark: String
    addressDetail: String
    estimatedDelivery: String
    referenceNumber:String
    requestedBy:String
    approvedBy:String
    createdAt:Date
    sourceType: String
    categoryId:Int
  }
  input ProductInput {
    title: String!
    quantity: Float!
    Description: String
    code: String
    manufacture: String
    model: String
    mark:String
    partNumber: String
    manufacturer: String
    uom: String
  }

  input SupplierInput {
    id: Int!
  }

  input CreatePurchaseRequestInput {
    purchaseRequest: PurchaseRequestInput
    products: [ProductInput]
    suppliers: [SupplierInput]
   
  }

  type Query {
    purchaseRequestById(id: Int!): [PurchaseRequest]
    purchaseRequestBYSupplierId(
      userId: Int!
      search: String
      filter: FilterInput
      orderBy: String
      page: Int
      pageSize: Int
    ): [PurchaseRequest]
    purchaseRequests: [PurchaseRequest]
    purchaseRequestByUserId(userId: Int!):  [PurchaseRequest]
    countPurchaseRequestBystatus(data: countPurchase!): Int!
    countAllRequestByStatus(status:String!): Int!
    savedRequestByUserId(userId: Int!):  [PurchaseRequest]

    getDraftProductsByRequestId(purchaseRequestId: Int!):[PurchaseRequest]
    
  }
  input FilterInput {
    field: String!
    value: String!
  }
  input countPurchase {
    userId:Int!
    status:String!
  }
  type Mutation {
    createPurchaseRequest(input: CreatePurchaseRequestInput!): PurchaseRequest
    createDraftequest(input: CreatePurchaseRequestInput): PurchaseRequest
  }

  type Subscription {
    newNotification: Notification
    updatedNotificationCount: Int
  }
`;

export default purchaseRequestSchema;