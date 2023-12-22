const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ["pong"],
    cooldown: 5000,
    ownerOnly: false,
    run: async (client, message, args) => {
      message.reply(`Pong !`)
    }
 };
