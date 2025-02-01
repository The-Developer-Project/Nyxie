const { Events } = require('discord.js');
const { checkForUpdate } = require('../RobloDocCache.js');
const { serve } = require('../server_handler.js');
console.log(checkForUpdate);

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		await checkForUpdate();
		serve();
		setInterval(client.checkUpdates, 30000);
		setInterval(async () => {
			await client.digestTickets();
			await client.checkGiveaways();
		  }, 10000); 
	},
};