import request from 'supertest';

import app from '../../app';
import { Todos } from './todos.model';

beforeAll(async () => {
  try {
    await Todos.drop();
  } catch (err) {}
});

// get all the todos present in the system
describe('GET /api/v1/todos', () => {
  it('responds with a json message', async () => {
    request(app)
      .get('/api/v1/todos')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('length');
        expect(response.body.length).toBe(0);
        // expect(response.body[0]).toHaveProperty('content');
        // expect(response.body[0]).toHaveProperty('done');
      })
  });
});

// for creating a todo
let id = '';
describe('POST /api/v1/todos/', () => {
  it('responds with an error when invalid body is sent', async () => {
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: ''
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toHaveProperty('messsage');
      })
  });

  it('responds with an 200 when valid body is sent', async () => {
    request(app)
      .post('/api/v1/todos')
      .set('Accept', 'application/json')
      .send({
        content: 'Learn Ts',
        done: false
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        id = response.body.insertedId
        expect(response.body).toHaveProperty('insertedId');
      })
  });
});

// get one todos with id
describe('GET /api/v1/todos/:id', () => {
  it('get an todo by the id sent to it', async () => {
    request(app)
      .get(`/api/v1/todos/${id}`)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        console.log(response.body);
        expect(response.body).toHaveProperty('_id');
        expect(response.body).toHaveProperty('content');
        expect(response.body).toHaveProperty('done');
      })
  });
});
