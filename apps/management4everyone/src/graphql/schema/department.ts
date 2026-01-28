// apps/management4everyone/src/graphql/schema/department.ts
import { gql } from 'graphql-tag';

export const departmentTypeDefs = gql`
  type Department {
    id: Int!
    name: String!
    createdAt: String
    updatedAt: String
  }

  # Шинээр нэмэхэд ашиглах input
  input CreateDepartmentInput {
    name: String!
  }

  input UpdateDepartmentInput {
    name: String!
  }

  type Query {
    # ADMIN
    departments: [Department!]!
    department(id: Int!): Department
    myDepartment: Department
  }

  type Mutation {
    # 🔒 ADMIN: Шинэ хэлтэс үүсгэх, засах, устгах
    createDepartment(input: CreateDepartmentInput!): Department!
    updateDepartment(id: Int!, input: UpdateDepartmentInput!): Department!
    deleteDepartment(id: Int!): Boolean!

    # 🔒 ADMIN: Тодорхой нэг ажилтанд хэлтэс оноох (userId ашиглана)
    # Өмнөх selectMyDepartment-ийн оронд үүнийг ашиглана
    assignUserDepartment(userId: String!, departmentId: Int!): Boolean!
  }
`;
