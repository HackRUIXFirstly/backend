var winston = require('winston');

var Papertrail = require('winston-papertrail').Papertrail;

winston.add(
    new Papertrail({
        host: process.env.PAPERTRAIL_URL,
        port: provess.env.PAPERTRAIL_PORT,
        level: 'error'
    })
);

module.exports = winston;
