const Discord = require('discord.js');
const { client } = require('../index');

module.exports = {
	name: 'spotify',
	description: 'Get current Spotify playing song',
	execute(message) {
		const user = message.mentions.users.first() || message.author;
		const userActivity = user.presence.activities.find(activity => activity.type === 'LISTENING');
		if (userActivity && userActivity.name === 'Spotify' && userActivity.assets !== null) {

			// We'll be using all these variables into our embed
			// Get the image of the track
			const trackIMG = `https://i.scdn.co/image/${userActivity.assets.largeImage.slice(8)}`;
			// Get the URL of the track
			const trackURL = `https://open.spotify.com/track/${userActivity.syncID}`;
			// Get the name of the track
			const trackName = userActivity.details;
			// Get the track author
			const trackAuthor = userActivity.state;
			// Get the track album
			const trackAlbum = userActivity.assets.largeText;

			// Create Embed MessageText
			const spotifyEmbed = new Discord.MessageEmbed()
				.setAuthor('Spotify Track', '')
				.setColor(0X1ED760)
				.setThumbnail(trackIMG)
				// Add Fields, true signify it can be on the same line as another field
				.addField('Song Name', trackName, true)
				.addField('Album', trackAlbum, true)
				// this signify only the two above fields will be on the same line
				.addField('Author', trackAuthor, false)
				// This here sets a clickable link, redirecting to the trackURL, while still showing the URL in ''.
				.addField('Listen to track', trackURL, false)
				.setFooter(message.member.displayName, message.author.displayAvatarURL())
				.setTimestamp();

			message.channel.send(spotifyEmbed).then( async embedMessage => {
				await embedMessage.react('⏯️')
				await embedMessage.react('❤️')

				const filter = ( reaction, user ) => {
					return ['⏯️','❤️'].includes(reaction.emoji.name);
				}

				const collector = embedMessage.createReactionCollector(filter);

				collector.on('collect', reaction => {
					if(reaction.emoji.name === '⏯️') {
						client.player.isPlaying(message) && client.player.nowPlaying(message).url === trackURL
							? client.player.pause(message)
							: client.player.play(message, trackURL, true)
					} else {
						embedMessage.reply('Added to your Liked Songs')
					}
				});
			})
		}
		else {
			message.channel.send('This user is not listening to Spotify');
		}
	},
};
