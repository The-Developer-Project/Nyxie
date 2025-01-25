const { SlashCommandBuilder, EmbedBuilder, MessageFlags} = require('discord.js');
const {createVerification} = require('../../DBWrapper.js');
const {verificationPlaceId} = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('verify')
		.setDescription('Use this command to verify your roblox account!'),
	async execute(interaction) {
        var code = createVerification(interaction.member.id);
        const exampleEmbed = new EmbedBuilder()
        .setColor(0xF1C40F)
        .setTitle(`Click To Join`)
        .setURL(`https://www.roblox.com/games/start?placeId=${verificationPlaceId}&launchData=${code}`)
        .setDescription("Join the experience to verify")
        .setTimestamp()
        await interaction.reply({ embeds: [exampleEmbed], flags: MessageFlags.Ephemeral });
	},
};