module.exports = {
	name: 'spotify',
	description: 'Plays songs from Spotify API',
	execute(message) {
		// activity => activity.type === 'LISTENING'
		const user = message.mentions.users.first() || message.author;
		const userActivity = user.presence.activities.find(activity => activity?.name);
		if (userActivity) {
			message.channel.send(`CA MARCHEUH, ${userActivity}`);
		} else {
			message.channel.send('FORCEMENT AEC LINUX C PA SI SIMPLE');
		}
	},
};
