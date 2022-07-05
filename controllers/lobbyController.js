const users = [];
const sessions = [];
const sessionUsers = [];
let stageMembers = 0;
const Rooms = [];

const mongoose = require("mongoose");
const Event = require("../models/eventModel");
const UsersInSession = require("../models/usersInSessionModel");
const UsersInEvent = require("./../models/usersInEventModel");
// const UserInEvent = require("./../models/usersInEventModel");

// Add session (setting status to started)

const addSession = ({ id, sessionStatus, sessionId, room }) => {
  //   name = name.trim().toLowerCase();
  //   room = room.trim().toLowerCase();

  const existingSession = sessions.find(
    (session) => session.room === room && session.sessionId === sessionId
  );

  if (!room || !sessionId) return { error: "sessionId and room are required." };
  // if(existingSession) return { error: 'Session is taken.' };

  const session = { id, sessionStatus, sessionId, room };

  if (!existingSession) {
    sessions.push(session);
  }

  return { session };
};

// Update session (setting status to paused)

const updateSession = ({ id, sessionStatus, sessionId, room }) => {
  //   name = name.trim().toLowerCase();
  //   room = room.trim().toLowerCase();

  const existingSession = sessions.find(
    (session) => sesasion.room === room && session.sessionId === sessionId
  );

  if (!room || !sessionId) return { error: "sessionId and room are required." };
  if (existingSession) {
    existingSession.sessionStatus = sessionStatus;
  }

  return { existingSession };
};

// Remove session (setting status to ended)

const removeSession = (id) => {

  const index = sessions.findIndex((session) => session.id === id);

  if (index !== -1) return sessions.splice(index, 1)[0];
};

const removeUser = async (userId, eventId) => {
  await UsersInEvent.findOneAndUpdate(
    {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { room: mongoose.Types.ObjectId(eventId) },
      ],
    },
    { status: "Inactive" },
    { new: true },
    (err, doc) => {
      if(err) {
       
      }
      else {
      
        return doc;
      }
    }
  );
};

const removeUserFromSession = async (userId, sessionId) => {
  await UsersInSession.findOneAndUpdate(
    {
      $and: [
        { userId: mongoose.Types.ObjectId(userId) },
        { room: mongoose.Types.ObjectId(sessionId) },
      ],
    },
    { status: "Inactive" },
    { new: true },
    (err, doc) => {
      if (err) {
      
      } else {
     
        return doc;
      }
    }
  );
};

const getSessionsInRoom = (room) =>
  sessions.filter((session) => session.room === room);

const addUserInSession = ({ id, userId, room, role }) => {
  //   name = name.trim().toLowerCase();
  //   room = room.trim().toLowerCase();

  const existingUser = sessionUsers.find(
    (user) => user.room === room && user.userId === userId
  );

  if (!room || !userId) return { error: "userId and room are required." };
  // if(existingUser) return { error: 'Username is taken.' };

  const sessionUser = { id, userId, room, role };
  if (role === "host" || role === "speaker") {
    stageMembers += 1;
  }

  if (!existingUser) {
    sessionUsers.push(sessionUser);
  }

  return { sessionUser };
};

// const removeUser = (id) => {

//   const index = users.findIndex((user) => user.id === id);



//   if (index !== -1) return users.splice(index, 1)[0];
// };
//const removeUser = (id) => users.filter((user) => user.id !== id);

const getUser = (id) => users.find((user) => user.id === id);

// const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getUsersInSession = (room) =>
  sessionUsers.filter((sessionUser) => sessionUser.room === room);

const getStageMembers = () => stageMembers;

module.exports = {
  removeUser,
  getUser,
  addSession,
  updateSession,
  getSessionsInRoom,
  getStageMembers,
  addUserInSession,
  getUsersInSession,
  removeSession,
  removeUserFromSession,
};
