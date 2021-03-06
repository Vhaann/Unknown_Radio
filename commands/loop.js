const { client } = require('../index');

module.exports = {
	name: 'loop',
	description: 'Toggle Loop Mode',
	async execute(message) {
		if(!client.player.isPlaying(message)) {
			message.channel.send('Unknow Radio must be playing in order to toggle loopMode');

			return;
		}

		if(client.player.getQueue(message).loopMode === false) {
			await client.player.setLoopMode(message, true);
			message.channel.send('LoopMode is ON');
		}
		else {
			await client.player.setLoopMode(message, false);
			message.channel.send('LoopMode is OFF');
		}

	},
};
