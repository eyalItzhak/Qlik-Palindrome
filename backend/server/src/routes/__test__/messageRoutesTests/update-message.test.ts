import request from "supertest";
import { app } from "../../../app";

it("should not update msg", async () => {
    const user_1 = await global.signin();
    await request(app).post("/api/messages/postMessage").set("Cookie", user_1).send({
        messageContent: "test message 1"
    }).expect(201)
    const foundMessage = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    const content_1 = foundMessage.body.data[0].content
    await request(app).patch(`/api/messages/updateMessage`).set("Cookie", user_1).send({ id: foundMessage.body.data[0].id, content: "test message 2" }).expect(200)
    const resultAfterUpdate = await request(app).get(`/api/messages/getMyMessage`).set("Cookie", user_1).send().expect(200)
    const content_2 = resultAfterUpdate.body.data[0].content
    expect(content_1).not.toEqual(content_2)
})  

