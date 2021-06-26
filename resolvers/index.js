const { episodesResolvers } = require('./episodesResolvers')
const { filmResolvers } = require('./filmResolvers')
const { hostResolvers } = require('./hostResolvers')
const { utilResolvers } = require('./utilResolvers')
const { userResolvers } = require('./userResolvers')
const { GraphQLDate } = require('graphql-iso-date')

const customScalarResolver = {
  Date: GraphQLDate
}

const resolvers = [
  customScalarResolver,
  episodesResolvers,
  filmResolvers,
  hostResolvers,
  utilResolvers,
  userResolvers
]

module.exports = {
  resolvers,
}
