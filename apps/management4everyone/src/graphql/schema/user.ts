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
    departmentId: Int
    department: Department
    attendances: [Attendance!]!
    leaves: [Leave!]!
  }
  type Attendance {
    id: Int!
    date: String!
    clockIn: String!
    clockOut: String
    user: User
  }
  type Leave {
    id: Int!
    userId: String!
    startDate: String!
    endDate: String!
    reason: String!
    status: LeaveStatus!
    user: User
  }
  enum LeaveStatus {
    PENDING
    APPROVED
    DENIED
  }
  enum Role {
    ADMIN
    WORKER
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
  # Статистик мэдээллийн төрөл
  type UserStats {
    totalUsers: Int!
    totalAdmins: Int!
    totalWorkers: Int!
    pendingLeaves: Int! # Хүлээгдэж буй чөлөөний хүсэлт
    todayAttendance: Int! # Өнөөдрийн ирц
  }

  extend type Query {
    # Админд зориулсан статистик мэдээлэл
    adminUserStats: UserStats!
  }
`;
