const { client } = require('../index');

module.exports = {
	name: 'shuffle',
	description: 'Shuffle current Queue',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to shuffle');

			return;
		}

		await client.player.shuffle(message);

		message.channel.send('Shuffled');
	},
};
