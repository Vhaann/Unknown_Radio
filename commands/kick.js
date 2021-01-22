module.exports = {
	name: 'kick',
	description: 'Kick the first User mentioned',
	execute(message, args) {
		if (!message.mentions.users.size) {
			return message.reply('you need to tag a user in order to kick them!');
		}

		const taggedUser = message.mentions.users.first();

		taggedUser.kick({
			reason: 'il é pd',
		}).then(() => {
			console.log(`Kicked ${taggedUser.displayName}`);
			message.channel.send(`Tu sors ${taggedUser.username}`);
		});
	},
};

