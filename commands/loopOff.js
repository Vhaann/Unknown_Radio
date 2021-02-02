const { client } = require('../index');

module.exports = {
	name: 'loopoff',
	description: 'setLoopMode OFF',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.setLoopMode(message, false);

		message.channel.send('LoopMode is OFF');
	},
};
