
const supertest = require('supertest')
const microtime = require('microtime')
const app = require('../lib/app')
const db = require('../lib/db')

describe('messages', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('list empty', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', owner: user1.email})
    .expect(201)
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.eql([])
  })
  
  it('list one message', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create channel
    const {body: channel} = await supertest(app)
     .post('/channels')
     .send({name: 'channel 1', owner: user1.email})
     .expect(201)
    // and a message inside it
    await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({author: 'whoami', content: 'Hello ECE'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([{
      author: 'whoami',
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      content: 'Hello ECE'
    }])
  })
  
  it('add one element', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create channel
    const {body: channel} = await supertest(app)
     .post('/channels')
     .send({name: 'channel 1', owner: user1.email})
     .expect(201)
    // Create a message inside it
    const {body: message} = await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({author: 'whoami', content: 'Hello ECE'})
    .expect(201)
    message.should.match({
      author: 'whoami',
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      content: 'Hello ECE'
    })
    // Check it was correctly inserted
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    messages.length.should.eql(1)
  })
  
  it('access invalid channel', async () => {
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/1234/messages`)
    .expect(404)
  })
  
})
