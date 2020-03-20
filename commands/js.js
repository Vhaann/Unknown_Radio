const {
    RichEmbed
} = require('discord.js')

const admin = ['126292280700043264', '352176756922253321']
const unauthorizedWords = ['process','eval','token','exit','require','module','export']
const unauthorizedWordsWithRegex = {}
for(const word of unauthorizedWords)
    unauthorizedWordsWithRegex[word] = new RegExp(word.split('').join('[^a-z]*'),'im')


module.exports = async function exe(message, js) {

    if (!admin.includes(message.author.id))
        for(const word in unauthorizedWordsWithRegex){
            const regex = unauthorizedWordsWithRegex[word]
            if(regex.test(message.content))
                return message.channel.send(`L'utilisation du mot **${word}** est prohibée... (sauf pour les beaux gosses)`)
        }

    js = js.replace('```js', '').replace('```', '').trim()
    if(!js.includes('\n') && !js.includes('return')) js = 'return ' + js

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