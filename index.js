Eris = require("eris");

const { token, shards } = require("./config.json");
const database = require("./database");

const client = new Eris(token, { maxShards: shards, intents: 14271, restMode: true, messageLimit: 0 });
client.commands = new Eris.Collection();
client.events = new Eris.Collection();

require("./handlers/main")(client);
client.connect();
database.init();

process.on("unhandledRejection", error => console.error(error));
process.on("uncaughtException", error => console.error(error));