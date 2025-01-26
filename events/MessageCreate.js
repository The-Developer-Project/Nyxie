const { Events } = require('discord.js');
const { ticketCategory } = require("../config.json");

module.exports = {
    name: Events.MessageCreate,
    on: true,
    execute(message) {
        if (message.channel.parentId == ticketCategory && message.content == ".close") {
            message.channel.delete();
        }
    },
};