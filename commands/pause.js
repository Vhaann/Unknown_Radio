const { client } = require('../index');

module.exports = {
	name: 'pause',
	description: 'Pause current song',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.pause(message);

		message.channel.send('Paused');
	},
};
