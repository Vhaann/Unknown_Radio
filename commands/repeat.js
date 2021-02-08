const { client } = require('../index');

module.exports = {
	name: 'repeat',
	description: 'Toggle Repeat Mode',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		if(client.player.getQueue(message).repeatMode === false) {
			await client.player.setRepeatMode(message, true);
			message.channel.send('RepeatMode is ON');
		}
		else {
			await client.player.setRepeatMode(message, false);
			message.channel.send('RepeatMode is OFF');
		}

	},
};
