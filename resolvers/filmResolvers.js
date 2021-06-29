const mongoose = require('mongoose')
const { AuthenticationError } = require('apollo-server-errors')

const Film = require('../models/film')

const addFilm = async (args, context) => {
  const currentUser = context.currentUser

  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }


  const film = args.film

  const filter = { title: film.title }
  const update = { poster: film.poster, url: film.url }

  const res = await Film.findOneAndUpdate(filter, update, {
    new: true,
    upsert: true
  })
  console.log("Result ", res)
  return res
}

const filmResolvers = {
  Query: {
    films: () => Film.find({}),
  },
  Mutation: {
    addFilm: async(root, args, context) => addFilm(args, context)
  }
}

module.exports = {
  filmResolvers,
  addFilm
}
