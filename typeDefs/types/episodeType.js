const { gql } = require('apollo-server')

const episodeInputType = gql`
  input EpisodeInput {
    title: String!
    gimmick: String!
    releaseDate: Date!
    hosts: [String!]
    films: [FilmInput]!
    link: String!
  }
`

const episodeType = gql`
  type Episode {
    title: String
    gimmick: String
    releaseDate: Date
    hosts: [String]
    films: [Film]
    link: String
  }
`

module.exports = {
  episodeType,
  episodeInputType,
}
