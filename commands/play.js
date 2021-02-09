const { client } = require('../index');

module.exports = {
	name: 'play',
	description: 'Plays songs from Spotify, Youtube or SoundCloud',
	args: true,
	usage: '<musicName>',
	async execute(message, args) {
		const parsedArgs = args.toString();

		await client.player.play(message, parsedArgs, true);
	},
};
