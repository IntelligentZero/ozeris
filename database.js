const mongoose = require("mongoose");
const config = require("./config.json");
module.exports = {
  init: () => {
    srv = config.srv;

    dbOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      connectTimeoutMS: 10000,
      family: 4
    };

    mongoose.connect(srv, dbOptions);
    mongoose.Promise = global.Promise;

    mongoose.connection.on("connected", () => {
      console.log("Connected to MongoDB");
    });
    mongoose.connection.on("disconnected", () => {
      console.log("Disconnected from MongoDB");
    });
    mongoose.connection.on("err", () => {
      console.log("There was an error when trying to connect to MongoDB" + "\n" + err);
    });
  }
};