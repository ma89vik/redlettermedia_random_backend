const mongoose = require('mongoose')

const Film = require('../models/film')

const addFilm = async (args) => {
  console.log('Add film', args)
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
    addFilm: async(root, args) => addFilm(args)
  }
}

module.exports = {
  filmResolvers,
  addFilm
}
