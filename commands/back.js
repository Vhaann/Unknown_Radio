const { client } = require('../index');

module.exports = {
	name: 'back',
	description: 'Play back the previous song',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.back(message);

		message.channel.send('Back');
	},
};
