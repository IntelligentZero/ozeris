module.exports = {
    name: "shardReady",
    execute(shard) {
        console.log("Shard " + (Number(shard) + 1) + " launched");
    }
};