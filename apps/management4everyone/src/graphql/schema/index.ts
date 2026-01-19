//apps/management4everyone/src/graphql/schema/index.ts
import { gql } from 'graphql-tag';
import { announcementTypeDefs } from './announcement';

export const typeDefs = gql`
  ${announcementTypeDefs}
`;
