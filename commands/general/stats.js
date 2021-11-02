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
                        value: '\\ms\n\\⏱️ Uptime: ' + client.msToText(process.uptime() * 1000) + '\n\n\\⚙️ Commands: ' + client.commands.size + '\n\\👥 Users: ' + client.users.filter(u => !u.bot).length.toLocaleString() + '\n\\🎚️ Servers: ' + client.guilds.size.toLocaleString() + '\n\n\\🏅 Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.threads.size + guild.channels.size, 0).toLocaleString() + '\n\n\\📃 Text Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 0).length, 0).toLocaleString() + '\n\\🗣️ Voice Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 2).length, 0).toLocaleString() + '\n\\🗂️ Category Chnanels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 4).length, 0).toLocaleString() + '\n\\📰 News Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 5).length, 0).toLocaleString() + '\n\\🛒 Store Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 6).length, 0).toLocaleString() + '\n\\🧵 Thread Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.threads.size, 0).toLocaleString() + '\n\\📡 Stage Channels: ' + client.guilds.reduce((acc, guild) => acc + guild.channels.filter(c => c.type === 13).length, 0).toLocaleString() + '\n\n\\🚦 Memory Usage: ' + (process.memoryUsage().rss / 1024 / 1024).toFixed(2) + 'MB / ' + memory.totalMemMb.toFixed(2) + 'MB\n\\🔌 CPU Usage: ' + cpu + '%'
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
