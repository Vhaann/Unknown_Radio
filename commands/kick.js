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

			member.kick({
				reason: 'il é pd',
			}, taggedUser).then(() => {
				console.log(`Kicked ${taggedUser.displayName}`);
				message.channel.send(`Tu sors ${taggedUser.username}`);
			});
		}
	},
};

