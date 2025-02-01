const {checkGiveaways, shuffleGiveaway} = require('../giveaway-handler.js');
const {EmbedBuilder} = require('discord.js');

module.exports = (client) => {
    client.checkGiveaways = async () => {
        let giveaways = checkGiveaways();
        if (!giveaways || giveaways.length < 1) return;
        giveaways.forEach(async giveaway => {
            let shuffledParticipants = shuffleGiveaway(giveaway).participants;
            let winners = shuffledParticipants.slice(0, giveaway.winners);
            let winnerString = "";
            if (winners.length) {
                winners.forEach( (winner) => {
                    winnerString = `<@${winner}> ${winnerString}`;
                })
            }
            else {
                winnerString = "No-one entered :("
            }
            let tiempo = Math.floor(new Date(giveaway.expiry) / 1000);
            const exampleEmbed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle(giveaway.title)
            .setDescription(giveaway.description)
            .addFields(
                { name: 'Ended', value: `<t:${tiempo}:R> (<t:${tiempo}:f>)` },
                { name: 'Hosted by', value: `<@${giveaway.host}>` },
                { name: 'Entries', value: `**${giveaway.participants.length}**`},
                { name: 'Winners', value: winnerString },
            )
            .setTimestamp()
            const channel = await client.channels.fetch(giveaway.channelId);
            const message = await channel.messages.fetch(giveaway.messageId);
            await message.edit({embeds: [exampleEmbed]});
            await message.reply({content:`Winners: ${winnerString}`});
        });
    }
}
