module.exports = {
    name: 'server',
    description: 'Send back the server infos to the channel the message was sent',
    execute(message, args) {
        message.channel.send(`This server's name is: ${message.guild.name} \n Total members: ${message.guild.memberCount}`);
    },
};
