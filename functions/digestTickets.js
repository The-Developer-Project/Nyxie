const fs = require('fs');
const { ticketCategory, guildId } = require('../config.json');
const crypto = require("crypto");
const { EmbedBuilder, ChannelType } = require('discord.js');

module.exports = (client) => {
    client.digestTickets = async () => {
        let rawdata = fs.readFileSync('tickets.json');
        let tickets = JSON.parse(rawdata).tickets;
        if (!tickets) return;
        for (let i = 0; i < tickets.length; i++) {
            let ticket = tickets[i];
            let rid = crypto.randomBytes(6).toString('base64');
            let guild = client.guilds.cache.get(guildId);
            if (!guild) return;

            let channel = await guild.channels.create({
                name: `ticket-${rid}`,
                type: ChannelType.GuildText, // Specify the channel type as text
                parent: ticketCategory, // Assign to the ticket category
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id, // Default role (@everyone)
                        deny: ['ViewChannel'], // Deny view access for everyone
                    },
                ],
            });

            let buyer = await client.users.fetch(ticket.user).catch(() => null);
            let seller = await client.users.fetch(ticket.seller).catch(() => null);

            if (!channel || !buyer || !seller) return;

            // Grant permissions to the buyer and seller
            await channel.permissionOverwrites.create(buyer, {
                ViewChannel: true,
                SendMessages: true,
            });

            await channel.permissionOverwrites.create(seller, {
                ViewChannel: true,
                SendMessages: true,
            });

            // Send the embed message in the created channel
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xF1C40F)
                .setTitle(`Ticket for purchase of ${ticket.item}`)
                .setDescription(`${ticket.description}`)
                .setTimestamp()
                .setFooter({ text: 'Type .close to close' });

            await channel.send({
                content: `<@${ticket.user}> <@${ticket.seller}>`,
                embeds: [exampleEmbed],
            });
        }

        // Clear the tickets.json after processing
        let data = JSON.stringify({ "tickets": [] });
        fs.writeFileSync('tickets.json', data);
    };
};
