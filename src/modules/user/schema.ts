import { gql } from 'apollo-server';

const userSchema = gql`
scalar Upload

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    role: String!
    address: String
    phonenumber:String
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    username: String!
    email: String!
    phoneNumber:String
    password: String!
    firstName: String!
    lastName: String!
    role: String!
    companyName:String
    category:String
    country: String
    city: String
  }
  type FileDetails {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  type FileUpload {
    createReadStream: String
    filename: String
  } 
  
  
  input FileUploadInput {
    createReadStream: String
    filename: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User!
    uploadProfilePicture(file: Upload!): String
  }

  
  type LoginResponse {
    token: String!
    user: User!
  }
  type Query {
    users:[User]
  }
  type Mutation {
    login(username: String!, password: String!): LoginResponse!
  }
`;

export default userSchema;