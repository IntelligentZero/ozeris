module.exports = {
  name: "reload",
  devOnly: true,

  async execute(args, client, msg) {
    if (!args[0]) return client.createMessage(msg.channel.id, "You need to provide a category!");
    if (!args[1]) return client.createMessage(msg.channel.id, "You need a provide a command!");

    const category = args[0].toLowerCase();
    const command = args[1].toLowerCase();

    try {
      delete require.cache[
        require.resolve(`../../commands/${category}/${command}.js`)
      ];
      client.commands.delete(command);

      pull = require(`../../commands/${category}/${command}.js`);
      client.commands.set(command, pull);

      return client.createMessage(msg.channel.id, `<a:TickYes_a:880550476414849025> \`${command}\` command has been reloaded!`);
    } catch (error) {
      return client.createMessage(msg.channel.id, `<a:TickNo_a:880551537217273906> Failed to reload \`${command}\` command!`);
    }
  }
};