module.exports = {
	name: 'ping',
	description: 'Send back "Pong." to the channel the message was sent',
	execute(message, args) {
		message.channel.send('Pong.');
	},
};
