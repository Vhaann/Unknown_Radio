const { client } = require('../index');

module.exports = {
	name: 'repeatoff',
	description: 'setRepeatMode OFF',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.setRepeatMode(message, false);

		message.channel.send('RepeatMode is OFF');
	},
};
