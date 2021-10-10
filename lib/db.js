
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

var level = require('level')
var sublevel= require('level-sublevel')

var db= sublevel(level('/../db',{valueEncoding: 'json'}))

var channelsdb=db.sublevel('channels')
var usersdb=db.sublevel('users')
var messagesdb=db.sublevel('messages')
//const store =  {
//  channels: {
//  },
//  users: {
//  },
//  messages: {
//  }
//}
// const level = require('level')
// const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      id = uuid()
      channelsdb.put(id,{},function(err){})
      //store.channels[id] = channel
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      var channel=[]
      var stream= channelsdb.createReadStream()
      stream.on('data',function(current){
        channel.push(current)
      })
      stream.on('close',function(){
        return channel
      })
      return channel
      //return Object.keys(store.channels).map( (id) => {
      //  const channel = clone(store.channels[id])
      //  channel.id = id
      //  return channel
      //})
      // return new Promise( (resolve, reject) => {
      //   const channels = []
      //   db.createReadStream({
      //     gt: "channels:",
      //     lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      //   }).on( 'data', ({key, value}) => {
      //     channel = JSON.parse(value)
      //     channel.id = key.split(':')[1]
      //     channels.push(channel)
      //   }).on( 'error', (err) => {
      //     reject(err)
      //   }).on( 'end', () => {
      //     resolve(channels)
      //   })
      // })
    },
    update: (id, channel) => {
      var channel=[]
      var stream= channelsdb.createReadStream()
      stream.on('data',function(current){
        current.keys=id
      })
      stream.on('close',function(){})
      
      //const original = store.channels[id]
      //if(!original) throw Error('Unregistered channel id')
      //store.channels[id] = merge(original, channel)
    },
    delete: (id, channel) => {
      channelsdb.del(id,function(err){
        channelsdb.get(id,function(err,current){
          console.log(current)
        })
      })
      //const original = store.channels[id]
      //if(!original) throw Error('Unregistered channel id')
      // store.channels[id]
    }
  },
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      id = uuid()
      store.users[id] = user
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(user, {id: id})
    },
    list: async () => {
      return Object.keys(store.users).map( (id) => {
        const user = clone(store.users[id])
        user.id = id
        return user
      })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  messages: {
    create: async (message, idChannel) => {
      if(!message.content) throw Error('Message empty')
      id=Date.now()
      store.messages[id]={
        creation: id,
        content: message.content,
        idChannel: idChannel
      }
      return merge({creation: id}, message, {idChannel : idChannel})
    },
    list: async () => {
      return Object.keys(store.messages).map((id) => {
        const message = clone(store.messages[id])
        message.id = id
        return message
      })
    },
    update: (id, message) => {
      const original = store.messages[id]
      if(!original) throw Error('Unregistered message id')
      store.messages[id] = merge(original, message)
    },
    delete: (id, message) => {
      const original = store.messages[id]
      if(!original) throw Error('Unregistered message id')
      delete store.messages[id]
    }
  },
  admin: {
    clear: async () => {
      store.channels = {}
      store.users = {}
      store.messages = {}
      // await db.clear()
    }
  }
}
