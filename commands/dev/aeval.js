function clean(text) {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
}

const Eris = require("eris")

module.exports = {
  name: "aeval",
  devOnly: true,

  async execute(args, client, msg) {
    try {
      const t1 = Date.now();
      let evaled = await eval(args.join(" "));
      const evalType = typeof evaled;
      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
      const t2 = Date.now();
      const durationContent = t2 - t1;
      if (evaled.length > 1000) {
        client.createMessage(msg.channel.id, '', {file: require('util').inspect(evaled), name: 'Output.txt'});
        evaled = evaled.substring(0, 1000) + "...";
      }
      const evalContent = clean(evaled);
      client.createMessage(msg.channel.id, {
        embed: {
          title: "Async Eval",
          fields: [
            { name: "**Output**", value: "```xl\n" + evalContent + "```" },
            { name: "**Type**", value: "```css\n" + evalType + "```" }],
          footer: { text: "Time Taken: " + durationContent + "ms" }
        }
      }).catch(err => {
        if (typeof err !== "string") err = require("util").inspect(err);
        client.createMessage(msg.channel.id, {
          embed: {
            title: "Async Eval",
            fields: [
              { name: "**Output**", value: "```xl\n" + clean(err) + "```" }
            ]
          }
        });
      });
    } catch (err) {
      if (typeof err !== "string") err = require("util").inspect(err);
      client.createMessage(msg.channel.id, {
        embed: {
          title: "Async Eval",
          fields: [
            { name: "**Output**", value: "```xl\n" + clean(err) + "```" }
          ]
        }
      });
    }
  }
};
