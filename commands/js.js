const {
    RichEmbed
} = require('discord.js')

module.exports = async function exe(message, js) {

    if (!['126292280700043264', '352176756922253321'].includes(message.author.id)) return

    js = js.replace('```js', '').replace('```', '').trim()

    const embed = new RichEmbed()
    let result = 'té nul'
    try {
        result = await eval('async () => {' + js + '}')()
    } catch (error) {
        embed.setDescription(format(error.message))
        return message.channel.send(embed).catch()
    }
    try {
        embed.setTitle(typeof result)
        embed.setDescription(format(result))
    } catch (error) {
        try {
            embed.setDescription(format(JSON.stringify(result, null, 2)))
        } catch (error2) {
            embed.setDescription(format(error.message))
        }
    }
    message.channel.send(embed).catch()
}

function format(text) {
    return '```js\n' + String(text) + '\n```'
}