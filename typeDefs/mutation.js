const { gql } = require('apollo-server');

const mutation = gql`
  type Mutation {
    addEpisode(
      episode: EpisodeInput
    ): Episode

    addFilm(
      film: FilmInput
    ): Film

    dropCollections : String
  }
`

module.exports = {
  mutation,
}