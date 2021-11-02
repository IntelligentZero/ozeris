module.exports = {
    name: "privacypolicy",
    execute(args, client, msg) {
      client.createMessage(msg.channel.id, {embeds: [
        {
         
            title: 'Ozzy\'s Privacy Policy',
            description: 'Read the following to know what we do with your data.',
            fields: [{
                name: 'Can the developer read the data?',
                value: '**No. The developer can NOT read the data.**',
                inline: true
                }, {
                name: 'What is used?',
                value: '**User ID\'s, Server ID\'s, Message ID\'s, the timestamp when you ran the command, Username and discriminator, When the bot joined the server, Amount of members in the server.**',
                inline: true
                }, {
                name: 'What do we do with your data?',
                value: '**We use the data for operations of the commands. All data is used only for the bot, and we do not collect data that is not needed for the bot to operate.**',
                inline: true
                }, {
                name: 'How do I delete my data?',
                value: '**Contact the developers, they will assist you from there.**',
                inline: true
                }
  
            ]
            
            }]})
  }};
