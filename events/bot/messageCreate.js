const { defaultPrefix, ownerID } = require("../../config.json");
const blacklist = require("../../schemas/blacklist");

module.exports = {
  name: "messageCreate",
  async execute(msg, client) {
    blacklistData = await blacklist.findOne({
      UserID: msg.author.id
    });
    if (blacklistData) return
    if (!blacklistData) {
      if (msg.author.bot) return;
      if (!msg.member.guild) return;

      args = msg.content
        .slice(defaultPrefix.length)
        .trim()
        .split(/ +/);

      if (!msg.content.toLowerCase().startsWith(defaultPrefix)) return;
      try {
        if (!msg.channel.permissionsOf(client.user.id).json.sendMessages) return client.users.get(msg.author.id).getDMChannel().then(c => c.createMessage("I don't have permission to send messages in <#" + msg.channel.id + ">")).catch(() => null)
      } catch (error) {
        console.log(() => null)
      }
      commandDefault = args.shift().toLowerCase();
      cmmdDefault = client.commands.get(commandDefault) || client.commands.find(a => a.aliases && a.aliases.includes(commandDefault));
      if (!cmmdDefault) return;
      if (cmmdDefault.devOnly === true && !ownerID.includes(msg.author.id)) return;
      try {
        cmmdDefault.execute(args, client, msg);
      } catch (error) {
        console.log(error)
        client.createMessage(msg.channel.id, "There was an error when trying to run this command!"
        );
      }
    }
  }
}