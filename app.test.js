const request = require('supertest');
require('dotenv').config();
const db = require('./db');
const app = require('./app');
const {getHighestIntent} = require('./util/utils');
require('dotenv').config();

global.console = {
    log: jest.fn(),
    error: jest.fn(),
    warn: console.warn,
    info: console.info,
    debug: console.debug,
};

beforeAll(async () => {
    await db.connect();
});

afterAll(async () => {
    await db.disconnect();    
});

const BOT_ID = '5f74865056d7bb000fcd39ff';

describe('basic sanity checks', () => {
    test('Returns a 400 for missing parameters', async () => {
        await request(app)
                .get('/')
                .query({botId: BOT_ID})
                .expect(400);

        await request(app)
                .get('/')
                .query({message: 'Hello'})
                .expect(400);
    });

    test('Returns a 400 for invalid parameters', async () => {
        await request(app)
                .get('/')
                .query({botId: 'invalidbotid', message: 'Hello'})
                .expect(400);

        await request(app)
                .get('/')
                .query({botId: BOT_ID, message: ''})
                .expect(400);

    });

    test('Returns a 200 for a valid request', async () => {
        const response = await request(app)
            .get('/')
            .query({botId: BOT_ID, message: 'HELLO'})
            .expect(200);        
    })    
});

describe('Verify correct reply response is sent', () => {
    test('Returns a correct greeting message from DB for hello', async () => {
        const reply = await db.getReply('Greeting', 'random test message');
        const body = {reply};
        const response = await request(app)
            .get('/')
            .query({botId: BOT_ID, message: 'HELLO'});

        expect(response.body).toMatchObject(body);
    });
});

describe('Testing Util methods', () => {

    test('Returns a valid number for highest intent', () => {    
        const intents = [{
            name: 'Third',
            confidence: 0.6
        },{
            name: 'Second',
            confidence: 0.7
        },{
            name: 'Fourth',
            confidence: 0.1
        },{
            name: 'First',
            confidence: 0.8
        }];

        const highestIntent = getHighestIntent(intents);        

        expect(highestIntent).toMatchObject({name: 'First', confidence: 0.8});
    });
});