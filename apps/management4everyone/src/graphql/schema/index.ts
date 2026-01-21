//apps/management4everyone/src/graphql/schema/index.ts
import { gql } from 'graphql-tag';
import { announcementTypeDefs } from './announcement';
import { attendanceTypeDefs } from './attendance';
import { departmentTypeDefs } from './department';
import { leaveTypeDefs } from './leave';
import { userTypeDefs } from './user';

export const typeDefs = gql`
  ${announcementTypeDefs},
  ${userTypeDefs},
  ${departmentTypeDefs},
  ${attendanceTypeDefs},
  ${leaveTypeDefs}

`;
