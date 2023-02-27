const { canModifyQueue } = require("../../util/MitUtil.js");

module.exports = {
    name: 'remove',
    description: "Remove song from the queue",
    aliases: [],
    usage: ' [index]',
    cooldown: 2,
    args: 1,
    catergory: 'Music',
    async execute(message, args, client) {
        try {
            const queue = message.client.queue.get(message.guild.id);
            if (!queue) return message.channel.send("There is no queue.").catch(console.error);
            if (!canModifyQueue(message.member)) return;

            if (!args.length) return message.reply(`Usage: ${message.client.prefix}remove <Queue Number>`);
            if (isNaN(args[0])) return message.reply(`Usage: ${message.client.prefix}remove <Queue Number>`);

            const song = queue.songs.splice(args[0] - 1, 1);
            queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue.`);
        } catch (err) {
            console.log(err);
            return message.reply(`Oh no, an error occurred. Try again later!`);
        }
    }
};
