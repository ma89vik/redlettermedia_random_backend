const mongoose = require('mongoose')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const { AuthenticationError, UserInputError } = require('apollo-server-errors')

const User = require('../models/user')

const JWT_SECRET = process.env.JWT_SECRET
const saltRounds = 10

const createUser = async (args, context) => {

  const currentUser = context.currentUser

  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }

  const passwordHash = await bcrypt.hash(args.password, saltRounds)

  const user = new User({ username: args.username, passwordHash: passwordHash })

  return user.save()
    .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
}

const login = async ({username, password}) => {
  const user = await User.findOne({ username: username })

  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if ( !passwordCorrect ) {
    throw new UserInputError("wrong credentials")
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  return { value: jwt.sign(userForToken, JWT_SECRET) }
}

const userResolvers = {
  Mutation: {
    createUser: (root, args, context) => createUser(args, context),
    login: (root, args) => login(args)
  }
}

module.exports = {
  userResolvers,
}
