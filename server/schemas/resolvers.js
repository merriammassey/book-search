const { AuthenticationError } = require("apollo-server-express");
const { User, Book } = require("../models");
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

    saveBook: async (parent, { bookData }, context) => {
      console.log(bookData);
      console.log(context.user);
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedBooks: bookData } },
          { new: true, runValidators: true }
        ).populate("savedBooks");
        console.log(user);
        return user;
      }
    },

    removeBook: async (parent, bookId, context) => {
      const user = await User.findByIdAndUpdate(
        { _id: context.user._id },
        { $pull: { savedBooks: bookId } },
        { new: true }
      );
      return user;
    },
  },
};

module.exports = resolvers;
