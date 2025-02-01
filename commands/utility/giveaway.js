const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, EmbedBuilder, MessageFlags, PermissionFlagsBits , ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType} = require('discord.js');
const {commonStaffRoleName} = require("../../config.json");

module.exports = {
	data: new SlashCommandBuilder()
        .setName('giveaway')
        .setDescription('Create new giveaway (Admin Only)')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
	async execute(interaction) {
        const modal = new ModalBuilder()
        .setCustomId('gi')
        .setTitle('Start giveaway');
        const duration = new TextInputBuilder()
        .setCustomId('du')
        .setLabel("Enter the giveaway duration")
        .setStyle(TextInputStyle.Paragraph)
        .setPlaceholder('m/h/d/w/m/y\nAdd a slash for every value before first value\nfor example, 6 hours + 6 days:/6/8');
        const title = new TextInputBuilder()
        .setCustomId('ti')
        .setLabel("Enter a title")
        .setStyle(TextInputStyle.Short);
        const description = new TextInputBuilder()
        .setCustomId('de')
        .setLabel("Enter description")
        .setStyle(TextInputStyle.Paragraph);
        const winners = new TextInputBuilder()
        .setCustomId('wi')
        .setLabel("Enter amount of winners")
        .setStyle(TextInputStyle.Paragraph);
        const picture = new TextInputBuilder()
        .setCustomId('pi')
        .setLabel("Enter url of picture (Optional)")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(false);

        const a = new ActionRowBuilder().addComponents(duration);
        const b = new ActionRowBuilder().addComponents(title);
        const c = new ActionRowBuilder().addComponents(description);
        const d = new ActionRowBuilder().addComponents(winners);
        const e = new ActionRowBuilder().addComponents(picture);
        modal.addComponents(a, b, c, d, e);

        await interaction.showModal(modal);
	},
};