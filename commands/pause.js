const Discord = require('discord.js');
const { Player } = require('discord-player');

const client = new Discord.Client();
const player = new Player(client);

client.player = player;

module.exports = {
	name: 'pause',
	description: 'Pause current song',
	async execute(message) {
	    if(!client.player.isPlaying(message)) return ;
		await client.player.pause(message);
	},
};
