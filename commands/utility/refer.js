const { SlashCommandBuilder, EmbedBuilder} = require('discord.js');
const { refer } = require('../../RobloDocCache.js');
const bdfu = "https://create.roblox.com/docs/en-us/reference/engine/";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('refer')
		.setDescription('Loads a reference to the Roblox Developer Documentation')
        .addStringOption(option =>
            option.setName("ref")
                .setDescription('The item to reference')
                .setRequired(true)),
	async execute(interaction) {
        option = interaction.options.getString("ref");
        item = await refer(option);
        let timeout = 20;
        let done = false;
        while (!done) {
            let ne = await refer(option);
            timeout--;
            if (timeout < 0 || ne.description) {
                done = true;
            }
        }

        let n = {};

        let stuff = ["name", "description", "typo", "category", "memoryCategory"];
        for (let i=0; i < stuff.length; i++) {
            let thing = stuff[i];
            if (item[thing]) {
                n[thing] = item[thing];
            }
        }

        if (!stuff.url) {
            let tel = "";
            switch(n.typo) {
                case "Class":
                    tel = "classes";
                    break;
                case "DataType":
                    tel = "datatypes";
                    break;
                case "Enum":
                    tel = "enums";
                    break;
                case "Library":
                    tel = "libraries";
                    break;
                case "null":
                    tel = "classes";
                    break;
            }
            n.url = `${bdfu}${tel}/${n.name}`;
        }
        else {
            n.url = item.url;
        }

        const exampleEmbed = new EmbedBuilder()
            .setColor(0xF1C40F)
            .setTitle(n.name);
            
            if (n.name) exampleEmbed.addFields({ name: 'Name', value: n.name });
            if (n.description) exampleEmbed.addFields({ name: 'Description', value: n.description });
            if (n.typo) exampleEmbed.addFields({ name: 'Type', value: n.typo });
            if (n.category) exampleEmbed.addFields({ name: 'Category', value: n.category });
            if (n.memoryCategory) exampleEmbed.addFields({ name: 'Memory Category', value: n.memoryCategory });

            exampleEmbed.addFields({ name: 'Link', value: n.url });
            exampleEmbed.setTimestamp()
        await interaction.reply({ embeds: [exampleEmbed] });
	},
};