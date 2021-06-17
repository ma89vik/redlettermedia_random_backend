const { gql } = require('apollo-server')

const hostType = gql`
type Host {
  name: String!
  episodeCount: Int!
}
`
module.exports = {
    hostType,
  }
