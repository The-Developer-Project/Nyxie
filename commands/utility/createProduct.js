const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, MessageFlags } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('new-product')
		.setDescription('Use this command to post a new product to our store!'),
	async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('np')
        .setTitle('Add a Product');

        const title = new TextInputBuilder()
        .setCustomId('ti')
        .setLabel("Enter a title")
        .setStyle(TextInputStyle.Short);

        const description = new TextInputBuilder()
        .setCustomId('de')
        .setLabel("Describe product and expected sale price")
        .setStyle(TextInputStyle.Paragraph);

        const type = new TextInputBuilder()
        .setCustomId('ty')
        .setLabel("Enter product type (Model, Plugin...)")
        .setStyle(TextInputStyle.Short);

        const tags = new TextInputBuilder()
        .setCustomId('tg')
        .setLabel("Enter relevant tags")
        .setStyle(TextInputStyle.Short);

        const image = new TextInputBuilder()
        .setCustomId('im')
        .setLabel("Enter id of display IMAGE asset (NOT DECAL)")
        .setStyle(TextInputStyle.Short);

        const a = new ActionRowBuilder().addComponents(title);
        const b = new ActionRowBuilder().addComponents(description);
        const c = new ActionRowBuilder().addComponents(type);
        const d = new ActionRowBuilder().addComponents(tags);
        const e = new ActionRowBuilder().addComponents(image);
        modal.addComponents(a, b, c, d, e);

        await interaction.showModal(modal);
	},
};