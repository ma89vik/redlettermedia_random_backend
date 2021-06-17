const { gql } = require('apollo-server')
const { episodeType, episodeInputType } = require('./episodeType')
const { filmType, filmInputType } = require('./filmType')
const { hostType } = require('./hostType')

const genericTypeDefs = gql`
  scalar Date
`

const types = [genericTypeDefs, episodeType, episodeInputType, filmType, filmInputType, hostType]

module.exports = {
  types,
}