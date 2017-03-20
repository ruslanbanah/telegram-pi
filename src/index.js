const TelegramBot = require('node-telegram-bot-api');
const gpio = require('rpi-gpio');
const config = require('config.json')('./config.json');

const bot = new TelegramBot(config.token, {polling: true});

var commands = (msg) => {
  if (msg.entities) {
    return msg.entities.map((ent) => {
      return msg.text.slice(ent.offset, ent.offset + ent.length)
    })
  }
  return [msg.text]
}

bot.on('message', (msg) => {
  let cmd = commands(msg);
  console.log('Your commands : ', cmd)
  bot.sendMessage(config.chatId, 'Your commands : ' + cmd.join(','));
});

// gpio.setup(7, gpio.DIR_IN, ()=>{
//   gpio.read(7, function(err, value) {
//       bot.sendMessage(config.chatId, 'Двері: ' + value);
//   });
// });
