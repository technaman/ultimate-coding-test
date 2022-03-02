const {getHighestIntent} = require("../util/utils");
const checkIntents = require('./external');
const db = require('../db');

const CONFIDENCE_THRESHOLD = process.env.CONFIDENCE_THRESHOLD || 0.5;
const DEFAULT_MESSAGE = process.env.DEFAULT_MESSAGE || 'Sorry, I couldn\'t understand you. Could you please clarify your question?';

const processReply = async (req, res) => {

    const {botId, message} = req.query;

    const data = await checkIntents(botId, message);

    const intentsList = data.intents;

    const highestIntent = getHighestIntent(intentsList);    

    if(highestIntent.confidence < CONFIDENCE_THRESHOLD) {
        reply_message = DEFAULT_MESSAGE;
        log.info(`Confidence: ${highestIntent.confidence} below threshold: ${CONFIDENCE_THRESHOLD}`);
        // No updates in DB
    } else {        
        const name = highestIntent.name;
        // Get the reply from DB
        reply_message = await db.getReply(name, message);
    }    

    const result = {
        reply: reply_message
    }

    res.send(result);
}

module.exports = processReply;