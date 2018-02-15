const app = require('express')();
const config = require('../config');
const log = require('./log')

app.use('/', async(req,res) => {
    res.send('Hello world')
})

app.listen(config.server.port, () => log.info(`Api listening on port ${config.server.port}`));
