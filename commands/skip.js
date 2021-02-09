const { client } = require('../index');

module.exports = {
	name: 'skip',
	description: 'Skips playing song',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to skip the track');

			return;
		}

		await client.player.skip(message);

		message.channel.send('Skipped');
	},
};
