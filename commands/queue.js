const { client } = require('../index');

module.exports = {
	name: 'queue',
	description: 'Get client Queue',
	async execute(message) {
		const queue = await client.player.getQueue(message);

		console.log(queue);
		// message.channel.send(queue);
	},
};
