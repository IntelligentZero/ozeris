const blacklist = require("../../schemas/blacklist");

module.exports = {
    name: "unblacklist",
    devOnly: true,
    async execute(args, client, msg) {
        user = msg.mentions[0]
        if (args[0] && !isNaN(args[0])) return user = await client.getRESTUser(args[0]).catch(() => client.createMessage(msg.channel.id, "Invalid User ID"))

        if (!args[0]) return client.createMessage(msg.channel.id, "Provide a User");
        if (!user) return client.createMessage(msg.channel.id, "Invalid User");

        blacklistData = await blacklist.findOne({
            UserID: user.id
        });

        if (!blacklistData) return client.createMessage(msg.channel.id, "This User is Not Blacklisted")

        if (blacklistData)
            await blacklist.findOneAndDelete({
                UserID: user.id
            });
        client.createMessage(msg.channel.id, "User Has Been Unblacklisted");
    }
};