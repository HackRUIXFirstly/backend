var winston = require('winston');
require('winston-papertrail').Papertrail;

var logger = new winston.Logger({
    transports:[
        new winston.transports.Papertrail({
            host: process.env.PAPERTRAIL_URL,
            port: process.env.PAPERTRAIL_PORT
        }),
        new winston.transports.Console()
    ]
});

module.exports = logger;
