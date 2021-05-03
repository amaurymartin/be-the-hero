const request = require('supertest');

const connection = require('../../../db/connection');
const app = require('../../../src/app');

describe('Organizations', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => { await connection.destroy(); });

  it('should create a new organization', async () => {
    const response = await request(app)
      .post('/organizations')
      .send({
        name: 'Test Organization',
        nickname: 'TestOrg',
        email: 'test@example.com',
        password: 'password',
        whatsapp: '85987654321',
        city: 'Gotham',
        state: 'Winterfell',
        country: 'Westeros',
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toHaveProperty('key');
    expect(response.body.key).toHaveLength(36);
  });
});
