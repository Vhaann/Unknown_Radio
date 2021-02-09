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

		message.channel.send(trackEmbed(track, message));
	},
};
