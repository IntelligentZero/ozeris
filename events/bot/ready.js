module.exports = {
  name: "ready",
  execute(client) {
    console.log("Ready on " + client.user.username + "#" + client.user.discriminator + " client")
    client.shards.forEach(s => {
      setInterval(() => {
        duration = require("pretty-ms")(Math.trunc(process.uptime()) * 1000)
        s.editStatus({
          type: 3,
          name: duration + " uptime | " + client.guilds.size + " servers | " + s.latency + "ms ping | Shard " + (Number(s.id) + 1)
        });
      }, 15000);
    });
  }
};