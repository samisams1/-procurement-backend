import { gql } from 'apollo-server';

const notificationSchema = gql`
scalar Date
  type Notification {
    id: Int!
    type: String
    message: String
    recipientId: Int!
    specificid:Int
    timestamp: String!
    status: String
    createdAt: Date
    updatedAt: String
  }

  input CreateNotificationInput {
    type: String
    message: String
    recipientId: Int!
    timestamp: String!
    status: String
  }

  type Query {
    notificationById(id: Int!): Notification
    notifications: [Notification]
    notificationsByUserIdInfo(recipientId:Int!):NotificationsInfo
    notificationCount:Int!
    notificationsInfo: NotificationsInfo!

  }
  type NotificationsInfo {
    notifications: [Notification!]!
    count: Int!
  }
  type Mutation {
    createNotification(input: CreateNotificationInput!): Notification
    updateNotification(id: Int!): Notification!
  }
`;

export default notificationSchema;