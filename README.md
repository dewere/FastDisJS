# FastDisJS
Very fast Discord.JS command proccessor with anti-spam feature.

# Installation
Just add 'FastDisJS.js' to root of your bot directory and have fun.

# Usage
Very basic example:
```js
isSpamOrSentByBot = onMessage(messageReceivedInBotOnMessage, botPrefix, antiSpamCooldownInSeconds, commandCallback);
```

**Note:** since v1.1 every command will be returned lowercase.

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

To use multiple prefixes you can use arrays, for example:
```js
...
fd.onMessage(msg, ['!', '?'], ...
```

So, this example will handle "!help" and "?help".

# Showcase
Command:

![command usage](https://i.imgur.com/4jLd8qk.png)

Message:

![message](https://i.imgur.com/292rohI.png)

Nothing more yet, sorry.

# Contacts

Discord: V4#9495

Telegram: @ilyaruski
