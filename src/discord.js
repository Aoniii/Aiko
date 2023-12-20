const { Client } = require('discord.js');
const client = new Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.content === '!ping') {
    message.reply('Pong!');
  }
});

client.login('MTE4NzA0MDIyMzMyMjk4MDM5Mw.GXLYAB.XCKtty7lS-OTJ8Xbt9bgB3mWbFjJ4nzFPd-c1Y');