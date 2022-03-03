const ReplyModel = require('../models/reply.model');
const MessageModel = require('../models/message.model');
const log = require('../util/logger');

const updateTrainingData = async (name, message) => {
    try {
        const messageModel = await MessageModel.findOneAndUpdate({text: message}, {text: message}, {upsert: true, new: true}).lean();     
        const replyset = await ReplyModel.findOne({name});
        replyset.trainingData.messages.push(messageModel);
        await replyset.save();
        log.info(`Training data updated for name: ${name} and message: ${message}`);
    } catch (e) {
        log.error(`Couldn't update the training data for name: ${name} & message: ${message} Error:  ${e.message}`);
    }
}

const createNewReplyModel = async (name, message) => {
    try {
        const messageModel = await MessageModel.findOneAndUpdate({text: message}, {text: message}, {upsert: true, new: true}).lean();
        const replyModel = new ReplyModel({name, trainingData: [messageModel]});
        await replyModel.save();
        
        log.info(`New Reply Model created for name: "${name}" & message: "${message}"`);
    } catch (e) {
        log.error(`Could not create a new reply model with name: "${name}" for message: "${message}" Error: ${e.message}`);
    }
}

module.exports = { updateTrainingData, createNewReplyModel };