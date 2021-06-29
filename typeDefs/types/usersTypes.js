const { gql } = require('apollo-server')

const userType = gql`
type User {
  username: String!
  admin: Boolean!
  id: ID!
}
`

const tokenType = gql`
type Token {
  value: String!
}
`

const usersTypes = [ tokenType, userType ]

module.exports = {
  usersTypes,
  }
