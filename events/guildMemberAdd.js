const { Events } = require('discord.js');
const { memberCountChannel } = require("../config.json");

module.exports = {
    name: Events.GuildMemberAdd,
    on: true,
    execute(member) {
        var memberCount = member.guild.memberCount;
        member.guild.channels.cache.get(memberCountChannel).setName(`・${memberCount}`);
    },
};