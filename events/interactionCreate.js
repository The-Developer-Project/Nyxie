const { Events, MessageFlags, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const {dictionary} = require("../dictionary.js");
const {hiringChannel, portfolioChannel} = require("../config.json");
const {addProduct} = require('../DBWrapper.js');
const {createGiveaway, addplayerToGiveaway, removePlayerFromGiveaway, parseAndAddTime} = require('../giveaway-handler.js');
const leaverequests = {};

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

		if (interaction.customId === 'gi') {
			try {
				let now = new Date();
			let p = parseAndAddTime(now, interaction.fields.getTextInputValue('du'));
			const exampleEmbed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setTitle(interaction.fields.getTextInputValue('ti'))
			.setDescription(interaction.fields.getTextInputValue('de'))
			.addFields(
				{ name: 'Ends', value: `<t:${Math.floor(p / 1000)}:R>` },
				{ name: 'Hosted by', value: `<@${interaction.member.id}>` },
				{ name: 'Entries', value: "**0**"},
				{ name: 'Winners', value: interaction.fields.getTextInputValue('wi') },
			)
			.setTimestamp()
			const button = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
				.setCustomId('ge')
				.setStyle(ButtonStyle.Primary)
				.setEmoji('🎉')
			);
			let m = await interaction.channel.send({embeds: [exampleEmbed], components: [button]});
			let i = createGiveaway(now, p, [
				interaction.channel.id,
				m.id,
				interaction.fields.getTextInputValue('du'),
				interaction.fields.getTextInputValue('ti'),
				interaction.fields.getTextInputValue('de'),
				interaction.fields.getTextInputValue('wi'),
				interaction.fields.getTextInputValue('pi'),
				interaction.member.id

			])
			if (i.error) {
				await interaction.reply({ content: `Failed to create giveaway. Error: ${i.error}`, flags: MessageFlags.Ephemeral });
			}
			else {
				await interaction.reply({ content: 'Giveaway created!', flags: MessageFlags.Ephemeral });
			}
			} catch (error) {
				console.log(error)
				await interaction.reply({ content: `Failed to create giveaway. Error: ${error}`, flags: MessageFlags.Ephemeral });
			}
		
		}

		if (interaction.customId === 'ge') {
			try {
				let giveaway = addplayerToGiveaway(interaction.message.id, interaction.member.id);
				if (!giveaway.same) {
					const exampleEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle(giveaway.title)
					.setDescription(giveaway.description)
					.addFields(
						{ name: 'Ends', value: `<t:${Math.floor(new Date(giveaway.expiry) / 1000)}:R>` },
						{ name: 'Hosted by', value: `<@${giveaway.host}>` },
						{ name: 'Entries', value: `**${giveaway.participants.length}**`},
						{ name: 'Winners', value: `${giveaway.winners}` },
					)
					.setTimestamp()
					const button = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
						.setCustomId('ge')
						.setStyle(ButtonStyle.Primary)
						.setEmoji('🎉')
					);
					const channel = await interaction.client.channels.fetch(giveaway.channelId);
					const message = await channel.messages.fetch(giveaway.messageId);
					await message.edit({embeds: [exampleEmbed], components: [button]});
					await interaction.reply({ content: 'Joined Giveaway!', flags: MessageFlags.Ephemeral });
				}
				else {
					const button = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
						.setCustomId('gl')
						.setStyle(ButtonStyle.Primary)
						.setLabel('Leave')
						.setStyle(ButtonStyle.Danger)
					);
					await interaction.reply({ content: 'You are already in this giveaway!', components: [button], flags: MessageFlags.Ephemeral });
					r = await interaction.fetchReply();
					leaverequests[r.id] = interaction.message.id;
				}
			} catch (error) {
				console.log(error);
				await interaction.reply({ content: 'Sorry, an error has occured. Please try again later.', flags: MessageFlags.Ephemeral});
			}
		}

		if (interaction.customId === 'gl') {
			try {
				let giveaway = removePlayerFromGiveaway(leaverequests[interaction.message.id], interaction.member.id);
				const exampleEmbed = new EmbedBuilder()
					.setColor(0x0099FF)
					.setTitle(giveaway.title)
					.setDescription(giveaway.description)
					.addFields(
						{ name: 'Ends', value: `<t:${Math.floor(new Date(giveaway.expiry) / 1000)}:R>` },
						{ name: 'Hosted by', value: `<@${giveaway.host}>` },
						{ name: 'Entries', value: `**${giveaway.participants.length}**`},
						{ name: 'Winners', value: `${giveaway.winners}` },
					)
					.setTimestamp()
					const button = new ActionRowBuilder()
					.addComponents(
						new ButtonBuilder()
						.setCustomId('ge')
						.setStyle(ButtonStyle.Primary)
						.setEmoji('🎉')
					);
				const channel = await interaction.client.channels.fetch(giveaway.channelId);
				const message = await channel.messages.fetch(giveaway.messageId);
				await message.edit({embeds: [exampleEmbed], components: [button]});
				await interaction.reply({ content: 'You have left the giveaway.', flags: MessageFlags.Ephemeral});
			} catch (error) {
				console.log(error)
				await interaction.reply({ content: 'Sorry, an error has occured. Please try again later.', flags: MessageFlags.Ephemeral});
			}
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