const mongoose = require('mongoose')
const { AuthenticationError } = require('apollo-server-errors')

const Film = require('../models/film')
const Episode = require('../models/episode')

const dropCollections = async (context) => {
  const currentUser = context.currentUser

  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }

  await Film.deleteMany({})
  await Episode.deleteMany({})

}

const utilResolvers = {
  Mutation: {
    dropCollections: async(root, args, context) => dropCollections(context)
  }
}

module.exports = {
  utilResolvers
}
