const Discord = require('discord.js');
const { client } = require('../index');

module.exports = {
	name: 'queue',
	description: 'Get client Queue',
	async execute(message) {
		const queue = await client.player.getQueue(message);

		queue.tracks.map(track => {
			return track.title;
		});

		const trackTitles = queue.tracks.map(track => {
			return track.title;
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
