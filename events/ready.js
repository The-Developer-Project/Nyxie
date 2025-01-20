const { Events } = require('discord.js');
const { checkForUpdate } = require('../RobloDocCache.js');
console.log(checkForUpdate);

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await checkForUpdate();
		setInterval(client.checkUpdates, 30000);
	},
};