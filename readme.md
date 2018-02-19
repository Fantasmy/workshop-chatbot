# Chatbot workshop

## Run solution
- Clone this repo : `git clone https://github.com/SegersIan/workshop-chatbot.git`
- Navigate into the repo : `cd workshop-chatbot`
- Install dependencies : `npm install`
- Run
  - Start : `npm start`
  - Start with filewatch : `npm run watch`

## Set up
- Telegram
  - Install Telegram on Mobile/Desktop
  - Open this url `https://telegram.me/botfather` from the device which has Telegram installed
  - Follow the instructions to create a new bot
  - At the end you will receive a `API token`
- Dialogflow (NLP)
 - Go to the website [https://dialogflow.com/](https://dialogflow.com/)
 - Sign up (its free)
 - Create a new `agent`.
 - Click the `gear` icon right of your `agent` name.
 - Search for the `Client access token`

## Examples
 - Example 1 : Hello world `git checkout telegram_hello_world`
  - Run the app with `TELEGRAM_API_KEY=<your-telegram-key> NPM START`
 - Example 2 : Using NLP `git checkout telegram_nlp`
   - Run the app with 

     ```TELEGRAM_API_KEY=<your-telegram-key> DIALOGFLOW_API_KEY=<your-dialogflow-key> NPM START```
     
 - Example Music chat bot : [Check out this repo](https://github.com/SegersIan/poc-music-chatbot)