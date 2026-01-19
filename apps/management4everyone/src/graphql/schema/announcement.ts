import { gql } from 'graphql-tag';

export const announcementTypeDefs = gql`
  type Announcement {
    id: Int!
    title: String!
    content: String!
    createdAt: String!
  }

  type Query {
    announcements: [Announcement!]!
    announcement(id: Int!): Announcement
  }

  type Mutation {
    createAnnouncement(title: String!, content: String!): Announcement!
    updateAnnouncement(id: Int!, title: String!, content: String!): Announcement!
    deleteAnnouncement(id: Int!): Boolean!
  }
`;
