const config = require('../config');
const pino = require('pino')({
	name: 'chatbot',
	level: 'info',
	prettyPrint: !config.isProduction
});

module.exports = exports = {
	error: (...args) => pino.error(...args),
	info: (...args) => pino.info(...args)
};