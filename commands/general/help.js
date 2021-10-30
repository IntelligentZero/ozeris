module.exports = {
  name: "help",
  execute(args, client, msg) {
    client.createMessage(msg.channel.id, "```setautorole - Set an auto role\nsetmodlogs - Set mod logs channel\nhelp - Show this menu\nping - Show client latency\ncalculate - Calculate\nserverinfo- Show server informations\nuserinfo- Show an user informations```")
  }
};