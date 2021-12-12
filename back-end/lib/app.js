
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
const authenticate = authenticator({
  test_payload_email: process.env['TEST_PAYLOAD_EMAIL'],
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())

app.get('/', (req, res) => {
  res.send([
    '<h1>ECE WebTech Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', authenticate, async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

//Create a channel
app.post('/channels', authenticate, async (req, res) => {
  try {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
  }
  catch(err){
    res.status(403).send("Channel name isn't correct")
  }
})

app.get('/channels/:id', authenticate, async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

//list user channels
app.get('/users/channels/:email', authenticate, async (req, res) => {
  const channel = await db.channels.listUserChannels(req.params.email)
  res.json(channel)
})

//list channel users
app.get('/channels/users/:id', authenticate, async (req, res) => {
  const users = await db.channels.listChannelUsers(req.params.id)
  res.json(users)
})

app.put('/channels/:id', authenticate, async (req, res) => {
  const channel = await db.channels.update(req.params.id, req.body)
  res.json(channel)
})

app.put('/channels/join/:id', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.join(req.params.id, req.body)
    res.status(200).json(channel)
  }
  catch(err){
    res.status(403).send(err)
  }
})

app.put('/channels/leave/:id', authenticate, async (req, res) => {
  try {
    const channel = await db.channels.leave(req.params.id, req.body)
    res.status(200).json(channel)
  }
  catch(err){
    res.status(403).send(err)
  }
})

app.delete('/channels/:id', authenticate, async (req, res) => {
  await db.channels.delete(req.params.id)
  res.status(200).send("Done")
})

// Messages

//Get list of messages
app.get('/channels/:id/messages', authenticate, async (req, res) => {
  try{
    const channel = await db.channels.get(req.params.id)
  }catch(err){
    return res.status(404).send('Channel does not exist.')
  }
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

//Get one message
app.get('/channels/:id/messages/:creation', authenticate, async (req, res) => {
  const message = await db.messages.get(req.params.id, req.params.creation)
  res.status(200).json(message)
})

//Update one message
app.put('/channels/:id/messages/:creation', authenticate, async (req, res) => {
  const message = await db.messages.update(req.params.id, req.params.creation, req.body)
  res.status(200).json(message)
})

//Create one message
app.post('/channels/:id/messages', authenticate, async (req, res) => {
  try{
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
  }catch(err){
    return res.status(400).send(err)
  }
})

//Delete one message
app.delete('/channels/:id/messages/:creation', authenticate, async (req, res) => {
  try {
    await db.messages.delete(req.params.id, req.params.creation)
    res.status(200).send("Done")
  }
  catch(err) {
    res.status(400).send(err)
  }
})

//Delete all messages of a channel
app.delete('/channels/:id/messages/', authenticate, async (req, res) => {
  try {
    await db.messages.deleteAll(req.params.id)
    res.status(200).send("Done")
  }
  catch(err) {
    res.status(400).send(err)
  }
})

// Users

app.get('/users', authenticate, async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', authenticate, async (req, res) => {
  try {

    const user = await db.users.create(req.body)
    res.status(201).json(user)
  }
  catch(err) {
    res.status(403).send(err)
  }
})

app.get('/users/:id', authenticate, async (req, res) => {
  try {
    const user = await db.users.getID(req.params.id)
    res.status(200).json(user)
  }
  catch(err)
  {
    res.status(404).send("User not found")
  }
})

app.get('/users/email/:email', authenticate, async (req, res) => {
  try {
    const user = await db.users.getEmail(req.params.email)
    res.json(user)
  }
  catch(err)
  {
    res.status(404).send(err)
  }
})

app.put('/users/:email', authenticate, async (req, res) => {
  const user = await db.users.update(req.params.email, req.body)
  res.json(user)
})

app.delete('/users/:email', authenticate, async (req, res) => {
  await db.users.delete(req.params.email)
  res.status(200).send("Done")
})

module.exports = app
