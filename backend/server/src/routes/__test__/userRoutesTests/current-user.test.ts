import request from "supertest";
import { app } from "../../../app";

it("responds with details about the current user", async () => {
  const user_1 = await global.signin();

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", user_1) //headers
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("responds with null if not authenticated", async () => {
  const response = await request(app)
    .get("/api/users/currentuser")
    .send()
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
});
