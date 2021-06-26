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

    addUser(
      username: String!
      password: String!
    ) : User

    login(
      username: String!
      password: String!
    ): Token
  }
`

module.exports = {
  mutation,
}