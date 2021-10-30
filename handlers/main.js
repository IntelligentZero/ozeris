module.exports = client => {
  ["event", "command"].forEach(e => {
    require("./" + e + "Handler.js")(client);
  });
};