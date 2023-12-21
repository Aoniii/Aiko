module.exports = {
    name: 'champion',
    aliases: ['ch'],
    utilisation: '{prefix}champion',

    execute(client, message, args) {
		fetch('http://localhost:3000/data')
			.then(response => response.json())
			.then(data => {
				message.channel.send(JSON.stringify(data));
  			})
			.catch(error => console.error('Erreur:', error));
    },
};