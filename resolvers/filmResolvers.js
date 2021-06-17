const mongoose = require('mongoose')

const Film = require('../models/film')

const addFilm = (args) => {
  console.log('Add film', args)

  const newFilm = new Film( { ...args } )

  return newFilm.save()
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
