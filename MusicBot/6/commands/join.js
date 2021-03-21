module.exports = {
    name: 'join',
    description: 'Join a Voice Channel',
       async execute(message, args){
        console.log("potato")
            if (message.member.voice.channel) {
                var connection = await message.member.voice.channel.join();
            }
    }
}