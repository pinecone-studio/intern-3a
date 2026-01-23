import { gql } from 'graphql-tag';

export const attendanceTypeDefs = gql`
  type Attendance {
    id: Int!
    date: String!
    clockIn: String!
    clockOut: String
    user: User
  }

  extend type Query {
    myAttendances: [Attendance!]!
    attendances(filter: AttendanceFilterInput): [Attendance!]!
  }

  input AttendanceFilterInput {
    userId: String
    fromDate: String
    toDate: String
  }

  extend type Mutation {
    # 👤 WORKER – ирц нээх (өдөрт 1 удаа)
    clockIn: Attendance!

    # 👤 WORKER – тарах
    clockOut: Attendance!
  }
`;
