const Discord = require('discord.js');
const { Player } = require('discord-player');

const client = new Discord.Client();
const player = new Player(client);

client.player = player;

module.exports = {
	name: 'play',
	description: 'Plays songs from Spotify, Youtube or SoundCloud',
	args: true,
	usage: '<musicName>',
	async execute(message, args) {
		const track = await client.player.play(message.member.voice.channel, args[1], message.member.user.tag);

		message.channel.send(`Currently playing ${track.name}!`);
	},
};
