import { gql } from 'graphql-tag';

export const leaveTypeDefs = gql`
  enum LeaveStatus {
    PENDING
    APPROVED
    DENIED
  }

  type Leave {
    id: Int!
    userId: String!
    startDate: String!
    endDate: String!
    reason: String!
    status: LeaveStatus!
    createdAt: String
    updatedAt: String
    user: User # Хүсэлт гаргасан ажилчны мэдээлэл
  }

  input CreateLeaveInput {
    startDate: String!
    endDate: String!
    reason: String!
  }

  type Query {
    # Админ бүх хүсэлтийг харна
    allLeaves: [Leave!]!
    # Хэрэглэгч зөвхөн өөрийн хүсэлтүүдийг харна
    myLeaves: [Leave!]!
  }

  type Mutation {
    # Ажилтан чөлөөний хүсэлт үүсгэх
    createLeave(input: CreateLeaveInput!): Leave!

    # Админ хүсэлтийн төлөв өөрчлөх (APPROVED, DENIED)
    updateLeaveStatus(id: Int!, status: LeaveStatus!): Leave!
  }
`;
