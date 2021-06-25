const { gql } = require('apollo-server')

const filmType = gql`
type Film {
  title: String!
  poster: String
  url: String
}
`

const filmInputType = gql`
input FilmInput {
  title: String!
  poster: String
  url: String
}
`
module.exports = {
    filmType,
    filmInputType,
  }
