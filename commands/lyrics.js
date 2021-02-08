const lyricsFinder = require('lyrics-finder');
const { client } = require('../index');

module.exports = {
	name: 'lyrics',
	description: 'Get track Lyrics',
	async execute(message) {
		const track = await client.player.nowPlaying(message);
		const regex = /[^\-]+$/;

		const trackTitle = track.title.match(regex)[0];

		console.log(track.author, trackTitle);

		const lyrics = await lyricsFinder(track.author, trackTitle) || 'Not Found !';

		for(let i = 0; i < lyrics.length; i += 2000) {
			const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 2000));
			message.channel.send(toSend);
		}
	},
};
