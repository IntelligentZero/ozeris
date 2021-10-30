flagants = {
    NONE: 0,
    " <:DiscordStaffBadge:880052580431036426>": 1,
    "<:PartneredServerOwnerBadge:880112358570225745>": 2,
    "<:HypeSquadEventsBadge:880114512013971537>": 4,
    "<:BugHunterLevel1Badge:880113879932338196>": 8,
    "<:HypeSquadBraveryBadge:880107052687581256>": 64,
    "<:HypeSquadBrillianceBadge:880112159667925042>": 128,
    "<:HypeSquadBalanceBadge:880112189921427508>": 256,
    "<:EarlySupporterBadge:880053929222742056>": 512,
    "<:BugHunterLevel2Badge:880114066083938324>": 16384,
    "<:EarlyVerifiedBotDeveloperBadge:880104142243250226> ": 131072,
    "<:CertifiedModeratorBadge:880114284074520606>": 262144
};
module.exports = {
    name: "userinfo",
    async execute(args, client, msg) {
        user = msg.mentions[0] || msg.author;
        if (args[0] && !isNaN(args[0])) return user = await client.getRESTUser(args[0]).catch(() => client.createMessage(msg.channel.id, {
            embed: {
                title: "Error",
                description: "```diff- Invalid User ID```"
            }
        }))
        avatarJpg = user.dynamicAvatarURL("jpg", 4096)
        avatarPng = user.dynamicAvatarURL("png", 4096)
        avatarWebp = user.dynamicAvatarURL("webp", 4096)

        if (!user.avatar) {
            avatar = "[Default Avatar](" + user.defaultAvatarURL + ")"
        } else {
            avatar = "[JPG](" + avatarJpg + ") | [PNG](" + avatarPng + ") | [WEBP](" + avatarWebp + ")"
        }

        client.createMessage(msg.channel.id, {
            embed: {
                author: {
                    name: user.username,
                    icon_url: user.avatarURL
                },
                fields: [
                    { name: "Username", value: user.username + "#" + user.discriminator, inline: true },
                    { name: "Avatar URL", value: avatar, inline: true },
                    { name: "Creation Date", value: "<t:" + Math.round(user.createdAt / 1000) + ">", inline: true },
                    { name: "Badges", value: Object.entries(flagants).map(([f, v]) => (user.publicFlags & v) !== 0 ? f : null).filter(Boolean).join(" ") || 'This User Has No Badges', inline: true },
                    { name: "Type", value: (user.bot ? (user.publicFlags === 65536 ? "Bot, Verified" : "Bot, Unverified") : (user.publicFlags === 1024 ? "Team" : "Human")), inline: true }
                ],
                thumbnail: {
                    url: avatarJpg
                }
            },
            components: [{
                type: 1,
                components: [{
                    type: 2,
                    label: "Open Profile",
                    style: 5,
                    url: "discord:///users/" + user.id
                }]
            }]
        })
    }
}