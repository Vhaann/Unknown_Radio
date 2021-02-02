const { client } = require('../index');

module.exports = {
	name: 'play',
	description: 'Plays songs from Spotify, Youtube or SoundCloud',
	args: true,
	usage: '<musicName>',
	async execute(message, args) {
		await client.player.play(message, args[0], true);

		console.log('Track', args[0]);
	},
};
