import React from 'react';
import { Avatar } from '@material-ui/core';
import "./../../../Styles/root.scss";

const ChatMsgElement = (props) => {
    return (
        <>
            <div className="chat-msg-element py-2">
              <div className="d-flex flex-row align-items-center">
                <Avatar src={props.image} alt={props.name} variant="rounded" />
                <div className="chat-box-name ms-3" style={{color: "#ffffff"}}>
                  {props.name}
                </div>
              </div>
              <div className="chat-msg-text ms-5 px-2" style={{color: "#ffffff"}}>
                  {props.msgText}
              </div>
            </div>
        </>
    );
}

export default ChatMsgElement;