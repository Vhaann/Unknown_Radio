const { client } = require('../index');

module.exports = {
	name: 'volume',
	description: 'Set Volume',
	args: true,
	usage: '<volumeInPercent>',
	async execute(message, args) {
		if(!client.player.isPlaying(message)) return ;

		await client.player.setVolume(message, args[0]);

		message.channel.send(`Volume is now at ${args[0]}%`);
	},
};
