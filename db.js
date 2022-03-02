const mongoose = require('mongoose');
const log = require('./util/logger');
const ReplyModel = require('./models/reply.model');
const writeService = require('./services/writeService');

const DB_URI = process.env.MONGO_DB_URI
const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE || 'Sorry, I couldn\'t understand you. Could you please clarify your question?';

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
    if(!name || !message) return ''; 

    // find the model for replyData
    let replyModel = await ReplyModel.find({name});
    if(replyModel.length == 0) {
        // if doesn't exist create a new reply set with the given name and add the message to the training data
        replyModel = writeService.createNewReplyModel(name, message);
        log.info('Default message sent');
        return DEFAULT_MESSAGE;
    } else {        
        const reply = replyModel[0]?.get('reply')?.get('text') || DEFAULT_MESSAGE;
        console.log(reply);
        return reply;
    }
}

module.exports = { connect, disconnect, getReply };