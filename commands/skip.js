const { client } = require('../index');

module.exports = {
	name: 'skip',
	description: 'Skips playing song',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.skip(message);

		message.channel.send('Skipped');
	},
};
