const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const apiKey = config.telegram.apiKey;
const bot = new TelegramBot(apiKey, {polling: true});
const log = require('../log');
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
		const {text: userMessage, from: user} = event;
		log.info(`Message received from user ${user.id} with text "${userMessage}"`);
		
		const response = `Hey ${getFullName(user)}, you said "${userMessage}"`;
		await bot.sendMessage(user.id, response);
		log.info(`Response sent to user ${user.id} with text "${response}"`);
		
	} catch (error) {
		log.error(error);
	}
}

function getFullName(user) {
	return `${_.get(user, 'first_name')} ${_.get(user, 'last_name')}`
}