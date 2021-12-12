
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('users', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('list empty', async () => {
    // Return an empty user list by default
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.eql([])
  })
  
  it('list one element', async () => {
    // Create a user
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email: 'user_1'})
    .expect(201)
    // Ensure we list the users correctly
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      username: user.username,
      email: user.email,
    }])
  })
  
  it('add one element', async () => {
    // Create a user
    await supertest(app)
    .post('/users')
    .send({username: 'user_1', email: 'user_1'})
    .expect(201)
    // Check its return value
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get('/users')
    users.length.should.eql(1)
  })
  
  it('add same element', async () => {
    // Create a user
    await supertest(app)
    .post('/users')
    .send({username: 'user_1', email: 'user_1'})
    .expect(201)

    // Create a user
    await supertest(app)
    .post('/users')
    .send({username: 'user_1', email: 'user_1'})
    .expect(403)

    // Check if no two same elements are in 
    const {body: users} = await supertest(app)
    .get('/users')
    users.length.should.eql(1)
  })

  it('get user', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({username: 'user_1', email: 'user_1'})
    .expect(201)
    // Check it was correctly inserted
    const {body: user} = await supertest(app)
    .get(`/users/${user1.id}`)
    .expect(200)
    user.email.should.eql('user_1')
  })
  
  describe( 'update', () => {
    it('update user', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'user_1'})
      .expect(201)

      const {body: newUser} = await supertest(app)
      .put(`/users/${user1.email}`)
      .send({username: 'Dodge', email: 'user_1'})
      .expect(200)
      newUser.username.should.match("Dodge")
      newUser.email.should.match("user_1")
    })

    it('update user and see if its channel is still there', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'user_1'})
      .expect(201)
      //Create channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({name: 'channel 1', owner: user1.email})
      .expect(201)

      const {body: newUser} = await supertest(app)
      .put(`/users/${user1.email}`)
      .send({username: 'Dodge', email: 'user_1'})
      .expect(200)
      newUser.channels.length.should.match(1)
    })
    
    it('update user channels', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'user_1'})
      .expect(201)

      const {body: newUser} = await supertest(app)
      .put(`/users/${user1.email}`)
      .send({channels: [5000, 2200]})
      .expect(200)
      newUser.channels.should.match([5000,2200])
    })
  })
  describe( 'delete', () => {
    it('delete user', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'user_1'})
      .expect(201)
      await supertest(app)
      .delete(`/users/${user1.email}`)
      .expect(200)

      const {body: list} = await supertest(app)
      .get(`/users`)
      .expect(200)

      list.length.should.match(0)
    })
    it('delete all user channels when deleting a user : cascade ', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'user_1'})
      .expect(201)
      //Create channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({name: 'channel 1', owner: user1.email})
      .expect(201)

      await supertest(app)
      .delete(`/users/${user1.email}`)
      .expect(200)
      const {body: list} = await supertest(app)
      .get(`/channels`)
      .expect(200)
      
      list.length.should.match(0)
    })
    it('delete a user leads to the deletion of his appearances in other channels ', async () => {
      // Create a user
      const {body: user1} = await supertest(app)
      .post('/users')
      .send({username: 'user_1', email: 'user_1'})
      .expect(201)
      // Create a second user
      const {body: user2} = await supertest(app)
      .post('/users')
      .send({username: 'user_2', email: 'user_2'})
      .expect(201)
      //Create channel
      const {body: channel} = await supertest(app)
      .post('/channels')
      .send({name: 'channel 1', owner: user1.email})
      .expect(201)
      //Join channel with user 2
      await supertest(app)
      .put(`/channels/join/${channel.id}`)
      .send({email: user2.email})
      .expect(200)
      //Delete user 1
      await supertest(app)
      .delete(`/users/${user1.email}`)
      .expect(200)
      //Check if user2 channel list is null
      const {body: list} = await supertest(app)
      .get(`/users/channels/${user2.email}`)
      .expect(200)
      list.length.should.match(0)
    })
  })
})
