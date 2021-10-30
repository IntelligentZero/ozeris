module.exports = {
  name: "ping",
  execute(args, client, msg) {
    t1 = Date.now();
    client.createMessage(msg.channel.id, "Pinging...").then(msg => {
      t2 = Date.now();
      pingContent = t2 - t1;
      msg.edit({
        content: "",
        embed: {
          fields: [
            { name: "**Latency**", value: "```arm\n" + msg.channel.guild.shard.latency + "ms WebSocket\n" + pingContent + "ms Message Edit```" },
            { name: "**Shards Statistics**", value: "```arm\n" + client.shards.map(s => "[ Shard #" + (Number(s.id + 1)) + " ]: Latency: " + s.latency + "ms \n              Status: " + s.status).join("\n") + "```" },
          ]
        }
      });
    });
  }
};