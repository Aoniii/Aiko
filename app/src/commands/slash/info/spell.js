const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const similarity = require('../../../similarity.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spell")
		.setDescription("Devine le sort !"),
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

		const champ = data[random].name;
		const l = ["P", "Q", "W", "E", "R"];
		const img = [data[random].imgp, data[random].imgq, data[random].imgw, data[random].imge, data[random].imgr];

		const random2 = 0 + Math.floor(4 * Math.random());
		const name = l[random2] + " - " + champ;

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Quel est ce sort ?")
			.setDescription("Exemple de reponse: Q - Aatrox")
			.setImage(img[random2])

		interaction.reply({ embeds: [embed] });

		const filter = (m) => m.author.id !== client.user.id;
		const collector = client.channels.cache.get(interaction.channelId).createMessageCollector({ filter, time: 30000 });

		collector.on("collect", (collected) => {
			if (similarity(collected.content, name, true) >= 0.8) {
				interaction.followUp("Bravo ! Vous avez deviné que c'est le " + (l[random2] == 'P' ? "Passif" : l[random2]) + " de " + champ + " !");
				collector.stop();
			}
		});

		collector.on("end", (collected, reason) => {
			if (reason === "time") {
				interaction.followUp("Le temps pour deviner est écoulé. La réponse correcte était le " + (l[random2] == 'P' ? "Passif" : l[random2]) + " de " + champ + " !");
			}
		});
	}
};
