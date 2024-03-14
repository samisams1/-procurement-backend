"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const draftSchemaSchema = (0, apollo_server_1.gql) `

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
  }
  type Mutation {
    createDraft(input: DraftInput!): Draft
    updateDraft(id: ID!, input: DraftInput!): Draft
    deleteDraft(id: ID!): Boolean
  }
`;
exports.default = draftSchemaSchema;
