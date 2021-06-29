const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')

const config = require('./utils/config')
const logger = require('./utils/logger')

const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')
const { User } = require('./models/user')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({ typeDefs, resolvers ,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})