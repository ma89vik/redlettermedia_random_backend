const { gql } = require('apollo-server')

const filmType = gql`
type Film {
  title: String!
  genre: String
}
`

const filmInputType = gql`
input FilmInput {
  title: String!
  genre: String
}
`
module.exports = {
    filmType,
    filmInputType,
  }
