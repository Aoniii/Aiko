const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

function similarity(s1, s2) {
	s1 = swap(s1.toLowerCase());
	s2 = swap(s2.toLowerCase());

	if (s1[0] != s2[0])
		return (0);

	var longer = s1;
	var shorter = s2;

	if (s1.length < s2.length) {
		longer = s2;
		shorter = s1;
	}

	var longerLength = longer.length;

	if (longerLength == 0)
		return (1.0);

	return (longerLength - distance(longer, shorter)) / parseFloat(longerLength);
}

function swap(s) {
	tab = ["eéèêë", "yÿ", "uûü", "iîï", "oôö", "aàâä", "cç", " '"];

	s = s.replace("passif", "p");
	if (s[0] == 'a')
		s = s.replace("a", "q");
	else if (s[0] == 'z')
		s = s.replace("z", "w");

	for (a = 0; a < tab.length; a++)
		for (b = 1; b < tab[a].length; b++)
			s = s.replaceAll(tab[a][b], tab[a][0]);

	return (s);
}

function distance(s1, s2) {
	var costs = new Array();

	for (var i = 0; i <= s1.length; i++) {
		var lastValue = i;

		for (var j = 0; j <= s2.length; j++) {
			if (i == 0)
				costs[j] = j;
			else {
				if (j > 0) {
					var newValue = costs[j - 1];
					if (s1.charAt(i - 1) != s2.charAt(j - 1))
						newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
					costs[j - 1] = lastValue;
					lastValue = newValue;
				}
			}
		}
		if (i > 0)
			costs[s2.length] = lastValue;
	}
	return costs[s2.length];
}

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
			if (similarity(collected.content, name) >= 0.8) {
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
