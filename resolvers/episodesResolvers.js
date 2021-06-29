const episode = require('../models/episode')
const Episode = require('../models/episode')
const { AuthenticationError } = require('apollo-server-errors')
const { addFilm } = require('./filmResolvers')

const addEpisode = async (args, context) => {
  console.log('Add episode', args)

  const currentUser = context.currentUser

  if (!currentUser) {
    throw new AuthenticationError("not authenticated")
  }

  const episode = { ...args.episode }
  episode.films = []

  await Promise.all( args.episode.films.map(async film => {
    const addedFilm = await addFilm(film)
    episode.films.push(addedFilm._id)
  }))


  const newEpisode = new Episode( episode )

  const ret = await newEpisode.save()
  console.log("Finished adding", ret)
}

const getEpisodes = (args) => {
  const filter = {}

  if (args.gimmicks) {
    filter.gimmick = { $in: args.gimmicks }
  }
  if (args.hosts) {
    filter.hosts = { $in: args.hosts }
  }

  console.log("find episode", filter)
  return Episode.find(filter).populate('films')
}

const getRandomEpisode = async (args) => {
  const episodes = await getEpisodes(args)

  return episodes[Math.floor(Math.random()*episodes.length)]
}

const episodesResolvers = {
  Query: {
    episodes: (root, args) => getEpisodes(args),
    gimmicks: () => Episode.distinct('gimmick'),
    randomEpisode: (root, args) => getRandomEpisode(args)

  },
  Mutation: {
    addEpisode: async(root, args, context) => addEpisode(args, context)
  }
}

module.exports = {
  episodesResolvers,
}
