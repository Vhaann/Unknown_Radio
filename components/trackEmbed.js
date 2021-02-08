const Discord = require('discord.js');

module.exports = (track, message) => {
	const trackEmbed = new Discord.MessageEmbed()
		.setAuthor(track.title)
		.setColor(0X1ED760)
		.setThumbnail(track.thumbnail)
		.addField('Song Name', track.title, true)
		.addField('Author', track.author, true)
		.addField('Listen on Youtube', track.url)
		.setFooter(track.requestedBy.username, message.author.displayAvatarURL())
		.setTimestamp();

	return trackEmbed;
};

