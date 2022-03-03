const {getHighestIntent} = require("../util/utils");
const checkIntents = require('./external.service');
const db = require('../db');
const log = require('../util/logger');
const writeService = require('./write.service');

const CONFIDENCE_THRESHOLD = process.env.CONFIDENCE_THRESHOLD || 0.5;
const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE || 'Sorry, I couldn\'t understand you. Could you please clarify your question?';

const processReply = async (req, res) => {

    const {botId, message} = req.query;
    let data;
    try {
        data = await checkIntents(botId, message);
    } catch(e) {
        log.error(`Error in the external API ${e.message}`);
        return res.status(500).json({message: 'Something broke. Please try back after sometime.'});
    }

    const intentsList = data.intents;

    const highestIntent = getHighestIntent(intentsList);    

    if(highestIntent?.confidence < CONFIDENCE_THRESHOLD) {
        reply_message = DEFAULT_MESSAGE;
        log.info(`Confidence: ${highestIntent.confidence} below threshold: ${CONFIDENCE_THRESHOLD}`);        
    } else {        
        const name = highestIntent.name;
        
        reply_message = await db.getReply(name, message);

        if(reply_message) {
            writeService.updateTrainingData(name, message);
        } else {
            reply_message = DEFAULT_MESSAGE;
            
            // if doesn't exist create a new reply set with the given name and add the message to the training data
            
            writeService.createNewReplyModel(name, message);
        }
        // This should be handled asynchronously to avoid adding latency to the read request.
        // This can probably be an event emitted to a queue which can be consumed by a separate write service
    }    

    const result = {
        reply: reply_message
    }

    res.send(result);
}

module.exports = processReply;