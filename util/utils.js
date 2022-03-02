const log = require('./logger');

const logRequest = (req, res, next) => {
    log.info(`${req.path}: ${Date.now()}: botId: ${req.query.botId} message: ${req.query.message}`);
    next();
}

const validateRequest = (req, res, next) => {
    const {botId, message} = req.query;

    if(!botId || !message || !botId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.sendStatus(400);
    }

    next();
}

const getHighestIntent = (intentsList) => {
    return intentsList.reduce((a, b) => a.confidence > b.confidence ? a : b);
}

module.exports = {logRequest, validateRequest, getHighestIntent};