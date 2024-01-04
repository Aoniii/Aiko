const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const similarity = require('../../../similarity.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("spellname")
		.setDescription("Devine le nom du sort !"),
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

		const img = [data[random].imgp, data[random].imgq, data[random].imgw, data[random].imge, data[random].imgr];
		const name = [data[random].namep, data[random].nameq, data[random].namew, data[random].namee, data[random].namer];

		const random2 = 0 + Math.floor(4 * Math.random());

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Quel est le nom de ce sort ?")
			.setImage(img[random2])

		interaction.reply({ embeds: [embed] });

		const filter = (m) => m.author.id !== client.user.id;
		const collector = client.channels.cache.get(interaction.channelId).createMessageCollector({ filter, time: 30000 });

		collector.on("collect", (collected) => {
			if (similarity(collected.content, name[random2], false) >= 0.8) {
				interaction.followUp("Bravo ! Vous avez deviné que c'est " + name[random2] + " !");
				collector.stop();
			}
		});

		collector.on("end", (collected, reason) => {
			if (reason === "time") {
				interaction.followUp("Le temps pour deviner est écoulé. La réponse correcte était " + name[random2] + " !");
			}
		});
	}
};
