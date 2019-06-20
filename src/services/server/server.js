const http = require("../http");
require("../ws");

const { serverPort } = require("../../config/serverSettings");

const app = require("../express");
const port = serverPort;

//const { initActiveServers } = require("../../models/robotServer"); UNDO
//const { initActiveChats } = require("../../models/chatRoom"); UNDO

//Initalize Active Servers:
//This is used for storing active users on a server
//initActiveServers(); UNDO
//initActiveChats(); UNDOs

//run server
const server = http.listen(port, () => {
  if (app.get("env") === "test") return;
  console.log(`Server listening on port ${port}!`);
});

server.on("close", () => {
  console.log("Closed express server");

  db.pool.end(() => {
    console.log("Shut down connection pool");
  });
});
