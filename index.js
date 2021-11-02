Eris = require("eris");

const { token, shards } = require("./config.json");
const database = require("./database");

const client = new Eris(token, { maxShards: shards, intents: 14271, restMode: true, messageLimit: 0 });
client.commands = new Eris.Collection();
client.events = new Eris.Collection();
client.color = function() {
    return Math.floor(Math.random() * (0xffffff + 1));
};
require("./handlers/main")(client);
client.connect();
database.init();

const Erelajs = require("erela.js")

const Manager = new Erelajs.Manager({
    nodes : [
        {

        host: "lava.link",
        port: 80,
        password: "findout",

        }
    ],
    send(id, payload){
        const guild = client.guilds.get(id);
        if (guild) {
            guild.shard.sendWS(payload.op, payload.d);
        }
    }
})

Manager.on("nodeConnect", (node) => {
    console.log("Lavalink node connected.")
})

process.on("unhandledRejection", error => console.error(error));
process.on("uncaughtException", error => console.error(error));

client.manager = Manager
