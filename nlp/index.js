const nlpApi = require('../dialogflow-api');
const _ = require('lodash')

module.exports = exports = {

    async parseMessage(userId, message){

        const {result} = await nlpApi.query({
            sessionId: userId,
            query: message
        });

        return {
            intent : _.get(result, 'metadata.intentName', 'not-found') ,
            entities : _.get(result, 'parameters', {}),
            suggestedResponse : _.get(result, 'fulfillment.speech', null),
            score : _.get(result, 'score', 0)
        }
    }

}