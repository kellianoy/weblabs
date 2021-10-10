
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    }
  },
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    }
  },
  messages: {
    create: async (message, idChannel) => {
      if(!message.content) throw Error('Message empty')
      id=Date.now()
      await db.put(`messages:${id}`, JSON.stringify(message))
      return merge({creation: id}, message, {idChannel : idChannel})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: "messages:",
          lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          message.id = key.split(':')[1]
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
