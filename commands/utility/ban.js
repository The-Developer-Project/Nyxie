const { SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionFlagsBits} = require('discord.js');
const {commonStaffRoleName, banAppealLink} = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('Select a member and ban them. (Admin Only)')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('The member to ban')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option.setName("reason")
                .setDescription('The reason for ban')
                .setRequired(true)),
	async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.name === commonStaffRoleName)) {
            reason = interaction.options.getString("reason");
            user = interaction.client.users.cache.get(interaction.options.getUser("target").id);
            
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xF1C40F)
                .setTitle(` User ${user.username} fate has been SEALED 😡`)
                .addFields(
					{ name: 'Reason', value: reason },
					{ name: 'Staff', value: `${interaction.member}` },
				)
                .setTimestamp()

                const exampleEmbed2 = new EmbedBuilder()
                .setColor(0xF1C40F)
                .setTitle(`You have been BANNED 😡`)
                .addFields(
					{ name: 'Reason', value: reason },
					{ name: 'Staff', value: `${interaction.member}` },
                    { name: 'Appeal', value: banAppealLink },
				)
                .setTimestamp()
            await user.send({ embeds: [exampleEmbed2] });
            await interaction.guild.bans.create(user.id, {reason})
            await interaction.reply({ embeds: [exampleEmbed] });
        }
        else {
            await interaction.reply({ content: 'This command is for staff only!', flags: MessageFlags.Ephemeral });
        }
	},
};