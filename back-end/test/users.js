
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
