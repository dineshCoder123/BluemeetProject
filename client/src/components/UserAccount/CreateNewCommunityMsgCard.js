import React from "react";
import "./../../assets/css/UserAccountStyle.css";

const CreateNewCommunityMsgCard = ({msgText, img}) => {
  return (
    <>
      <div
        className="create-new-community-msg-container p-5"
        style={{ textAlign: "center" }}
      >
        <img
          src={img}
          style={{ maxHeight: "100px", maxWidth: "100px" }}
          alt="create community"
        />

        <div className="create-your-community-text">
          {msgText}
        </div>
      </div>
    </>
  );
};

export default CreateNewCommunityMsgCard;
