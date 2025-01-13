const { StringSelectMenuBuilder, StringSelectMenuOptionBuilder, SlashCommandBuilder, ActionRowBuilder, Events, ModalBuilder, TextInputBuilder, TextInputStyle, ComponentType, MessageFlags } = require('discord.js');
const {dictionary} = require("../../dictionary.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ticket')
		.setDescription('Creates ticket for hiring/getting hired'),
    async execute(interaction) {

        const modal = new ModalBuilder()
        .setCustomId('tk')
        .setTitle('Ticket Creation 2/2');

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
        modal.addComponents(c, d);

        let aval = "";
        let bval = "";

        const response = await interaction.reply({
			content: 'Ticket Creation 1/2 select type',
			components: [a, b],
            flags: MessageFlags.Ephemeral
		});

        const collector = response.createMessageComponentCollector({ componentType: ComponentType.StringSelect, time: 3_600_000 });

        collector.on('collect', async i => {
            const value = i.values[0]
            if (value.length == 1) {
                aval = value;
            } else {
                bval = value;
            }
            if (aval !== "" && bval !== "") {
                dictionary[i.user] = [aval, bval]
                await i.showModal(modal);
            } else {
                await i.reply({ content: 'Set Value', flags: MessageFlags.Ephemeral });
            }

        });
    }
};