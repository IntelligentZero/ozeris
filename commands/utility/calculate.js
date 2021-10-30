module.exports = {
  name: "calculate",
  execute(args, client, msg) {
    result = require("easy-calculation").calculate(args.join(" "), true)
    if (!args.join(" ")) return client.createMessage(msg.channel.id, {
      embed: {
        title: "Error",
        description: "```diff\n- No Calculation Provided```"
      }
    })
    client.createMessage(msg.channel.id, {
      embed: {
        title: "**Calculator**",
        fields: [
          { name: "**Input**", value: args.join(" ").length > 1000 ? "```xl\nProvided Calculation Length is Too Long```" : "```" + args.join(" ") + "```"},
          { name: "**Result**", value: "```xl\n" + result + "```" }
        ]
      }
    })
  }
};