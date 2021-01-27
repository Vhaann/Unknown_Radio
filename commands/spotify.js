const Discord = require('discord.js');

module.exports = {
	name: 'spotify',
	description: 'Plays songs from Spotify API',
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
				.setAuthor('Spotify Track', 'https://cdn.discordapp.com/emojis/40866371039682560.png')
				.setColor(0X1ED760)
				.setThumbnail(trackIMG)
				// Add Fields, true signify it can be on the same line as another field
				.addField('Song Name', trackName, true)
				.addField('Album', trackAlbum, true)
				// this signify only the two above fields will be on the same line
				.addField('Author', trackAuthor, false)
				// This here sets a clickable link, redirecting to the trackURL, while still showing the URL in ''.
				.addField('Listen to track', `[\`${trackURL}\`](trackURL)`, false)
				.setFooter(message.member.displayName, message.author.displayAvatarURL())
				.setTimestamp();

			message.channel.send(spotifyEmbed);
			console.log(user.presence.activities);
		}
		else {
			message.channel.send('This user is not listening to Spotify');
		}
	},
};
