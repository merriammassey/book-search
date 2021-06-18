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
    bookId: String!
    authors: [Authors]
    description: String
    title: String!
    image: Image
    link: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    saveBook(
      authors: [Authors]!
      description: String!
      bookId: Int!
      image: Image!
      link: Link!
      title: String!
    ): User
    removeBook(bookId: Int!): User
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

// export the typeDefs
module.exports = typeDefs;
