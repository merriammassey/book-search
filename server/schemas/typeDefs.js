// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Query {
    me: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Book {
    bookId: ID
    authors: [String]
    description: String
    title: String!
    image: String
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    saveBook(
      bookId: ID
      authors: [String]
      description: String
      title: String!
      image: String
      link: String
    ): User
    removeBook(bookId: ID!): User
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;
