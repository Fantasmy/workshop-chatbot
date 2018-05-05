module.exports = exports = {
    isProduction : process.env.NODE_ENV === 'production',
    server : {
        port : process.env.PORT || 3000
    },
    telegram : {
        apiKey : process.env.TELEGRAM_API_KEY
    },
    dialogFlow : {
        apiKey : process.env.DIALOGFLOW_API_KEY
    }
};