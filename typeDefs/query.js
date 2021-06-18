const { gql } = require('apollo-server');

const query = gql`
  type Query {
    hosts: [Host]!
    gimmicks: [String]!
    films: [Film]!

    episodes(
      hosts: [String!]
      gimmicks: [String!]
    ) : [Episode]!

    randomEpisode(
      hosts: [String!]
      gimmicks: [String!]
    ) : Episode
  }
`

module.exports = {
  query,
}