import { gql } from 'graphql-tag';
import { announcementTypeDefs } from './announcement';

export const typeDefs = gql`
  ${announcementTypeDefs}
`;
