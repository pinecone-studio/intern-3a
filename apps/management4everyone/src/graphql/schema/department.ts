// apps/management4everyone/src/graphql/schema/department.ts
import { gql } from 'graphql-tag';

export const departmentTypeDefs = gql`
  type Department {
    id: Int!
    name: String!
    createdAt: String
    updatedAt: String
  }

  input UpdateDepartmentInput {
    name: String!
  }

  type Query {
    # ADMIN
    departments: [Department!]!
    department(id: Int!): Department
  }

  type Mutation {
    # ADMIN
    updateDepartment(id: Int!, input: UpdateDepartmentInput!): Department!
    deleteDepartment(id: Int!): Boolean!

    # USER
    selectMyDepartment(departmentId: Int!): Boolean!
  }
`;
