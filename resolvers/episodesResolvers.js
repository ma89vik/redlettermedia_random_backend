const { argsToArgsConfig } = require('graphql/type/definition')
const mongoose = require('mongoose')

const Episode = require('../models/episode')

const { addFilm } = require('./filmResolvers')

const addEpisode = async (args) => {
  console.log('Add episode', args)

  const episode = { ...args.episode }
  episode.films = []

  await Promise.all( args.episode.films.map(async film => {
    const addedFilm = await addFilm(film)
    episode.films.push(addedFilm._id)
  }))


  const newEpisode = new Episode( episode )

  newEpisode.save()
}

const episodesResolvers = {
  Query: {
    episodes: () => Episode.find({}).populate('films')
  },
  Mutation: {
    addEpisode: async(root, args) => addEpisode(args)
  }
}

module.exports = {
  episodesResolvers,
}
