const mongoose = require('mongoose')

const Film = require('../models/film')
const Episode = require('../models/episode')

const dropCollections = async () => {
  console.log('Dropping collections')

  await Film.deleteMany({})
  await Episode.deleteMany({})

}

const utilResolvers = {
  Mutation: {
    dropCollections: async() => dropCollections()
  }
}

module.exports = {
  utilResolvers
}
