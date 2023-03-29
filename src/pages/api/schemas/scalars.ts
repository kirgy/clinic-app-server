import { GraphQLScalarType, Kind } from "graphql";

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "ISO8601 Date Time",
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw Error("GraphQL Date Scalar serializer expected a `Date` object");
  },
});
