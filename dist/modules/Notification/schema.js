"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const notificationSchema = (0, apollo_server_1.gql) `
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
exports.default = notificationSchema;
