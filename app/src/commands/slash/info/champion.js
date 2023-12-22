const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

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

		const random = 1 + Math.floor(max * Math.random());

		const name = data[random].name;

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle("Qui est ce champion ?")
			.setImage(data[random].img)

		interaction.reply({ embeds: [embed] });

		const filter = (m) => m.author.id === interaction.user.id;
		const collector = interaction.channel.createMessageCollector({ filter, time: 15000 });

		collector.on("collect", (collected) => {
			if (collected.content.toLowerCase() === name.toLowerCase()) {
				interaction.followUp(`Bravo ! Vous avez deviné que c'est ${name} !`);
				collector.stop();
			} else {
				interaction.followUp(`Désolé, ce n'est pas correct !`);
			}
		});

		collector.on("end", (collected, reason) => {
			if (reason === "time") {
				interaction.followUp("Le temps pour deviner est écoulé. La réponse correcte était " + name);
			}
		});
	}
};
