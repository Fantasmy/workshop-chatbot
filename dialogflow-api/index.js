const config = require('../config');
const Api = require('apiai');

module.exports = {

	query({query, sessionId}) {

        if (!sessionId) throw new TypeError('No sessionId provided');

        const api = Api(config.dialogFlow.apiKey, {language: 'en'});

        return new Promise((resolve, reject) => {
            const request = api.textRequest(query, {
                sessionId
            });
            request.on('response', resolve);
            request.on('error', reject);
            request.end();
        });
    
    }

};