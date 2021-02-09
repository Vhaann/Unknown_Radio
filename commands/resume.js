const { client } = require('../index');

module.exports = {
	name: 'resume',
	description: 'Resume song',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to resume the track');

			return;
		}

		await client.player.resume(message);

		message.channel.send('Playing');
	},
};
