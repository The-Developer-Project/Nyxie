const { SlashCommandBuilder, EmbedBuilder, MessageFlags} = require('discord.js');
const {qotdChannel, generalChannel, commonStaffRoleName, qotdPing} = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('qotd')
		.setDescription('Post QOTD (Admin only)')
        .addStringOption(option =>
            option.setName("quote")
                .setDescription('The quote to send')
                .setRequired(true)),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === commonStaffRoleName)) {
            option = interaction.options.getString("quote");
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xF1C40F)
                .setTitle(`✨ Question Of The Day ✨`)
                .setDescription(`${option}\n\n*answer in <#${generalChannel}>*`)
                .setTimestamp()
            await interaction.client.channels.cache.get(qotdChannel).send({ content: `<@&${qotdPing}>`, embeds: [exampleEmbed] });
            await interaction.reply({ content: 'Sent QOTD', flags: MessageFlags.Ephemeral });
        }
        else {
            await interaction.reply({ content: 'This command is for staff only!', flags: MessageFlags.Ephemeral });
        }
	},
};