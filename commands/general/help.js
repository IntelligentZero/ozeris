module.exports = {
  name: "help",
  execute(args, client, msg) {
    client.createMessage(msg.channel.id, {embeds: [
      {
       
        title: 'Help Page!',
                description: 'Autorole:\nsetautorole - Set an auto role\nLogging:\nsetmodlogs - Set mod logs channel\nGeneral:\nhelp - Show this menu\nping - Show client latency\nUtility:\ncalculate - Calculate\nserverinfo - Show server informations\nuserinfo - Show user information\ntoken - Shows the start of the user\'s token. (User ID in base64. Will be incorrect if user has 2FA.)\nBot:\nprivacypolicy - Shows the privacypolicy of the bot.',
                color: client.color()

      }
    ]
    })
}};
