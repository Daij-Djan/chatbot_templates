#SIMPLE facebook or slack bot using node.js + botkit + heroku

Today I wanted to set up a facebook bot and a slack bot. botkit appealed to me because it provides a more or less generic wrapper around each vendor's specific api. :)

This seemed a good idea, and I think it still is, because botkit rather nicely abstracts the grunt-work away. You can also easily use it with wit.ai and deploying it on heroku is also a breeze.

The only 'downside' to BotKit is its documentation IMHO. Don't get me wrong ! https://howdy.ai provides lot of detailed documentation, a lot of samples. There is also an active community.<br/>
But for me a really short **getting started guide** would have been good. 

##Intro 
So Ill provide my simple 'hello world'-style chatbots for slack and facebook, summarizing what I 'learned' today :) 

Ill provide two simple checklists of how to get each bot up and running. Both guides are 90% equal but Ill not merge the lists to keep it simple!

*This guide does not aim to replace any of the detailed documentation available at https://howdy.ai*

- **[Chatbot for Facebook](#fb)**
- **[Chatbot for Slack](#slack)**

##Chatbot for Facebook<a name="fb"></a>

###BEFORE 
Before we begin to develop our bot. we need to make sure we have all required dependencies

1. we need to make sure we got `node`, `npm`, `git` and `heroku` installed. I wont detail setting this up. www.heroku.com's getting started guide details this quite nicely :)

###DEVELOP
Now set up the bot

1. download this repo and copy the folder 'chatbot_for_facebook' -- this folder will be the starting point for your new repository!

2. change into the new folder (`$ cd chatbot_for_facebook`)

3. run `$ git init` to make the repository valid. I assume this output:

        Untracked files:
        (use "git add <file>..." to include in what will be committed)
        
	        .gitignore
	        Procfile
	        bot.js
	        package.json

4. run `$ npm install` to fetch the packages. (This is only required so you can locally run your bot before pushing it to heroku. I added the resulting nodes_modules folder to the .gitignore file. **you don't want to publish the dependencies!**)

5. run `$ heroku create` to create a new heroku app and connect it with your repo. write down the output so you know the hostname! E.g.:

		Creating app... done, ⬢ polar-earth-39642
		https://polar-earth-39642.herokuapp.com/ | https://git.heroku.com/polar-earth-39642.git
		
	In this case the URL that botkit will setup for your bot is:

		https://polar-earth-39642.herokuapp.com/facebook/receive/

6. Visit Facebook in your browser to connect your bot with the platform.

	You will need your own app, your own page and then get a page access token, provide a verify token and setup a incoming webhook. (the url for you bot)<br/>
The whole process is explained nicley on the fb developer help websites.


	Follow the process: https://developers.facebook.com/docs/messenger-platform/implementation

	All you need is `the "setup" section and I wont go into too much detail but in the end you should have a long cryptic token and a human readable verify token. You should also have had to enter the URL you got. **The process is straight forward BUT not really that intuitive, so pay attention to the docs**

7. now create a `.env` file (`$ touch .env`) so you have a local config where you can store your PAGE_TOKEN and VERIFY_TOKEN. (**I added this file to the .gitignore file. you don't want to publish your token!**)

	sample environment:
		
        PAGE_TOKEN=ASDASDHE64BAITtHJkD2ZB0zTYZAHkRC7OpvAqJdzAxGQgfdoQtz40APfTuKxXbusiRviqUfMAzSanlXjUu4ZACzam06lTtZAHa754OjkjXxKAu8C2yhDt4jTN08zD5SJZANg4uT59zjvQP1ZBS11mZChU4Gqnhl9ZAembIW3xdZAgZDZD
        VERIFY_TOKEN=my_personal_secret

8. As a test of the configuration so far, execute `heroku local` (stop with ctrl+c). You should get:

        [OKAY] Loaded ENV .env File as KEY=VALUE Format
        12:55:49 AM web.1 |  info: ** No persistent storage method specified! Data may be lost when process shuts down.
        12:55:49 AM web.1 |  info: ** Starting webserver on port 5000
        12:55:49 AM web.1 |  info: ** Serving webhook endpoints for Slash commands and outgoing webhooks at: http://MY_HOST:5000/facebook/receive

9. the .env file is NOT used by heroku (they don't want you to commit it either ;)) so we have to set our 2 configuration variables separately by running 2 commands

		$ heroku config:set PAGE_TOKEN=ASDASDHE64BAITtHJkD2ZB0zTYZAHkRC7OpvAqJdzAxGQgfdoQtz40APfTuKxXbusiRviqUfMAzSanlXjUu4ZACzam06lTtZAHa754OjkjXxKAu8C2yhDt4jTN08zD5SJZANg4uT59zjvQP1ZBS11mZChU4Gqnhl9ZAembIW3xdZAgZDZD
		$ heroku config:set VERIFY_TOKEN=my_personal_secret
		
10. if the bot has no more issues, it is time to deploy all for the first time

		$ git add .
		$ git commit -am "initial commit"
		$ git push heroku master
		
11. start the new web app we deployed to heroku with `heroku ps:scale web=1`

**DONE**

###AFTERWARDS
go to your facebook page for which the bot is configured (for me it is e.g. My-Wine-Test) and try messaging the bot. Send it a simple hello. it should answer you with hello :)

if the bot doesn't answer, it is most likely a configuration issue. Make sure your tokens are correct and the webhook URL is set correctly!

All further modifications can now be done by editing bot.js and pushing the changes to heroku :)
<br/>
<br/>
<br/>

##Chatbot for Slack<a name="slack"></a>

###BEFORE 
Before we begin to develop our bot. we need to make sure we have all required dependencies

1. we need to make sure we got `node`, `npm`, `git` and `heroku` installed. I wont detail setting this up. www.heroku.com's getting started guide details this quite nicely :)

###DEVELOP
Now set up the bot

1. download this repo and copy the folder 'chatbot_for_slack' -- this folder will be the starting point for your new repository!

2. change into the new folder (`$ cd chatbot_for_slack`)

3. run `$ git init` to make the repository valid

        Untracked files:
        (use "git add <file>..." to include in what will be committed)
        
	        .gitignore
	        Procfile
	        bot.js
	        package.json

4. run `$ npm install` to fetch the packages. (This is only required so you can locally run your bot before pushing it to heroku. I added the resulting nodes_modules folder to the .gitignore file. **you don't want to publish the dependencies!**)

5. run `$ heroku create` to create a new heroku app and connect it with your repo. write down the output so you know the hostname! E.g.:

		Creating app... done, ⬢ polar-earth-39642
		https://polar-earth-39642.herokuapp.com/ | https://git.heroku.com/polar-earth-39642.git
		
	In this case the URL that botkit will setup for your bot is:

		https://polar-earth-39642.herokuapp.com/slack/receive/

6. Visit Slack in your browser to connect your bot with the platform.

	For a pure bot, you don't need a webserver.  Slack's Real-Time-Messaging API doesn't work with http. Your bot connects to Slack and opens a connection by itself. You need to register it though so you get a TOKEN that authenticates the bot.
	 	
	Read more about the RTM here: https://api.slack.com/bot-users
	
	BUT slack also has these nice slash commands... e.g. /remind or /help or so and they are usually answered by a Bot. I decided I want to have that and so my template also handles a slash command!

	See this page how to set it up: https://api.slack.com/slash-commands

	I wont go into too much detail but in the end you should have a cryptic token. You should also have had to enter the URL you got. **The process is straight forward BUT not really that intuitive, so pay attention to the docs**
	
7. now create a `.env` file (`$ touch .env`) so you have a local config where you can store your SLACK_TOKEN. (**I added this file to the .gitignore file. you don't want to publish your token!**)

	sample environment:
		
        SLACK_TOKEN=N08zD5SJZANg4uT59zjvQP1ChU4Gqnhl9ZAembIW3xdZAgZDZD

8. As a test of the configuration so far, execute `heroku local` (stop with ctrl+c). You should get:

        [OKAY] Loaded ENV .env File as KEY=VALUE Format
        12:55:49 AM web.1 |  info: ** No persistent storage method specified! Data may be lost when process shuts down.
        12:55:49 AM web.1 |  info: ** Starting webserver on port 5000
        12:55:49 AM web.1 |  info: ** Serving webhook endpoints for Slash commands and outgoing webhooks at: http://MY_HOST:5000/slack/receive

9. the .env file is NOT used by heroku (they don't want you to commit it either ;)) so we have to set our configuration variable separately by running this command

		$ heroku config:set SLACK_TOKEN=N08zD5SJZANg4uT59zjvQP1ChU4Gqnhl9ZAembIW3xdZAgZDZD
				
10. if the bot has no more issues, it is time to deploy all for the first time

		$ git add .
		$ git commit -am "initial commit"
		$ git push heroku master
		
11. start the new web app we deployed to heroku with `heroku ps:scale web=1`

**DONE**

###AFTERWARDS
go to your slack team's chat for which the bot is configured (I invited the @testbot into our team's #general channel for example) and try messaging the bot. Send it a simple hello. it should answer you with hello :)<br/>
Also try the slash command and type /hello. The bot should say hello to everybody and send you a direct message!

if the bot doesn't answer, it is most likely a configuration issue. Make sure your token is correct and the webhook URL is set correctly!

All further modifications can now be done by editing bot.js and pushing the changes to heroku :)
