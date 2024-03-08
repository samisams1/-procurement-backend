import { gql } from 'apollo-server';

const draftSchemaSchema = gql`

type Draft {
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
type DraftRequest {
    id: Int!
    draftProducts: [Draft]
  }

  input DraftInput {
    title: String!
  }
  type Query {
    getDraftById(id: ID!): Draft
    getAllDrafts: [Draft]
    getDraftProductsByRequestId(purchaseRequestId: Int!):[DraftRequest]
  }
  type Mutation {
    createDraft(input: DraftInput!): Draft
    updateDraft(id: ID!, input: DraftInput!): Draft
    deleteDraft(id: ID!): Boolean
  }
`;

export default draftSchemaSchema;