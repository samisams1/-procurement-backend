import purchaseRequestResolver from "./modules/PurchaseRequest/resolvers";
import categoryResolver from "./modules/Category/resolver";
import categorySchema from "./modules/Category/schema";
import ProductPriceResolver from "./modules/ProductPrice/resolver";
import ProductPriceSchema from "./modules/ProductPrice/schema";
import purchaseRequestSchema from "./modules/PurchaseRequest/schema";
import { authResolver } from "./modules/auth/resolver";
import userResolver from "./modules/user/resolver";
import userSchema from "./modules/user/schema";
import quotationSchema from "./modules/Quotation/schema";
import quotationResolver from "./modules/Quotation/resolvers";
import orderSchema from "./modules/order/schema";
import orderResolver from "./modules/order/resolver";
import orderDetailSchema from "./modules/OrderDetail/schema";
import orderDetailResolver from "./modules/OrderDetail/resolvers";
import paymentResolver from "./modules/Payment/resolver";
import paymentSchema from "./modules/Payment/paymentSchema";
import shippingResolver from "./modules/Shipping/resolver";
import shippingSchema from "./modules/Shipping/schema";
import notificationSchema from "./modules/Notification/schema";
import notificationResolver from "./modules/Notification/resolver";
import supplierSchema from "./modules/supplier/supplierSchema";
import supplierResolver from "./modules/supplier/resolver";
import forgotPasswordSchema from "./modules/ForgotPassword/schema";
import forgotPasswordResolver from "./modules/ForgotPassword/resolver";
import { ExecutionParams } from 'subscriptions-transport-ws';
import verificationResolver from "./modules/verification/resolver";
import verificationSchema from "./modules/verification/schema";
import draftResolver from "./modules/draft/resolver";
import draftSchemaSchema from "./modules/draft/schema";
import reportSchema from "./modules/report/schema";
import reportResolver from "./modules/report/resolver";
import companyResolver from "./modules/company/resolver";
import companySchema from "./modules/company/schema";
// /import  GraphQLUpload  from 'graphql-upload';

require('dotenv').config();
const ws = require('ws');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const { execute, subscribe } = require('graphql');

const { ApolloServer } = require('apollo-server-express');
const express = require('express');

async function startServer() {
  const app = express();
  const server = new ApolloServer({
    typeDefs: [
      userSchema,
      categorySchema,
      purchaseRequestSchema,
      ProductPriceSchema,
      quotationSchema,
      forgotPasswordSchema,
      orderSchema,
      orderDetailSchema,
      paymentSchema,
      shippingSchema,
      notificationSchema,
      supplierSchema,
      verificationSchema,
      draftSchemaSchema,
      reportSchema,
      companySchema,
    ],
    resolvers: [
      userResolver,
      categoryResolver,
      authResolver,
      purchaseRequestResolver,
      forgotPasswordResolver,
      ProductPriceResolver,
      quotationResolver,
      orderResolver,
      orderDetailResolver,
      paymentResolver,
      shippingResolver,
      notificationResolver,
      supplierResolver,
      verificationResolver,
      draftResolver,
      reportResolver,
      companyResolver,
      companyResolver,
    ],
    uploads: false, 
  });

  await server.start();
  server.applyMiddleware({ app });

  const httpServer = app.listen({ port: 4000 }, () => {
    console.log(`Server started on port 4000`);
  });

  SubscriptionServer.create(
    {
      execute,
      subscribe,
      schema: server.schema,
    },
    {
      server: httpServer,
      path: server.graphqlPath,
      onConnect: (connectionParams: any, websocket:any) => {
        // Check if the client is connected
        if (websocket.readyState === websocket.OPEN) {
          console.log('Client connected to WebSocket');
        } else {
          console.log('Client connection failed');
        }
      },
      onOperation: async (message: ExecutionParams, connection: any) => {
        // Provide the schema information
        return {
          schema: server.schema,
        };
      },
    }
  );

}

startServer().catch((error) => {
  console.error('Failed to start the server', error);
});