import request from 'supertest';
import { app } from '../../../app';

it('fails when a user that does not exist try to login', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(401);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'aslkdfjalskdfj'
      })
      .expect(401);
  });

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201);
  
    const response = await request(app)
      .post('/api/users/signin')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(200);
  
    expect(response.get('Set-Cookie')).toBeDefined();
  });
  
