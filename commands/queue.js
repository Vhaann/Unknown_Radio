const Discord = require('discord.js');
const { client } = require('../index');

module.exports = {
	name: 'queue',
	description: 'Get client Queue',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to get the current queue');

			return;
		}

		const queue = await client.player.getQueue(message);

		const trackTitles = [];

		queue.previousTracks.map(track => {
			trackTitles.push(track.title);
		});

		queue.tracks.map(track => {
			trackTitles.push(track.title);
		});

		const queueEmbed = new Discord.MessageEmbed()
			.setTitle('File D\'attente')
			.setThumbnail(queue.tracks[0].thumbnail)
			.setColor(0X1ED760)
			.setDescription(trackTitles)
			.setTimestamp();

		console.log(queue);
		message.channel.send(queueEmbed);
	},
};
