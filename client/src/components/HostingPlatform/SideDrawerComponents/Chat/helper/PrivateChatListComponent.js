import React, { useEffect, useState } from "react";
import "./../../../Styles/PeopleList.scss";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import PeopleList from "./PeopleList";
import { Avatar } from "@material-ui/core";
import PeopleProfile from "../../People/helper/PeopleProfile";
import { useDispatch, useSelector } from "react-redux";
import {
  getMyAllPersonalMessages,
  setPersonalChatConfig,
} from "../../../../../actions";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  medium: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const IndividualChatSummary = ({
  userId,
  name,
  image, // Its Just raw image key or maybe complete source
  org,
  des,
  lastMsg,
  lastTimeAgo,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  let imgUrl = image
    ? image.startsWith("https://")
      ? image
      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`
    : "#";

  return (
    <>
      <div
        className="mb-4 chat-summary py-2"
        onClick={() => {
          // Dispatch so user can see personal chat interface
          dispatch(setPersonalChatConfig(userId));
        }}
      >
        <div className="individual-chat-summary-container mb-2 px-3 ">
          <Avatar
            src={imgUrl}
            alt={name}
            className={classes.large}
            variant="rounded"
          />
          <div className="">
            <div
              className="chat-box-name"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              {name}
            </div>
            {org && des ? (
              <div
                style={{
                  fontWeight: "500",
                  color: "#4B4B4B",
                  fontSize: "0.75rem",
                }}
              >
                {des}, {org}
              </div>
            ) : (
              <></>
            )}
          </div>

          <div
            style={{
              justifySelf: "end",
              fontWeight: "500",
              color: "#4B4B4B",
              fontSize: "0.7rem",
            }}
          >
            {timeAgo.format(new Date(lastTimeAgo), "round")}
          </div>
        </div>

        <div className="chat-summary-msg-container px-3">
          <div></div>

          <div
            className="chat-box-name"
            style={{
              textTransform: "capitalize",
              fontFamily: "Ubuntu",
              fontWeight: "500",
              color: "#616161",
            }}
          >
            {lastMsg}
          </div>
        </div>
      </div>
      <PeopleProfile />
    </>
  );
};

const renderIndividualChatSummary = (
  personalChats,
  peopleInThisEvent,
  userId
) => {
  console.log(personalChats, peopleInThisEvent, userId);
  // We have to render cards for each receiver with his/her name/image/organisation/designation and last message

  let IndividualChats = []; // array of objects {userId, name, image, org, des, lastMsg, lastTimeAgo}

  let persons = []; // array of other persons than current user

  for (let element of personalChats) {
    // first check ki sender is me or other person

    if (element.senderId === userId) {
      // I am sender
      // Now check if persons array has reciver Id => if not push it
      if (!persons.includes(element.receiverId)) {
        persons.push(element.receiverId);
      }
    } else {
      // I am reciever
      // now check if persons array has sender Id => if not push it
      if (!persons.includes(element.senderId)) {
        persons.push(element.senderId);
      }
    }

    console.log(persons);

    // Now at this point persons array will have unique contacts userIds

    // Now map over every contact and find their doc in peopleInThisEvent and also get their last msg from personal chats and make a object out of these details and push it into Individual chats
  }

  for (let element of persons) {
    let last_message_of_this_contact;
    let last_message_time_ago;
    const contactDetails = peopleInThisEvent.find(
      (el) => el.userId === element
    );

    for (let item of personalChats) {
      if (item.senderId === element || item.receiverId === element) {
        last_message_of_this_contact = item.textMessage;
        last_message_time_ago = item.createdAt;
      }
    }

    console.log(contactDetails);

    // Now at this point we will get details of each unique contact and their last message and last time ago so make an object and push it into individual chats

    if (contactDetails) {
      IndividualChats.push({
        userId: contactDetails.userId,
        name: contactDetails.userName,
        image: contactDetails.userImage,
        org: contactDetails.userOrganisation,
        des: contactDetails.userDesignation,
        lastMsg: last_message_of_this_contact,
        lastTimeAgo: last_message_time_ago,
      });
    }

    // {userId, name, image, org, des, lastMsg, lastTimeAgo}
  }

  // here we have an array of individual chats to be rendered with userId, userName, userImg, userOrg, userDes, lastMsg, lastTimeAgo

  return IndividualChats.map((item) => {
    return (
      <IndividualChatSummary
        userId={item.userId}
        name={item.name}
        image={item.image}
        org={item.org}
        des={item.des}
        lastMsg={item.lastMsg}
        lastTimeAgo={item.lastTimeAgo}
      />
    );
  });
};

const PrivateChatListComponent = () => {
  const userId = useSelector((state) => state.eventAccessToken.id);
  const { peopleInThisEvent } = useSelector((state) => state.user);
  const personalChats = useSelector((state) => state.personalChat.chats);
  const dispatch = useDispatch();

  //  Fetch all personal messages of this user in which he / she is a sender or receiver

  useEffect(() => {
    dispatch(getMyAllPersonalMessages(userId));
  }, []);

  const [openPeopleList, setOpenPeopleList] = useState(false);

  const handleClosePeopleList = () => {
    setOpenPeopleList(false);
  };

  const classes = useStyles();
  return (
    <>
      <div className="chat-msg-container pt-2 px-2 d-flex flex-column justify-content-between">
        <div>
          <div className="ui icon input mb-3" style={{ width: "100%" }}>
            <input
              type="text"
              placeholder="Search people..."
              className="form-control"
            ></input>
            <SearchRoundedIcon style={{position: "absolute", right: "10px", top: "10px", color: "#757575"}} />
          </div>
          {/* //  TODO  */}
          <div className="individual-chat-summary-list">
            {renderIndividualChatSummary(
              personalChats,
              peopleInThisEvent,
              userId
            )}
          </div>
        </div>
        <div className={classes.root} style={{ textAlign: "end" }}>
          <Fab
            onClick={() => {
              setOpenPeopleList(true);
            }}
            color="primary"
            aria-label="add"
            style={{ backgroundColor: "#538BF7" }}
          >
            <AddIcon />
          </Fab>
        </div>
      </div>

      <PeopleList open={openPeopleList} handleClose={handleClosePeopleList} />
    </>
  );
};

export default PrivateChatListComponent;
