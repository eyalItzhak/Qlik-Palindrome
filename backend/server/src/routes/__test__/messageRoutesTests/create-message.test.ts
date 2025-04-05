import request from "supertest";
import { app } from "../../../app";


it("shold not create msg if user not sing in", async () => {
    await request(app).post("/api/messages/postMessage").send({
        messageContent: "test message 1"
    }).expect(401)
})

it("shold not create msg if user not provide messageContent", async () => {
    const cookie = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", cookie).send({
        messageContent: ""
    }).expect(400)
})

it("shold create msg for user", async () => {
    const user_1 = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 1"
    }).expect(201)
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(404)
    expect(foundMessage.body.totalItems).toBeGreaterThan(0)
})

it("shold detect this not a Palindrome", async () => {
    const user_1 = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 1"
    }).expect(201)
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    expect(foundMessage.body.data[0].isPalindrome).toBe(false)

})

it("shold detect this is a Palindrome", async () => {
    const user_1 = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "abbbcccbbba"
    }).expect(201)
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    expect(foundMessage.body.data[0].isPalindrome).toBe(true)
})


