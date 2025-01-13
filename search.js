const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cst')
		.setDescription('Creates ticket for hiring/getting hired'),
    async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('tk')
        .setTitle('Create a ticket');

        const select = new StringSelectMenuBuilder()
        .setCustomId('rs')
        .setPlaceholder('Select Developer Type')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Scripter')
                .setDescription('Writes scripts in Roblox!')
                .setValue('Scripter'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Builder')
                .setDescription('Puts parts together in Roblox')
                .setValue('Builder'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Modeler')
                .setDescription('Creates models in external software and imports them to Roblox')
                .setValue('Modeler'),
            new StringSelectMenuOptionBuilder()
                .setLabel('UI Designer')
                .setDescription('Makes neat 2D designs in Roblox')
                .setValue('UI Designer'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Animator')
                .setDescription('Animates your models in Roblox')
                .setValue('Animator'),
            new StringSelectMenuOptionBuilder()
                .setLabel('GFX Designer')
                .setDescription('Creates logos and vector graphics')
                .setValue('GFX Designer'),
            new StringSelectMenuOptionBuilder()
                .setLabel('SFX Designer / Composer')
                .setDescription('Creates music and sound')
                .setValue('SFX Designer / Composer'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Programmer')
                .setDescription('Creates programs outside of Roblox')
                .setValue('Programmer'),
            new StringSelectMenuOptionBuilder()
                .setLabel('Other')
                .setDescription('More than 1 type of dev, or role that is not listed')
                .setValue('Other'),
        );
        const begin = new StringSelectMenuBuilder()
        .setCustomId('tp')
        .setPlaceholder('Select ticket type')
        .addOptions(
            new StringSelectMenuOptionBuilder()
                .setLabel('Hiring')
                .setDescription('If you are looking for devs to join you')
                .setValue('a'),
            new StringSelectMenuOptionBuilder()
                .setLabel('For Hire')
                .setDescription('If you want to get hired')
                .setValue('b'),
        );

        const aboutInput = new TextInputBuilder()
        .setCustomId('ai')
        .setLabel("Enter a description")
        .setStyle(TextInputStyle.Paragraph);

        const priceInput = new TextInputBuilder()
        .setCustomId('pi')
        .setLabel("Describe payment methods and prices")
        .setStyle(TextInputStyle.Paragraph);

        const a = new ActionRowBuilder().addComponents(begin);
        const b = new ActionRowBuilder().addComponents(select);
        const c = new ActionRowBuilder().addComponents(aboutInput);
        const d = new ActionRowBuilder().addComponents(priceInput);

        modal.addComponents(a, b, c, d);

        await interaction.showModal(modal);
    }
};