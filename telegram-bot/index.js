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
		
		const {intent, confidenceScore, suggestedResponse, entities} = await nlp.parseMessage(user.id, message);
		log.info(`The NLP has extract the intent "${intent}" from text "${message}"`);
		
		if (intent === 'default') {
			await bot.sendMessage(user.id, `You said "${message}", we couldn't conclude your intent, so we're gonna answer "${suggestedResponse}".`);
		} else {
			await bot.sendMessage(user.id, `You said "${message}", being ${toPercentage(confidenceScore)} confident you intent to "${intent}" with entities "${mapEntitiesToText(entities)}" .`);
		}
		
	} catch (error) {
		log.error(error);
	}
}

function mapEntitiesToText(entities) {
	const values = Object.values(entities || {});
	
	if (values.length > 0) {
		return values.join(',');
	} else {
		return 'No-Entities';
	}
}

function toPercentage(value) {
	return `${(value * 100).toFixed(0)}%`
}

function getTrackSuggestion(genre) {
	const tracksPerGenre = {
		'techno': 'https://www.youtube.com/watch?v=Ptx3FLCnRig',
		'house': 'https://www.youtube.com/watch?v=EzsJEDAfnRI',
		'rock': 'https://www.youtube.com/watch?v=GhCXAiNz9Jo',
		'metal': 'https://youtu.be/B1zCN0YhW1s',
		'default': 'Sorry, no tracks yet for your genre!',
	};
	
	if (genre in tracksPerGenre) {
		return tracksPerGenre[genre];
	} else {
		return tracksPerGenre['default'];
	}
};