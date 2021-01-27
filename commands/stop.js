const Discord = require('discord.js');
const { Player } = require('discord-player');

const client = new Discord.Client();
const player = new Player(client);

client.player = player;

module.exports = {
	name: 'stop',
	description: 'Stop currently playing song',
	async execute(message) {
		await client.player.stop(message.guild.id);

		message.channel.send('You stopped Unknown Radio');
	},
};
