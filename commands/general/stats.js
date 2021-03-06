module.exports = {
    name: 'stats',
    description: 'Shows Some Meta-Data About The Bot',
    category: 'Bot',
    aliases: ['info', 'statistics'],
    allowDMs: true,
    async execute(msg, args, client, Eris) {
        let memory = await client.nodeUtils.mem.info();
        let cpu = await client.nodeUtils.cpu.usage();
        return client.createMessage(msg.channel.id, {embeds: [
            {
                author: {
                    name: 'Stats',
                    icon_url: client.user.avatarURL
                },
                fields: [
                    {
                        name: 'General',
                        value: '\\ms\n\\โฑ๏ธ Uptime: ' + client.msToText(process.uptime() * 1000) + '\n\n\\โ๏ธ Commands: ' + client.commands.size + '\n\\๐ฅ Users: ' + client.users.filter(u => !u.bot).length.toLocaleString() + '\n\\๐๏ธ Servers: ' + client.guilds.size.toLocaleString() + '\n\n\\๐ Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.threads.size + guild.channels.size, 0).toLocaleString() + '\n\n\\๐ Text Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 0).length, 0).toLocaleString() + '\n\\๐ฃ๏ธ Voice Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 2).length, 0).toLocaleString() + '\n\\๐๏ธ Category Chnanels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 4).length, 0).toLocaleString() + '\n\\๐ฐ News Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 5).length, 0).toLocaleString() + '\n\\๐ Store Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 6).length, 0).toLocaleString() + '\n\\๐งต Thread Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.threads.size, 0).toLocaleString() + '\n\\๐ก Stage Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 13).length, 0).toLocaleString() + '\n\n\\๐ฆ Memory Usage: ' + (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + 'MB / ' + memory.totalMemMb.toFixed(2) + 'MB\n\\๐ CPU Usage: ' + cpu + '%'
                    },
                    {
                        name: 'Versions',
                        value: 'Node.JS Version: ' + process.version + '\n' + client.user.username + ' Version: v' + client.config.version + '\nEris Version: v' + Eris.VERSION
                    },
                    {
                        name: 'Developers',
                        value: 'Xenotic, Dancinted, Blitzuu, Gamer Omega'
                    }
                ],
                thumbnail: {
                    url: client.user.avatarURL
                },
                color: client.color()
            }
        ],
        components: [
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        label: 'Support Server',
                        style: 5,
                        url: 'https://discord.gg/Bv9BATghK9'
                    },
                    {
                        type: 2,
                        label: 'Invite',
                        style: 5,
                        url: 'https://discord.com/oauth2/authorize?client_id=' + client.application.id + '&scope=bot%20applications.commands&permissions=8'
                    },
                    {
                        type: 2,
                        label: 'Website',
                        style: 5,
                        url: 'https://ozzydiscord.glitch.me/'
                    }
                ]
            }
        ]})
    }
}
