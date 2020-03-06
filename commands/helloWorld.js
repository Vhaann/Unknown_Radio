const { RichEmbed } = require('discord.js')

module.exports = function ( message, args ) {
    const embed = new RichEmbed()
        .setTitle('Hello World !')
        .setDescription( args )
    message.channel.send( embed ).catch()
}