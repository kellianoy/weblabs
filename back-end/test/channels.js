
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  describe( 'list', () => {
  
    it('list empty', async () => {
      // Return an empty channel list by default
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.eql([])
    })
    
    it('list one element', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email:'user_1'})
      //Create channel
      const {body: channel1} = await supertest(app)
      .post('/channels')
      .send({name: 'channel 1', owner: user1.email})
      .expect(201)
      // Ensure we list the channels correctly
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'channel 1'
      }])
    })  
  })
  
  it('create one element', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', owner: user1.email})
    .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1',
      owner: user1.id,
    })
    //Check if the user has been updated too
    const {body: user1validate} = await supertest(app)
    .get(`/users/${user1.id}`)
    //Check if the channel is inside of it properly
    user1validate.channels.should.containEql(channel.id);
    // Check it was correctly inserted
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(1)
  })
  
  it('get channel', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'}) 
    //Create channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1', owner: user1.email})
    .expect(201)
    // Check it was correctly inserted
    const {body: channel} = await supertest(app)
    .get(`/channels/${channel1.id}`)
    .expect(200)
    channel.name.should.eql('channel 1')
  })

  it('get channels of a user', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create a 2nd user
    // Create a user
    const {body: user2} = await supertest(app)
    .post('/users')
    .send({username: 'user_2', email:'user_2'})
     //Create channel
     const {body: channel1} = await supertest(app)
     .post('/channels')
     .send({name: 'channel 1', owner: user2.email})
     .expect(201)
    //Create channel
    const {body: channel2} = await supertest(app)
    .post('/channels')
    .send({name: 'Yippy', owner: user1.email})
    .expect(201)

    // Get list of channels of this user
    const {body: channels} = await supertest(app)
    .get(`/users/channels/${user1.email}`)
    .expect(200)
    channels.should.match([{
      name: 'Yippy',
      owner: user1.id,
    }])
  })
    
    it('get users of a channel', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email:'user_1'})
      //Create a 2nd user
      // Create a user
      const {body: user2} = await supertest(app)
      .post('/users')
      .send({username: 'user_2', email:'user_2'})
       //Create channel
       const {body: channel1} = await supertest(app)
       .post('/channels')
       .send({name: 'channel 1', owner: user2.email})
       .expect(201)
      //Create channel
      const {body: channel2} = await supertest(app)
      .post('/channels')
      .send({name: 'Yippy', owner: user1.email})
      .expect(201)
      // Get list of channels of this user
      const {body: users} = await supertest(app)
      .get(`/channels/users/${channel1.id}`)
      .expect(200)
      users.should.match([{
        username: user2.username,
        email: user2.email
      }])
    })

  it('update channel', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create channel
     const {body: channel} = await supertest(app)
     .post('/channels')
     .send({name: 'channel 1', owner: user1.email})
     .expect(201)
    //update channel
    const {body: newchannel} = await supertest(app)
    .put(`/channels/${channel.id}`)
    .send({name: "newname"})
    .expect(200)
    // Check it was correctly inserted
    newchannel.should.match({
      name: 'newname',
      owner: user1.id,
    })
  })

  it('delete channel', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email:'user_1'})
    //Create channel
     const {body: channel} = await supertest(app)
     .post('/channels')
     .send({name: 'channel 1', owner: user1.email})
     .expect(201)
    //delete
    await supertest(app)
    .delete(`/channels/${channel.id}`)
    .expect(200)
    // Check it was correctly deleted
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(0)
  })
  
})
