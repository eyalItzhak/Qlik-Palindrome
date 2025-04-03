import request from 'supertest';
import { app } from '../../../app';

it('clears the cookie after signing out', async () => {
    const res = await request(app)
        .post("/api/users/signup")
        .send({
            email: "test@test.com",
            password: "password",
        })
        .expect(201);
    const response = await request(app)
        .post('/api/users/logout')
        .send({}).expect(200);
    expect(response.get('Set-Cookie')![0]).toEqual("session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly");
    //we can know that the cookie is cleared by checking the value of the cookie to this value
    //that is the default value of the cookie when it is cleared
});
