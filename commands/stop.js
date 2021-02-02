const { client } = require('../index');

module.exports = {
	name: 'stop',
	description: 'Stop currently playing song',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.stop(message);

		message.channel.send('You stopped Unknown Radio');
	},
};
