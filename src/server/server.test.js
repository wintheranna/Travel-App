const request = require('supertest');
const app = require('./server');

describe('Testing the root path', () => {
    test('Should get root path', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});
