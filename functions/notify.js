const Parser = require('rss-parser');
const parser = new Parser();
const fs = require('fs');
const {youTubeNotificationChannel, youTubeChannel, youTubePing} = require('../config.json');

module.exports = (client) => {
    client.checkUpdates = async () => {
        let videodata = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${youTubeChannel}`);
        if (!videodata) return;
        let channel = await client.channels.cache.get(youTubeNotificationChannel);
        if (!channel) return;
        let {link, author, title, id} = videodata.items[0];
        let vid = id;
        let rawdata = fs.readFileSync('yt.json');
        let lastVideoId= JSON.parse(rawdata).lastVideoId;
        if (lastVideoId == id) return;
        else {
            let data = JSON.stringify({"lastVideoId": vid});
            fs.writeFileSync('yt.json', data);
        }

        await channel.send({content: `**<@&${youTubePing}> We have uploaded!** ${link}\n## ${title}`})
    }
}
