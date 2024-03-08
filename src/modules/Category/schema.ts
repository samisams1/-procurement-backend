import { gql } from 'apollo-server-express';

const categorySchema = gql`
  type Category {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Query {
    getCategory(id: ID!): Category
    getCategories: [Category!]!
  }

  type Mutation {
    createCategory(name: String!): Category!
    updateCategory(id: ID!, name: String!): Category!
    deleteCategory(id: ID!): Boolean!
  }
`;

export default categorySchema;