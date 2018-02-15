const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const apiKey = config.telegram.apiKey;
const bot = new TelegramBot(apiKey, {polling: true});
const log = require('../log');
const nlp = require('../nlp');

module.exports = exports = {

    start(){
        if(apiKey){
            bot.onText(/(.+)/, handleMessage)
            log.info('Telegram bot started')
        }else{
            log.error('Unable to start Telegram Bot without apiKey')
        }
    }

}
async function handleMessage(event) {
    try{
        const {text: userMessage, from : user, chat} = event;
        const userName = user.first_name || 'unkown person';

        bot.sendMessage(chat.id, `Hello there ${userName}, you just said "${userMessage}"`);

        log.info(`Message received from user ${user.id} with text : ${userMessage}`);

    }catch(error){
        log.error(error);
    }
}
