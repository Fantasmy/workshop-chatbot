const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const apiKey = config.telegram.apiKey;
const bot = new TelegramBot(apiKey, {polling: true});
const log = require('../log');
const nlp = require('../nlp');
const _ = require('lodash');

module.exports = exports = {
	
	start() {
		if (apiKey) {
			bot.onText(/(.+)/, handleMessage);
			log.info('Telegram bot started');
		} else {
			log.error('Unable to start Telegram Bot without apiKey');
		}
	}
	
};

async function handleMessage(event) {
	try {
		const {text: message, from: user} = event;
		
		log.info(`Message received from user ${user.id} with text "${message}"`);
		
		const {intent, confidenceScore, suggestedResponse} = await nlp.parseMessage(user.id, message);
		log.info(`The NLP has extract the intent "${intent}" from text "${message}"`);
		
		if (intent === 'default') {
			await bot.sendMessage(user.id, `You said "${message}", we couldn't conclude your intent, so we're gonna answer "${suggestedResponse}".`);
		} else {
			await bot.sendMessage(user.id, `You said "${message}", we concluded that your intent is "${intent}" with ${toPercentage(confidenceScore)} confidence.`);
		}
		
	} catch (error) {
		log.error(error);
	}
}

function toPercentage(value) {
	return `${(value * 100).toFixed(0)}%`
}
