const { client } = require('../index');

module.exports = {
	name: 'resume',
	description: 'Resume song',
	async execute(message) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.resume(message);

		message.channel.send('Playing');
	},
};
