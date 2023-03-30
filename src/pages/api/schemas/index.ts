import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Date

  type Patient {
    id: ID!
    originId: ID!
    clinicId: ID!
    firstName: String!
    lastName: String!
    dateOfBirth: Date!
    clinic: Clinic
  }

  type Clinic {
    id: ID!
    originId: ID!
    name: ID!
    patients: [Patient]!
  }

  type Query {
    getPatient(id: ID!): Patient
  }

  type Query {
    getClinic(id: ID!): Clinic
  }
`;
