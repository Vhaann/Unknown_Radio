module.exports = {
	name: 'kick',
	description: 'Kick the first User mentioned',
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		if (taggedUser) {
			const member = message.guild.members.resolve(taggedUser);

			if (member) {
				member.ban({
					reason: 'ct un fdp',
				}).then(() => {
					console.log(`Banned ${taggedUser.displayName}`);
					message.channel.send(`Tu sors ${taggedUser.username}`);
				});

			}
			else {
				message.channel.send('That user isn\'t in this guild!');
			}
		}
		else {
			message.channel.send('You didn\'t mention the user to ban!');
		}
	},
};

