const mongoose = require('mongoose');
const log = require('./util/logger');
const ReplyModel = require('./models/reply.model');

const DB_URI = process.env.MONGO_DB_URI

const connect = async () => {
    try {
        await mongoose.connect(DB_URI);
        log.info('DB connected');
    } catch (e) {
        log.error('Could not connect to Database' + e.message);        
        process.exit(1);
    }
}

const disconnect = async () => {            
    await mongoose.disconnect();    
}

const getReply = async (name, message) => {
    if(!name || !message) return null;
    
    let replyModel = await ReplyModel.find({name});
    if(replyModel.length == 0) {                
        return null;
    } else {        
        const reply = replyModel[0]?.get('reply')?.get('text');        
        return reply;
    }
}

module.exports = { connect, disconnect, getReply };