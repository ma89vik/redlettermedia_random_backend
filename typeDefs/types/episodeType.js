const { gql } = require('apollo-server')

const episodeInputType = gql`
  input EpisodeInput {
    title: String!
    gimmick: String!
    releaseDate: Date!
    hosts: [String!]
    films: [FilmInput]!
  }
`

const episodeType = gql`
  type Episode {
    title: String
    gimmick: String
    releaseDate: Date
    hosts: [String]
    films: [Film]
  }
`

module.exports = {
  episodeType,
  episodeInputType,
}
