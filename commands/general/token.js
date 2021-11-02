module.exports = {
    name: "token",
    execute(args, client, msg) {
      client.createMessage(msg.channel.id, {embeds: [
        {
         
          title: 'Start of the token! (User\'s ID in base64) (Incorrect with 2FA)',
                  description: Buffer.from(msg.author.id).toString("base64"),
                  color: client.color()
  
        }
      ]
      })
  }};
