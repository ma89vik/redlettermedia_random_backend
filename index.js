const mongoose = require('mongoose')
const { ApolloServer, gql } = require('apollo-server')

const config = require('./utils/config')
const logger = require('./utils/logger')

const { typeDefs } = require('./typeDefs')
const { resolvers } = require('./resolvers')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})