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
    originId: ID!
    clinicId: ID!
    firstName: String!
    lastName: String!
    dateOfBirth: Date!
  }

  type Clinic {
    id: ID!
    originId: ID!
    name: ID!
  }

  type Query {
    getUser(name: String!): User!
  }

  type Query {
    getPatient(id: ID!): Patient
  }

  type Query {
    getClinic(id: ID!): Clinic
  }
`;
