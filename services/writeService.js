const ReplyModel = require('../models/reply.model');
const MessageModel = require('../models/message.model');
const log = require('../util/logger');

const updateTrainingData = async (replyModelId, message) => {
    const model = ReplyModel.findById(replyModelId);
    if(!model) {
        console.error(`Couldn't find the reply model with id: ${replyModelId}`);
        return;
    }
    const messageModel = await MessageModel.findOneAndUpdate({text: message}, {}, {upsert: true});

    model.trainingData.push(messageModel);

    await model.save();
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