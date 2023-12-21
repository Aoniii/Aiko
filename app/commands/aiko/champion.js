module.exports = {
	name: 'champion',
	aliases: ['ch'],
	utilisation: '{prefix}champion',
  
	execute(client, message, args) {
		import('node-fetch').then(({ default: fetch }) => {
			fetch('http://163.5.143.36/:3000/data', { method: 'GET' })
				.then(response => response.json())
				.then(data => {
					message.channel.send(JSON.stringify(data));
				})
				.catch(error => console.error(`Erreur: ${error}`));
		}).catch((error) => {
			console.error('Erreur lors de l\'import de node-fetch :', error);
		});
	},
};