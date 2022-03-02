const request = require('supertest');
require('dotenv').config();
const db = require('./db');
const makeApp = require('./app');

const app = makeApp(db);

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();    
});

const BOT_ID = '5f74865056d7bb000fcd39ff';

describe('basic sanity checks', () => {
    test('Returns a 400 for bad request', async () => {
        await request(app)
                .get('/')
                .query({botId: BOT_ID})
                .expect(400)
    })
})
