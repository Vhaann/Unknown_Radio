// require Node's native file system
const fs = require('fs');

// require the discord.js module
const Discord = require('discord.js');

// require discord-player
const { Player } = require('discord-player');

// require the config.json file
const { prefix, token } = require('./config.json');

// other imports
const trackEmbed = require('./components/trackEmbed');

// create a new Discord client
const client = new Discord.Client();

// Create a new Player (you don't need any API Key)
const player = new Player(client);

// To easily access the player
client.player = player;

// create a new Discord client collection "commands", you can access with 'client.commands'
client.commands = new Discord.Collection();

// export the client, so you can access it from the command files
module.exports = { client };

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
		activity: {
			name:'Type !help',
			type: 'LISTENING',
		},
		status: 'online',
	}).then(botPresence => console.log('My Bot:', botPresence));
});

// On trackStart send track title in music channel
client.player.on('trackStart', (message, track) => {
	const channel = message.guild.channels.cache.find(ch => ch.name === 'music');

	channel.send(`Now playing ${track.title}`);
	channel.send(trackEmbed(track, message)).then( async embedMessage => {
		await embedMessage.react('⏯️')
		await embedMessage.react('🔁')
		await embedMessage.react('🔂')
		await embedMessage.react('⏭️')
		await embedMessage.react('❤️')

		const filter = ( reaction, user ) => {
			return ['⏯️', '❤️', '🔁', '🔂', '⏭️'].includes(reaction.emoji.name) && user.id === message.author.id;
		}

		const collector = embedMessage.createReactionCollector(filter);

		collector.on('collect', (reaction, user) => {
			if(reaction.emoji.name === '⏯️') {
				client.player.isPlaying(message) && client.player.nowPlaying(message).url === track.url
					? client.player.pause(message)
					: client.player.play(message, track.url, true)
			} else if(reaction.emoji.name === '🔁') {
				client.player.getQueue(message).loopMode === false
					? client.player.setLoopMode(message, true) && embedMessage.reply('loop mode is ON')
					: client.player.setLoopMode(message, false) && embedMessage.reply('loop mode is OFF')
			} else if(reaction.emoji.name === '🔂') {
				client.player.getQueue(message).repeatMode === false
					? client.player.setRepeatMode(message, true) && embedMessage.reply('repeat mode is ON')
					: client.player.setRepeatMode(message, false) && embedMessage.reply('repeat mode is OFF')
			} else if(reaction.emoji.name === '⏭️') {
				if(client.player.isPlaying(message)) {
					client.player.skip(message) && embedMessage.reply('Skiped')
				}
			} else {
				embedMessage.reply('Added to your Liked Songs')
			}
		})
	});

	console.log(track);
});

// On trackAdd send track title in music channel
client.player.on('trackAdd', (message, queue) => {
	const channel = message.guild.channels.cache.find(ch => ch.name === 'music');

	console.log(queue);

	channel.send(`Added ${queue.tracks[queue.tracks.length - 1].title} to the queue`);
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'général');

	if (!channel) return;

	channel.send(`SALUT GRO BAISEUR, ${member}`);
});

client.on('guildMemberRemove', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'général');

	if (!channel) return;

	channel.send(`CASSE TOI GRO PD, ${member}`);
});

client.on('message', async (message) => {
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
