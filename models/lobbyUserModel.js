const mongoose = require("mongoose");

const lobbyUserSchema = new mongoose.Schema({
  room: {
    type: String,
  },
  socketId: {
    type: String,
  },
});

const LobbyUser = mongoose.model("LobbyUser", lobbyUserSchema);
module.exports = LobbyUser;
