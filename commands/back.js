const { client } = require('../index');

module.exports = {
	name: 'back',
	description: 'Play back the previous song',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to get the previous track');

			return;
		}

		await client.player.back(message);

		message.channel.send('Back');
	},
};
