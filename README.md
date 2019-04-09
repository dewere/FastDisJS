Very fast Discord.JS command proccessor with anti-spam feature.

# Usage
Simple, just add 'FastDisJS.js' to root of your bot directory.
```js
const fd = require('./FastDisJS');
const discord = require('discord.js');

const bot = new discord.Client();
bot.login('token');

bot.on('message', msg => {
  let needProcess = fd.onMessage(msg, '!', 1, (_, command, args) => {
    msg.reply(`You sent a command: ${command} with arguments: ${args}`);
  });

  if (needProcess) {
    msg.reply('You sent simple message.');
  }
});
```

So, you can use it like:
```js
const fd = require('./FastDisJS');
const discord = require('discord.js');

const bot = new discord.Client();
bot.login('token');

function handleMsg(msg, command, args) {
  msg.reply(`You sent a command: ${command} with arguments: ${args}`);
}

bot.on('message', msg => {
  let needProcess = fd.onMessage(msg, '!', 1, handleMsg);

  if (needProcess) {
    msg.reply('You sent simple message.');
  }
});
```

# Showcase
(command usage)[https://i.imgur.com/4jLd8qk.png]
(message)[https://i.imgur.com/292rohI.png]
