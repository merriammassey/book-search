import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook(bookId: String!, user: ID!) {
    saveBook(bookId: $bookId, user: $user) {
        bookID
        authors
        description
        title
        image
        link
        savedBooks {
            bookID
            authors
            description
            title
            image
            link
        }
    }
  }   
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookID) {
      bookID
      authors
      description
      title
      image
      link
      savedBooks {
        bookID
        authors
        description
        title
        image
        link
      }
    }
  }
`;
