"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const DateScalar = new graphql_1.GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for representing dates',
    /* parseValue(value: string) {
       // Convert the value from the client (string) to a Date object
       return new Date(value);
     },
     serialize(value: Date) {
       // Convert the Date object to a string when sending the response to the client
       return value.toISOString();
     },*/
    parseLiteral(ast) {
        // Convert the AST value to a Date object
        if (ast.kind === graphql_1.Kind.STRING) {
            return new Date(ast.value);
        }
        return null;
    },
});
exports.default = DateScalar;
