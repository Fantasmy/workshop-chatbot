const nlpApi = require('../dialogflow-api');
const _ = require('lodash');

module.exports = exports = {
	
	async parseMessage(userId, message) {
		
		const {result} = await nlpApi.query({
			sessionId: userId,
			query: message
		});
		
		return {
			intent: mapIntentName(result),
			entities: _.get(result, 'parameters', {}),
			suggestedResponse: _.get(result, 'fulfillment.speech', null),
			confidenceScore: _.get(result, 'score', 0)
		}
	}
	
};

function mapIntentName(result) {
	const intent = _.get(result, 'metadata.intentName', '');
	if (!intent || intent.toLowerCase() === 'default fallback intent') {
		return 'default'
	} else {
		return intent
	}
}