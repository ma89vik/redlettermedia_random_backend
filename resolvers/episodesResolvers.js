const episode = require('../models/episode')
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

  const ret = await newEpisode.save()
  console.log("Finished adding", ret)
}

const getEpisodes = (args) => {
  const filter = { gimmick: { $in: args.gimmicks }, hosts: { $in: args.hosts}  }

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
    addEpisode: async(root, args) => addEpisode(args)
  }
}

module.exports = {
  episodesResolvers,
}
