import request from "supertest";
import { app } from "../../../app";

it("shold delete msg", async () => {
    const user_1 = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 1"
    }).expect(201)
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    expect(foundMessage.body.totalItems).toBeGreaterThan(0)
    await request(app).delete(`/api/messages/deleteMessage`).set("Cookie", user_1).send({ id: foundMessage.body.data[0].id }).expect(200)
    const afterDelete = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    expect(afterDelete.body.totalItems).toEqual(0)
})

it("shold not delete msg of anther user", async () => {
    const user_1 = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 1"
    }).expect(201)
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    const result = await request(app)
        .post("/api/users/signup")
        .send({ email: "someAntherUserMail@mail.com", password: "someMail" })
        .expect(201);
    const user_2 = result.get("Set-Cookie") || [];
    await request(app).delete(`/api/messages/deleteMessage`).set("Cookie", user_2).send({ id: foundMessage.body.data[0].id }).expect(404)
})