module.exports = {
    name: 'me',
    description: 'Send back the authors info to the channel the message was sent',
    execute(message, args) {
        message.channel.send(`Your username: ${message.author.username} \n Your ID: ${message.author.id}`);
    },
};
