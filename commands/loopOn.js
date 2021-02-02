const { client } = require('../index');

module.exports = {
	name: 'loopon',
	description: 'setLoopMode ON',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.setLoopMode(message, true);

		message.channel.send('LoopMode is ON');
	},
};
