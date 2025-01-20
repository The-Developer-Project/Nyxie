const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { getUserFromUsername, getMugshot, getFriendCount, getFollowerCount } = require('../../rblxAPIWrapper.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rblx')
		.setDescription("Loads info about a player's roblox account by username")
        .addStringOption(option =>
            option.setName("username")
                .setDescription('The roblox username to track')
                .setRequired(true)),
	async execute(interaction) {
        let option = interaction.options.getString("username");
        try {
            let User = await getUserFromUsername(option);
            let PfpUrl = await getMugshot(User.id);
            let friends = await getFriendCount(User.id);
            let followers = await getFollowerCount(User.id);
            const exampleEmbed = new EmbedBuilder()
            .setColor(0xF1C40F)
            .setTitle(`${option}'s Roblox Profile`)
            .addFields(
                { name: 'Username', value: option },
                { name: 'Display name', value: User.displayName },
                { name: 'User ID', value: User.id.toString()},
                { name: 'Friend Count', value: friends.toString()},
                { name: 'Follower Count', value: followers.toString()},
                { name: 'Has Verified Badge?', value: User.hasVerifiedBadge.toString() },
            )
            .setImage(PfpUrl)
            .setTimestamp();

            await interaction.reply({ embeds: [exampleEmbed] });
        } catch (error) {
            console.log(error);
            const exampleEmbed = new EmbedBuilder()
                .setColor(0xF1C40F)
                .setTitle(`Could not find user ${option}`)
            await interaction.reply({ embeds: [exampleEmbed] });
        }
	},
};