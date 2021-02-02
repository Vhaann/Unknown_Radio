const { client } = require('../index');

module.exports = {
	name: 'track',
	description: 'Get current track',
	async execute(message) {
		const track = await client.player.nowPlaying(message);

		console.log(track);
		// message.channel.send(queue);
	},
};
