// require Node's native file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require discord-player
const { Player } = require('discord-player');

// require the config.json file
const { prefix, token } = require('./config.json');

// create a new Discord client
const client = new Discord.Client();

// Create a new Player (you don't need any API Key)
const player = new Player(client);

// To easily access the player
client.player = player;

// create a new Discord client collection "commands", you can access with 'client.commands'
client.commands = new Discord.Collection();

// returns an array with all the filenames with '.js' extension in "commands" dir
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// require the command files
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the "commands" Collection
	// with the key as the command name and the value as the exported module
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.user.setPresence({
		game: {
			name:'bip boup',
			type: 'WATCHING',
		},
		status: 'online',
	}).then(botPresence => console.log('My Bot:', botPresence));
});

// add the trackStart event so when a song will be played this message will be sent
client.player.on('trackStart', (message, track) => {
	const channel = message.guild.channels.cache.find(ch => ch.name === 'test');

	console.log(track);
	channel.send(`Now playing ${track.title}...`);
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'test');

	if (!channel) return;

	channel.send(`SALUT GRO BAISEUR, ${member}`);
});

client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'test');

	if (!channel) return;

	channel.send(`CASSE TOI GRO PD, ${member}`);
});

client.on('message', async message => {
	// if message doesn't start with prefix or is sent by a bot, return
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	// split the user's message in two blocks, the command and his arguments
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const commandName = args.shift().toLowerCase();

	if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return await message.channel.send(reply);
	}

	try {
		await command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		await message.reply('there was an error trying to execute that command!');
	}
});

// login to Discord with your app's token
client.login(token);
