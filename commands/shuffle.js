const { client } = require('../index');

module.exports = {
	name: 'shuffle',
	description: 'Shuffle current Queue',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.shuffle(message);

		message.channel.send('Shuffled');
	},
};
