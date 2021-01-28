const Discord = require('discord.js');
const { Player } = require('discord-player');

const client = new Discord.Client();
const player = new Player(client);

client.player = player;

module.exports = {
	name: 'stop',
	description: 'Stop currently playing song',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.stop(message);

		message.channel.send('You stopped Unknown Radio');
	},
};
