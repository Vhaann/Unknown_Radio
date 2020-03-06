const config = require("./config")
const { readdir } = require("fs").promises
const { Client, Collection } = require("discord.js")
const { resolve } = require('path')

const client = new Client({
    fetchAllMembers: true
})

client.login( config.token ).catch()

client.once('ready',async () => {
    const commandDir = await readdir('./commands')
    client.commands = new Collection()
    commandDir.forEach( commandFileName => {
        client.commands.set(
            commandFileName.replace(/\.js$/, ''),
            require(resolve(__dirname, 'commands', commandFileName))
        )
    } )
    client.ready = true
    console.log('Client Ready ! Commands: ', client.commands.map((c,n)=>n).join(', '))
} )
client.on("message", async (message) => callCommand(message))
client.on('messageUpdate',async (oldMessage, newMessage) => callCommand(newMessage))

function callCommand ( message ){
    if( !client.ready || !message.author || message.author.bot || message.system ) return
    if( message.content.startsWith(config.prefix) ) {
        const commandName = message.content.slice(config.prefix.length).split(/\s+/)[0]
        const args = message.content.replace(config.prefix + commandName, '').trim()
        const command = client.commands.get(commandName)
        if(command) command( message, args || '')
    }
}