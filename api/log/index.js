const pino = require('pino')({
    name : 'chatbot',
    level : 'info',
});

module.exports = exports = {
    error : (...args) => pino.error(...args),
    info: (...args) => pino.info(...args)
}