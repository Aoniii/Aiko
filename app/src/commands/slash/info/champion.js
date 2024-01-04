const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const similarity = require('../../../similarity.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("champion")
		.setDescription("Devine le champion !"),
		cooldown: 5000,
		ownerOnly: false,
	run: async (client, interaction) => {
		data = await fetch(`http://${process.env.HOST}:3000/data`)
		.then(response => response.json())
		.then(data => {
			return data;
		})
		.catch(error => {
			console.error(error);
		});

		max = 0;
		while (data[max] != undefined)
			max++;
		max--;

		const random = 0 + Math.floor((max - 1) * Math.random());

		const name = data[random].name;

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Qui est ce champion ?")
			.setImage(data[random].img)

		interaction.reply({ embeds: [embed] });

		const filter = (m) => m.author.id !== client.user.id;
		const collector = client.channels.cache.get(interaction.channelId).createMessageCollector({ filter, time: 15000 });

		collector.on("collect", (collected) => {
			if (similarity(collected.content, name, false) >= 0.8) {
				interaction.followUp(`Bravo ! Vous avez deviné que c'est ${name} !`);
				collector.stop();
			}
		});

		collector.on("end", (collected, reason) => {
			if (reason === "time") {
				interaction.followUp("Le temps pour deviner est écoulé. La réponse correcte était " + name);
			}
		});
	}
};
