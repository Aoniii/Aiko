module.exports = {
    name: 'ping',
    aliases: [],
    utilisation: '{prefix}ping',

    execute(client, message, args) {
		message.channel.send('Pong!');
    },
};