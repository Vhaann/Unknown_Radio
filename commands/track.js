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
			await embedMessage.react('▶️')
			await embedMessage.react('⏸️')
			await embedMessage.react('❤️')

			const filter = ( reaction, user ) => {
				return ['▶️', '⏸️', '❤️'].includes(reaction.emoji.name) && user.id === message.author.id;
			}

			const collector = embedMessage.createReactionCollector(filter, { time: 15000 });

			collector.on('collect', (reaction, user) => {
				if(reaction.emoji.name === '⏯️') {
					client.player.isPlaying(message)
						? client.player.pause(message)
						: client.player.play(message, track.url, true)
				} else {
					embedMessage.reply('Added to your Liked Songs')
				}
			})
		});
	},
};
