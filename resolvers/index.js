const { episodesResolvers } = require('./episodesResolvers')
const { filmResolvers } = require('./filmResolvers')
const { hostResolvers } = require('./hostResolvers')
const { utilResolvers } = require('./utilResolvers')
const { GraphQLDate } = require('graphql-iso-date')

const customScalarResolver = {
  Date: GraphQLDate
}

const resolvers = [
  customScalarResolver,
  episodesResolvers,
  filmResolvers,
  hostResolvers,
  utilResolvers
]

module.exports = {
  resolvers,
}
