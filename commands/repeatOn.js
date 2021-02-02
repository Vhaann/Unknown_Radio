const { client } = require('../index');

module.exports = {
	name: 'repeaton',
	description: 'setRepeatMode ON',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.setRepeatMode(message, true);

		message.channel.send('RepeatMode is ON');
	},
};
