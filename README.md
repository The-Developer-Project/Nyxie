# Nyxie - The Developer Project Discord Bot

Welcome to **Nyxie**, the official Discord bot for **The Developer Project** (TDP), a community dedicated to **Roblox development**. Nyxie is designed to help developers connect with one another, find groups, and access a range of useful tools for their Roblox projects. This bot is open-source and anyone is free to contribute, fork, and modify it to suit their own needs.

---

## License Information

Nyxie is released under the [Apache 2.0 License](LICENSE), and comes with a **NOTICE** file with additional information.

### NOTICE:
The original bot is created and hosted by **GalacticApricot** within the TDP Discord server.  
If you are to use this bot for your own project, **you must credit The Developer Project**.

- Join the Discord server: [TDP Discord](https://discord.gg/QedwEVhrkX)
- **We are not responsible for any forks or modifications made to this bot**. We cannot offer support for modified versions.

---

## Prerequisites

Before setting up Nyxie, you’ll need to ensure you have the following:

- **Node.js** installed (preferably the latest LTS version)
- A **Discord account**
- A **code editor** (e.g., Visual Studio Code)
- **Git** (if you prefer cloning the repository) or the **Download button** for downloading the bot's code directly.

---

## Features

Nyxie is built to help Roblox developers streamline their work with a variety of tools, including:

- **Group recruitment** tools to help developers find teams.
- **Portfolio channels** for showcasing your Roblox creations.
- **QOTD (Question of the Day)** for engaging the community.
- **Role-based access** to relevant tools and channels for staff and members.
- **Member count and general chat** channels to keep your server active and informative.

---

## Setting Up Nyxie

### Step 1: Create a Discord Bot on the Developer Portal

1. Visit the [Discord Developer Portal](https://discord.com/developers/applications).
2. Click **New Application** and give it a name, such as "Nyxie".
3. Under the **Bot** section, click **Add Bot** to create your bot.
4. **Enable all the intents** your bot needs under the **Privileged Gateway Intents** section. Specifically, you should enable:
   - **Presence Intent** (if you want to track user presence)
   - **Server Members Intent** (for tracking server members)
   - **Message Content Intent** (to allow reading message content)
   
   Make sure **OAuth2** is not enabled as we won't be using it for this bot setup.
   
5. Copy your bot’s **Token** by clicking **Copy** under the TOKEN section. You will need this for your `config.json` file.

### Step 2: Invite the Bot to Your Server

To invite the bot to your server, we recommend using the **Discord Permissions Calculator**:

1. Go to the [Discord Permissions Calculator](https://discordapi.com/permissions.html).
2. Choose the necessary permissions that you want your bot to have (e.g., **Send Messages**, **Manage Channels**, **Read Messages**, etc.).
3. Once you’ve selected the permissions, generate the OAuth2 invite link and use it to invite Nyxie to your server.

---

### Step 3: Downloading the Code

You must have node.js and openssl installed.

You can either clone the repository using Git or download the project as a ZIP file.

#### Option 1: Clone the Repository

If you're familiar with Git, you can clone the repository directly:

```bash
git clone https://github.com/The-Developer-Project/Nyxie.git
cd Nyxie
```

#### Option 2: Download as ZIP

If you prefer not to use Git, you can download the code directly:

1. Go to the [Nyxie GitHub repository](https://github.com/The-Developer-Project/Nyxie).
2. Click on the **Download ZIP** button on the right side of the page.
3. Extract the ZIP file to a directory on your computer.

---

### Step 4: Install Dependencies

Once you’ve downloaded or cloned the project, follow these steps:

1. Open a terminal or command prompt in the project directory.
2. Run the following command to initialize the project:

```bash
npm init -y
```

3. Install the required dependencies:

```bash
npm install discord.js
npm install rss-parser
npm install node-fetch
npm install better-sqlite3
```

---

### Step 5: Configure the Bot

The **config.json** file is already provided for you. All you need to do is fill in the required information with your specific Discord details.

Here’s the provided template with explanations of each component:

```json
{
	"token": "ENTER_TOKEN_HERE",
    "clientId": "ENTER_CLIENT_ID_HERE",
	"guildId": "ENTER_GUILD_ID_HERE",
	"hiringChannel": "ENTER_HIRING_CHANNEL_ID_HERE",
	"portfolioChannel": "ENTER_PORTFOLIOS_CHANNEL_ID_HERE",
	"memberCountChannel": "ENTER_MEMBER_COUNT_CHANNEL_ID_HERE",
	"generalChannel": "ENTER_GENERAL_CHANNEL_ID_HERE",
	"qotdChannel": "ENTER_QOTD_CHANNEL_ID_HERE",
	"youTubeNotificationChannel": "ENTER_YOUTUBE_NOTIFICATION_CHANNEL_ID_HERE",
	"youTubeChannel": "ENTER_YOUTUBE_CHANNEL_ID_HERE (actual yt channel)",
	"youTubePing": "ENTER_YOUTUBE_PING_ROLE_ID_HERE",
	"qotdPing": "ENTER_QOTD_PING_ROLE_ID_HERE",
	"commonStaffRoleName": "ENTER_STAFF_ROLE_ID_HERE",
	"banAppealLink": "ENTER_BAN_APPEAL_FORM_LINK_HERE",
	"verificationPlaceId": "ENTER_VERIFICATION_PLACE_ID_HERE",
	"port": 443
}
```

- **token**: Your **Discord Bot Token** (copied from the Developer Portal).
- **clientId**: The **Client ID** of your bot (found in the **General Information** section of the Developer Portal).
- **guildId**: Your **server ID** (you can enable Developer Mode in Discord and right-click on your server to copy the ID).
- **hiringChannel**: Channel ID where hiring-related activities will take place.
- **portfolioChannel**: Channel ID for portfolios.
- **memberCountChannel**: Channel for displaying member count.
- **generalChannel**: General chat channel ID.
- **qotdChannel**: Channel for daily QOTD (Question of the Day) posts.
- **qotdPing**: Role ID for pings related to QOTD.
- **youTubeNotificationChannel**: Channel ID for YouTube notifications.
- **youTubeChannel**: The Id of your youube channel (youtube -> settings -> advanced settings -> channel ID).
- **youTubePing**: The ID of your youtube notification ping role.
- **commonStaffRoleName**: The name or ID of your staff role.
- **banAppealLink**: The link to your ban appeal form.
- **verificationPlaceId**: The ID of the place where verification takes place (Place id is NOT the same as experience id).
- **port**: The port on which you will run the http server. Set to 443 by default.

---

### Step 6: Create Database

Once you've set up config.json, run this command to create the database tables:

```bash
node init.js
```

---

### Step 7: Generate https certificate and key

CD into /https/ or open a terminal in that directory, then run the following command and follow the instructions:

```bash
openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem
```

You can then delete the get-cert file.

---

### Step 8: Create Roblox Experience

Create the roblox experience, and place each file in the location corresponding to the file folder.
The comment at the top of each file shows the file's class, and name. Follow the instructions on each of them.
You can then delete the /roblox folder.

---

### Step 9: Running the Bot

When you first set up the bot and after any updates to the slash commands, you will need to deploy the commands before running the bot.

1. **Deploy Commands**: Run the following command to register the slash commands with Discord:

```bash
node deploy-commands.js
```

2. **Run the Bot**: Once the commands have been deployed, run the bot with:

```bash
node .
```

- For every subsequent update to slash commands, **always run** `node deploy-commands.js` first to ensure your commands are registered with Discord, and then run `node .` to start the bot.

---

## Contributing

Feel free to fork this repository and submit pull requests with improvements, bug fixes, or new features. If you have any questions or encounter issues, don't hesitate to reach out.

---

## Contact & Support

If you need assistance or want to contribute to the project, feel free to contact the bot creator **GalacticApricot** via DM or join the community server.

- **DM GalacticApricot**: You can reach out to GalacticApricot directly on Discord for questions or support.
- **Join the Developer Project Discord Server**: [TDP Discord](https://discord.gg/QedwEVhrkX)

---

## Dependencies

```bash
better-sqlite3: ^11.8.1
discord.js: ^14.17.3
node-fetch: ^3.3.2
rss-parser: ^3.13.0
```

---

Thank you for using **Nyxie**! Enjoy building your Roblox development community with the bot!
