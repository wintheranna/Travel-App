const request = require('supertest');
const app = require('../../server/server');

describe('Testing the /save path', () => {
    test('Should get the /save path', async () => {
        const response = await request(app).post('/save');
        expect(response.statusCode).toBe(200);
    });
});
