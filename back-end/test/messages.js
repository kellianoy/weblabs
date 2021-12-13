const supertest = require("supertest");
const microtime = require("microtime");
const app = require("../lib/app");
const db = require("../lib/db");

describe("messages", () => {
  beforeEach(async () => {
    await db.admin.clear();
  });

  it("list empty", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200);
    messages.should.eql([]);
  });

  it("list one message", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    // and a message inside it
    await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE" });
    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200);
    messages.should.match([
      {
        author: user1.email,
        content: "Hello ECE",
        channelId: channel.id,
        creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
      },
    ]);
  });

  it("add one element", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    // Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE" })
      .expect(201);
    message.should.match({
      author: user1.email,
      content: "Hello ECE",
      channelId: channel.id,
      creation: (it) => it.should.be.approximately(microtime.now(), 1000000),
    });
    // Check it was correctly inserted
    const { body: messages } = await supertest(app).get(
      `/channels/${channel.id}/messages`
    );
    messages.length.should.eql(1);
  });

  it("get one element", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    // Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE" })
      .expect(201);

    const { body: get } = await supertest(app)
      .get(`/channels/${channel.id}/messages/${message.creation}`)
      .expect(200);

    get.should.match({
      author: user1.email,
      content: "Hello ECE",
    });
  });

  it("update one element", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    //Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE" })
      .expect(201);

    //Update message
    const { body: update } = await supertest(app)
      .put(`/channels/${channel.id}/messages/${message.creation}`)
      .send({ content: "Hacking ECE in progress..." })
      .expect(200);

    update.should.match({
      author: user1.email,
      content: "Hacking ECE in progress...",
    });
  });

  it("delete one element", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    //Create a message inside it
    const { body: message } = await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE" })
      .expect(201);

    //Delete message
    await supertest(app)
      .delete(`/channels/${channel.id}/messages/${message.creation}`)
      .expect(200);

    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200);
    messages.should.eql([]);
  });

  it("delete all elements", async () => {
    // Create a user
    const { body: user1 } = await supertest(app)
      .post("/users")
      .send({ username: "user_1", email: "user_1" });
    //Create channel
    const { body: channel } = await supertest(app)
      .post("/channels")
      .send({ name: "channel 1", owner: user1.email })
      .expect(201);
    //Create a message inside it
    await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE" })
      .expect(201);

    //Create a second message inside it
    await supertest(app)
      .post(`/channels/${channel.id}/messages`)
      .send({ author: user1.email, content: "Hello ECE 2" })
      .expect(201);

    //Delete messages
    await supertest(app)
      .delete(`/channels/${channel.id}/messages/`)
      .expect(200);

    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/${channel.id}/messages`)
      .expect(200);
    messages.should.eql([]);
  });

  it("access invalid channel", async () => {
    // Get messages
    const { body: messages } = await supertest(app)
      .get(`/channels/1234/messages`)
      .expect(404);
  });
});
