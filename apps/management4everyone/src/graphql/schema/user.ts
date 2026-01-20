import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
  enum Role {
    ADMIN
    WORKER
  }

  type User {
    id: String!
    clerkUserId: String!
    email: String!
    firstName: String
    lastName: String
    role: Role
  }

  input UpdateUserInput {
    firstName: String
    lastName: String
  }

  type Query {
    allUsers: [User!]!
    me: User
  }

  type Mutation {
    updateMe(input: UpdateUserInput!): User!
  }
`;
