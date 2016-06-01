//===
//SLACK dummy bot for botkit
//===

//test environment
if (!process.env.SLACK_TOKEN) {
    console.log('Error: Specify SLACK_TOKEN in environment');
    process.exit(1);
}

//get BotKit to spawn bot
var Botkit = require('botkit');
var controller = Botkit.slackbot({
 debug: false
});
var bot = controller.spawn({
  token: process.env.SLACK_TOKEN
});

// start Slack RTM
bot.startRTM(function(err,bot,payload) {
  // handle errors...
});

//prepare the webhook
controller.setupWebserver(process.env.PORT || 3001, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        // handle errors...
    });
});

//===
//bot commands
//===

controller.hears(['hello','hi'],['direct_message','direct_mention','mention'],function(bot,message) {
    bot.reply(message,"Hello.");
});


controller.on('slash_command',function(bot,message) {
  // reply to slash command
  bot.replyPublic(message,'Everyone can see the results of this slash command');
});
