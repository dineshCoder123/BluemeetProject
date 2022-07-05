import React from "react";
import { IconButton } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";

import "./../../Styles/root.scss";
// import AllChatsComponent from "./helper/AllChatsComponent";

import { Dropdown } from "semantic-ui-react";
import PeopleGridAvatar from "../../SideDrawerComponents/People/helper/peopleGridAvatar";
import { useSelector } from "react-redux";

const DropdownIcon = () => (
  <Dropdown
    text="Grid"
    icon="grid layout"
    floating
    labeled
    button
    className="icon"
  >
    <Dropdown.Menu>
      <Dropdown.Item icon="list layout" text="List" />
      <Dropdown.Item icon="grid layout" text="Grid" />
    </Dropdown.Menu>
  </Dropdown>
);

const PeopleInSession = (props) => {
  const currentlyInEvent = useSelector((state) => state.user.peopleInThisEvent);

  const renderPeopleList = (people) => {
    return people.map((person) => {
      return (
        <PeopleGridAvatar
          image={
            person.userImage.startsWith("https://lh3.googleusercontent.com")
              ? person.userImage
              : `https://evenz-img-234.s3.ap-south-1.amazonaws.com/${person.userImage}`
          }
          name={person.userName}
          designation={person.userDesignation}
          organisation={person.userOrganisation}
          city={person.userCity}
          country={person.userCountry}
        />
      );
    });
  };

  return (
    <>
      <div style={{ height: "73vh", width: "90%", margin: "0 auto" }}>
        {/* here comes people component */}

        <div className="chat-msg-container people-in-session-container pt-2 px-2 mt-3" style={{backgroundColor: "#8A8A8A71"}}>
          <div className="search-box-and-view-switch-container d-flex flex-row justify-content-between mb-3">
            <input
              type="text"
              className="form-control chat-input me-2"
              placeholder="Search people ..."
            />
            <DropdownIcon />
          </div>
          <div className="people-list-grid">
            {renderPeopleList(currentlyInEvent)}
          </div>
          {/* Avatar */}
        </div>
      </div>
    </>
  );
};

export default PeopleInSession;
