const { Events, MessageFlags, EmbedBuilder } = require('discord.js');
const {dictionary} = require("../dictionary.js");
const {hiringChannel, portfolioChannel} = require("../config.json");
const {addProduct} = require('../DBWrapper.js');

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (interaction.customId === 'tk') {
			let id = hiringChannel;
			let message = "Ticket";
			let options = dictionary[interaction.member];
			const ai = interaction.fields.getTextInputValue('ai');
			const pi = interaction.fields.getTextInputValue('pi');
			if (ai.length > 1000 || pi.length > 1000) {
				await interaction.reply({ content: 'Description and pay must be less that 1,000 characters.', flags: MessageFlags.Ephemeral });
				return;
			}
			if (options[0] === 'b') {
				id = portfolioChannel;
				message = "Portfolio";
			}
			const exampleEmbed = new EmbedBuilder()
				.setColor(0x0099FF)
				.setTitle(`${interaction.member.displayName}'s ${message}`)
				.setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.displayAvatarURL()})
				.addFields(
					{ name: 'Developer Type', value: options[1] },
					{ name: 'Description', value: ai },
					{ name: 'Payment', value: pi},
					{ name: 'Contact', value: `<@${interaction.member.id}>` },
				)
				.setTimestamp()
				.setFooter({ text: 'Be respectful!'});
			console.log("3");
			await interaction.client.channels.cache.get(id).send({ embeds: [exampleEmbed] });
			await interaction.reply({ content: 'Message Sent!', flags: MessageFlags.Ephemeral });
			console.log("4");

		}
		if (interaction.customId === 'np') {
			addProduct(interaction.member.id,
				{
					name: interaction.fields.getTextInputValue('ti'),
					description: interaction.fields.getTextInputValue('de'),
					type: interaction.fields.getTextInputValue('ty'),
					tags: interaction.fields.getTextInputValue('tg'),
					robloxassetid: interaction.fields.getTextInputValue('im'),
					rating: 0

				}
			)
			await interaction.reply({ content: 'Listing Posted!', flags: MessageFlags.Ephemeral });
		}


		if (!interaction.isChatInputCommand()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			} else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};