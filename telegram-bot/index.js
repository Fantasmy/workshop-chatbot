const TelegramBot = require('node-telegram-bot-api');
const config = require('../config');
const apiKey = config.telegram.apiKey;
const bot = new TelegramBot(apiKey, {polling: true});
const log = require('../log');
const nlp = require('../nlp');
const _ = require('lodash')

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

        const nlpResponse = await nlp.parseMessage(user.id, userMessage)

        console.log(nlpResponse)

       if(_.get(nlpResponse, 'intent', 'default fallback intent').toLowerCase() === 'default fallback intent'){
            bot.sendMessage(user.id,nlpResponse.suggestedResponse)
       }

        log.info(`Message received from user ${user.id} with text : ${userMessage}`);

    }catch(error){
        log.error(error);
    }
}
