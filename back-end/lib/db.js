
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel name')
      if(!channel.owner) throw Error('Invalid channel creator')
      const id = uuid()
      //we have a new ID, now we have to add the channel to the owner
      const data = await db.get(`users_email:${channel.owner}`)
      const userID = JSON.parse(data)
      const data2 = await db.get(`users:${userID.id}`)
      const user = JSON.parse(data2)
      channel = merge(channel, {owner: userID.id} )
      user.channels.push(id)
      //Then we create a new channel entry
      await db.put(`channels:${id}`, JSON.stringify(merge(channel, {users:[userID.id]})))
      //Then we update the entry of the user
      await db.put(`users:${userID.id}`, JSON.stringify(user))
      return merge(channel, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
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
    },
    listUserChannels: async (email) => {
      const data = await db.get(`users_email:${email}`)
      const userID = JSON.parse(data)
      const data2 = await db.get(`users:${userID.id}`)
      const user = JSON.parse(data2)
      //Now that we have our array, we can get only the channels that we want
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          if(user.channels.includes(channel.id))
            channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    listChannelUsers: async (id) => {
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      //Now that we have our array, we can get only the channels that we want
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          if(channel.users.includes(user.id))
            users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: async (id, channel) => {
      //Get the original channel
      const original = JSON.parse(await db.get(`channels:${id}`))
      if(!original) throw Error('Unregistered channel id')
      await db.put(`channels:${id}`, JSON.stringify(merge(original, channel)))
      //return the new one
      return merge(original, channel)
    },
    delete: async (id) => {
      if (!id) throw Error("No id given")
      await db.del(`channels:${id}`)
    }
  },
  messages: {
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
  },
  users: {
    create: async (user) => {
      if(!user.username) throw Error('No username given')
      if(!user.email) throw Error('No email given')
      const id = uuid()
      const merged=merge(user, {id: id})
      //Entry in the lookup table
      await db.put(`users_email:${user.email}`, JSON.stringify({id: id}))
      await db.put(`users:${id}`, JSON.stringify(merge(user, {channels:[]})))
      return merged
    },
    getID: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    getEmail: async (email) => {
      if(!email) throw Error('Invalid email')
      const data = await db.get(`users_email:${email}`)
      const userE = JSON.parse(data)
      const data2 = await db.get(`users:${userE.id}`)
      const user = JSON.parse(data2)
      return merge(user)
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
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    delete: (id) => {
      if(!store.users[id]) throw Error('Unregistered user id')
      if(!store.usersByEmail[store.users[id].email]) throw Error('Unregistered user email')
      delete store.usersByEmail[store.users[id].email]
      delete store.users[id]
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
