import { GraphQLScalarType, Kind } from 'graphql';

const DateScalar = new GraphQLScalarType({
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
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return null;
  },
});

export default DateScalar;