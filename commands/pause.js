const { client } = require('../index');

module.exports = {
	name: 'pause',
	description: 'Pause current song',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to pause the current track');

			return;
		}

		await client.player.pause(message);

		message.channel.send('Paused');
	},
};
