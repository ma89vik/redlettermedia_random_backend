const mongoose = require('mongoose')

const Episode = require('../models/episode')
const { CountDict } = require('../utils/countDict')

const findHosts = async () => {
  const episodes = await Episode.find({}).lean().select('hosts').exec()

  const cntDict = new CountDict()
  episodes.forEach(episode => {
    cntDict.countArray(episode.hosts)
  })

  const hostCnt = cntDict.getItems()
  const hosts = []
  for (const [key, value] of Object.entries(hostCnt)) {
    hosts.push( { 'name': key, 'episodeCount': value} )
  }

  return hosts
}

const hostResolvers = {
  Query: {
    hosts: () => findHosts()
  },
}

module.exports = {
  hostResolvers,
}
