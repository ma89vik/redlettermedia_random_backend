const { gql } = require('apollo-server');

const query = gql`
  type Query {
    episodes: [Episode]!
    hosts: [Host]!
    gimmicks: [String]!
    films: [Film]!
  }
`

module.exports = {
  query,
}