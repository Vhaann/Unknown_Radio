const Discord = require('discord.js');

module.exports = (track, message) => {
	const trackEmbed = new Discord.MessageEmbed()
		.setTitle(track.title)
		.setThumbnail(track.thumbnail)
		.setAuthor(track.author)
		.setColor(0X1ED760)
		.setDescription(track.description)
		.addField('Listen on Youtube', track.url)
		.setFooter(track.requestedBy.username, message.author.displayAvatarURL())
		.setTimestamp();

	return trackEmbed;
};

