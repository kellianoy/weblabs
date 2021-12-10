
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

const self = module.exports = {
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
      self.users.update(user.email, user)
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
      //Before deleting the channel, let's remove every occurence of this channel in users
      const users = await self.channels.listChannelUsers(id)
      users.map(async (user, i) =>{
        user.channels.splice(user.channels.indexOf(id), 1)
        await self.users.update(user.email, user)
      })
      //Then delete the channel
      await db.del(`channels:${id}`)
    },
    join: async(id, joiner) => {
      if(!id) throw Error('Invalid channel id')
      if(!joiner.email) throw Error('Invalid channel joiner')
      //First, check if the user doesn't already have the channel in its array 
      //Getting a user through his email
      const userID = JSON.parse(await db.get(`users_email:${joiner.email}`))
      //Getting a user through his id 
      const user = JSON.parse(await db.get(`users:${userID.id}`))
      if (user.channels.includes(id)) throw Error('User has already joined this channel.')
      //Now get the channel to update it
      const selectedChannel=JSON.parse(await db.get(`channels:${id}`))
      //First update the channel
      selectedChannel.users.push(userID.id)
      //Then update the user
      user.channels.push(id)
      const newUser= await self.users.update(user.email, user)
      //Finally, update the final channel
      const newChannel = await self.channels.update(id, selectedChannel)
      return newChannel 
    },
    leave: async (id, leaver) => {
      if(!id) throw Error('Invalid channel id')
      if(!leaver.email) throw Error('Invalid channel leaver')
      const userID = JSON.parse(await db.get(`users_email:${leaver.email}`))
      const user = JSON.parse(await db.get(`users:${userID.id}`))
      //Now get the channel to update it
      const selectedChannel=JSON.parse(await db.get(`channels:${id}`))
      //update the user
      user.channels.splice(user.channels.indexOf(id), 1)
      await self.users.update(user.email, user)
      //Finally, update the final channel
      selectedChannel.users.splice(selectedChannel.users.indexOf(userID.id), 1)
      const newChannel = await self.channels.update(id, selectedChannel)
      return newChannel 
    },
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
      const list = await self.users.list()
      if(list.find((u)=> u.email===user.email)) throw Error('Existing user')
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
      const userE = JSON.parse(await db.get(`users_email:${email}`))
      if(!userE) throw Error('Not found')
      const user = JSON.parse(await db.get(`users:${userE.id}`))
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
    update: async (email, newUser) => {
      //Get the original channel
      const original = JSON.parse(await db.get(`users_email:${email}`))
      if(!original) throw Error('Unregistered channel id')
      await db.put(`users:${original.id}`, JSON.stringify(merge(original, newUser)))
      //return the new one
      return merge(original, newUser)
    },
    delete: async (email) => {
      if (!email) throw Error("No id given")
      const user = JSON.parse(await db.get(`users_email:${email}`))
      //Before deleting the user, let's remove every occurence of this user in channels
      const channels = await self.channels.listUserChannels(email)
      channels.map(async (channel, i) =>{
        //If the owner is our user, we need to delete all of his channels
        if(channel.owner===user.id)
          await self.channels.delete(channel.id, channel)
        else{
          channel.users.splice(channel.users.indexOf(user.id), 1)
          await self.channels.update(channel.id, channel)
        }
      })
      //Then delete the user
      await db.del(`users:${user.id}`)
      await db.del(`users_email:${email}`)
    }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
