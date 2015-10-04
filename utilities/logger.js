var winston = require('winston');
var winston_slack = require('winston-slack').Slack;

winston.add(winston_slack, {
    domain: process.env.SLACK_DOMAIN,
    apiToken: process.env.SLACK_API_TOKEN,
    channel: process.env.SLACK_CHANNEL,
    username: "ErrorBot",
    level: 'error',
    handleExceptions : true
});

module.exports = winston;
