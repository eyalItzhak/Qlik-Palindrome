import request from "supertest";
import { app } from "../../../app";


it("return a 400 if user not provide password", async () => {
    const user_1 = await global.signin();
    await request(app)
        .delete("/api/users/deleteUser")
        .set("Cookie", user_1) //headers
        .send()
        .expect(400);

})

it("return a 401 if user not provide worng password", async () => {
    const user_1 = await global.signin();
    await request(app)
        .delete("/api/users/deleteUser")
        .set("Cookie", user_1) //headers
        .send({ password: "wrongpassword" })
        .expect(401);
})

it("return a 200 if user provide correct password", async () => {
    const user_1 = await global.signin();
    await request(app)
        .delete("/api/users/deleteUser")
        .set("Cookie", user_1) //headers
        .send({ password: "password" })
        .expect(200);
})

it("delete all msg and user", async () => {
    const user_1 = await global.signin();

    //create 3 messages
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 1"
    }).expect(201)

    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 2"
    }).expect(201)


    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 3"
    }).expect(201)

    //check if the messages are created
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    foundMessage.body.totalItems
    expect(foundMessage.body.totalItems).toBeGreaterThan(0)

    //delete user
    await request(app)
    .delete("/api/users/deleteUser")
    .set("Cookie", user_1) //headers
    .send({ password: "password" })
    .expect(200);

    //all messages that belong to the user should be deleted
    const not_foundMessage_ = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    expect(not_foundMessage_.body.totalItems).toEqual(0)
 
})