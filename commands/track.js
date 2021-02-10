const { client } = require('../index');
const trackEmbed = require('../components/trackEmbed');

module.exports = {
	name: 'track',
	description: 'Get current track',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to get the current track');

			return;
		}

		const track = await client.player.nowPlaying(message);

		message.channel.send(trackEmbed(track, message)).then(async embedMessage => {
			await embedMessage.react('⏯️')
			await embedMessage.react('🔁')
			await embedMessage.react('🔂')
			await embedMessage.react('⏭️')
			await embedMessage.react('❤️')

			const filter = ( reaction, user ) => {
				return ['⏯️', '❤️', '🔁', '🔂', '⏭️'].includes(reaction.emoji.name) && user.id === message.author.id;
			}

			const collector = embedMessage.createReactionCollector(filter, { time: 99999999 });

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
	},
};
