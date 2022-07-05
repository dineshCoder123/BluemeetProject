import React from "react";
import { Avatar } from "@material-ui/core";
import Faker from 'faker';


const IncomingMsgBox = {
    width: "75%",
    borderTopRightRadius: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
    backgroundColor: "#8888882D",
    // marginTop: "4rem",
}

const IncomingMsgText = {
    fontWeight: "400",
    color: "#4B4B4B",
    fontFamily: "Ubuntu",
    fontSize: "0.9rem",
    
}

const IncomingChat = () => {
  return (
    <>
    <div className="d-flex flex-row align-items-center">
    {/* <Avatar src={Faker.image.avatar()} variant="rounded"/> */}
      <div className="incoming-message px-3 py-2" style={IncomingMsgBox}>
          
        <div className="incoming-text" style={IncomingMsgText}>Hi there</div>
      </div>
    </div>
    
    </>
  );
};

export default IncomingChat;
