const pino = require('pino')({
    name : 'chatbot',
    level : 'info',
});

module.exports = exports = {
    error (...args) {        
        pino.error(...args)
    },
    log (...args) {
        pino.log(...args)
    }
}