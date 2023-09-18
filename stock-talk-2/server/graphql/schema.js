const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Post {
    _id: ID!
    text: String!
    category: String!
    likes: Int!
    date: String!
    user: User!
  }

  type Query {
    user(_id: ID!): User
    users: [User]
    post(_id: ID!): Post
    posts: [Post]
    postsByCategory(category: String!): [Post]
    commoditiesData: String
  }

  type Mutation {
    createUser(name: String!, email: String!, password: String!): User
    loginUser(email: String!, password: String!): String
    createPost(text: String!, category: String!): Post
    likePost(_id: ID!): Post
  }
`;

module.exports = typeDefs;
