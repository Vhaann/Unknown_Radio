const { client } = require('../index');
const trackEmbed = require('../components/trackEmbed');

module.exports = {
	name: 'track',
	description: 'Get current track',
	async execute(message) {
		const track = await client.player.nowPlaying(message);

		message.channel.send(trackEmbed(track, message));
	},
};
