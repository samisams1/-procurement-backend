"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers_1 = __importDefault(require("./modules/PurchaseRequest/resolvers"));
const resolver_1 = __importDefault(require("./modules/Category/resolver"));
const schema_1 = __importDefault(require("./modules/Category/schema"));
const resolver_2 = __importDefault(require("./modules/ProductPrice/resolver"));
const schema_2 = __importDefault(require("./modules/ProductPrice/schema"));
const schema_3 = __importDefault(require("./modules/PurchaseRequest/schema"));
const resolver_3 = require("./modules/auth/resolver");
const resolver_4 = __importDefault(require("./modules/user/resolver"));
const schema_4 = __importDefault(require("./modules/user/schema"));
const schema_5 = __importDefault(require("./modules/Quotation/schema"));
const resolvers_2 = __importDefault(require("./modules/Quotation/resolvers"));
const schema_6 = __importDefault(require("./modules/order/schema"));
const resolver_5 = __importDefault(require("./modules/order/resolver"));
const schema_7 = __importDefault(require("./modules/OrderDetail/schema"));
const resolvers_3 = __importDefault(require("./modules/OrderDetail/resolvers"));
const resolver_6 = __importDefault(require("./modules/Payment/resolver"));
const paymentSchema_1 = __importDefault(require("./modules/Payment/paymentSchema"));
const resolver_7 = __importDefault(require("./modules/Shipping/resolver"));
const schema_8 = __importDefault(require("./modules/Shipping/schema"));
const schema_9 = __importDefault(require("./modules/Notification/schema"));
const resolver_8 = __importDefault(require("./modules/Notification/resolver"));
const supplierSchema_1 = __importDefault(require("./modules/supplier/supplierSchema"));
const resolver_9 = __importDefault(require("./modules/supplier/resolver"));
const schema_10 = __importDefault(require("./modules/ForgotPassword/schema"));
const resolver_10 = __importDefault(require("./modules/ForgotPassword/resolver"));
const resolver_11 = __importDefault(require("./modules/verification/resolver"));
const schema_11 = __importDefault(require("./modules/verification/schema"));
const resolver_12 = __importDefault(require("./modules/draft/resolver"));
const schema_12 = __importDefault(require("./modules/draft/schema"));
const schema_13 = __importDefault(require("./modules/report/schema"));
const resolver_13 = __importDefault(require("./modules/report/resolver"));
const resolver_14 = __importDefault(require("./modules/company/resolver"));
const schema_14 = __importDefault(require("./modules/company/schema"));
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
            schema_4.default,
            schema_1.default,
            schema_3.default,
            schema_2.default,
            schema_5.default,
            schema_10.default,
            schema_6.default,
            schema_7.default,
            paymentSchema_1.default,
            schema_8.default,
            schema_9.default,
            supplierSchema_1.default,
            schema_11.default,
            schema_12.default,
            schema_13.default,
            schema_14.default,
        ],
        resolvers: [
            resolver_4.default,
            resolver_1.default,
            resolver_3.authResolver,
            resolvers_1.default,
            resolver_10.default,
            resolver_2.default,
            resolvers_2.default,
            resolver_5.default,
            resolvers_3.default,
            resolver_6.default,
            resolver_7.default,
            resolver_8.default,
            resolver_9.default,
            resolver_11.default,
            resolver_12.default,
            resolver_13.default,
            resolver_14.default,
            resolver_14.default,
        ],
        uploads: false,
    });
    await server.start();
    server.applyMiddleware({ app });
    const httpServer = app.listen({ port: 4000 }, () => {
        console.log(`Server started on port 4000`);
    });
    SubscriptionServer.create({
        execute,
        subscribe,
        schema: server.schema,
    }, {
        server: httpServer,
        path: server.graphqlPath,
        onConnect: (connectionParams, websocket) => {
            // Check if the client is connected
            if (websocket.readyState === websocket.OPEN) {
                console.log('Client connected to WebSocket');
            }
            else {
                console.log('Client connection failed');
            }
        },
        onOperation: async (message, connection) => {
            // Provide the schema information
            return {
                schema: server.schema,
            };
        },
    });
}
startServer().catch((error) => {
    console.error('Failed to start the server', error);
});
