const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");

const resolvers = {
  Query: {
    //get a single user - me
    me: async (_, __, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      throw new AuthenticationError("You're not logged in.");
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      return user;
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      return user;
    },
  },
  saveBook: async () => {},
  deleteBook: async () => {},
};

module.exports = resolvers;
