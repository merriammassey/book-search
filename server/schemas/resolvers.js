const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

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
      const token = signToken(user);
      return { token, user };
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
      const token = signToken(user);
      console.log(token);
      return { token, user };
    },

    saveBook: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $push: { savedBooks: args.bookData } },
        { new: true }
      );
    },

    removeBook: async (parent, args, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: args.bookData } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
