const mongoose = require("mongoose");
const loggedInUsersSchema = new mongoose.Schema({
  userId: { type: String },
});

const LoggedInUsers = mongoose.model("LoggedInUsers", loggedInUsersSchema);
module.exports = LoggedInUsers;
