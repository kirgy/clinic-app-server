import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Date

  type User {
    id: ID
    login: String
    avatar_url: String
  }

  type Patient {
    id: ID!
    clinicId: ID!
    firstName: String!
    lastName: String!
    dateOfBirth: Date!
  }

  type Query {
    getUser(name: String!): User!
  }

  type Query {
    getPatient(id: ID!): Patient!
  }
`;
