const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const createUser = (args) => {
  const user = new User({ username: args.username })

  return user.save()
    .catch(error => {
      throw new UserInputError(error.message, {
        invalidArgs: args,
      })
    })
}

const login = async ({username, password}) => {
  const user = await User.findOne({ username: username })

  if ( !user || password !== 'secret' ) {
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
    createUser: (root, args) => createUser(args),
    login: (root, args) => login(args)
  }
 ,
},

module.exports = {
  userResolvers,
}
