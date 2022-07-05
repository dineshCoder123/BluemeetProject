/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editCurrentlyJoinedChair,
  getRTCTokenForJoiningBoothTable,
} from "./../../../../../actions";
import { Avatar } from "@material-ui/core";
import { Popup } from "semantic-ui-react";
import socket from "../../../service/socket";
import { useParams } from "react-router";

const Chair_8 = ({ id, launchTableScreen }) => {
  const dispatch = useDispatch();

  const chair = useSelector((state) =>
    state.boothChairs.chairs.find((chair) => {
      return chair && chair.chairId
        ? chair.chairId === `${id}_chair_8` && chair.status === "Occupied"
          ? chair
          : null
        : null;
    })
  );

  let chairIsOccupied;
  let userName8;
  let userImage8;
  let userCity8;
  let userCountry8;
  let userOrganisation8;
  let userDesignation8;
  let displayPopUp = "auto";
  let displayAvatar = "auto";

  if (chair) {
    // This is the case in which chair is occupied
    chairIsOccupied = true;
    userName8 = chair.userName;
    userImage8 = chair.userImage.startsWith("https://")
      ? chair.userImage
      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chair.userImage}`;
    userCity8 = chair.userCity;
    userCountry8 = chair.userCountry;
    userOrganisation8 = chair.userOrganisation;
    userDesignation8 = chair.userDesignation;
  } else {
    // What if chair_8 is not occupied
    chairIsOccupied = false;
    displayPopUp = "none";
  }

  const params = useParams();

  const eventId = params.eventId;
  const { currentBoothId } = useSelector((state) => state.booth);

  const { userDetails } = useSelector((state) => state.user);

  const { role } = useSelector((state) => state.eventAccessToken);

  const userName = `${userDetails.firstName} ${userDetails.lastName}`;
  const userImage = userDetails.image && userDetails.image;
  const userCity = userDetails.city && userDetails.city;
  const userCountry = userDetails.country && userDetails.country;
  const userOrganisation = userDetails.organisation && userDetails.organisation;
  const userDesignation = userDetails.designation && userDetails.designation;

  const fetchImage = async (imgURL, id) => {
    let response = await fetch(imgURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let myBlob = await response.blob();

    let objectURL = URL.createObjectURL(myBlob);

    let image = document.createElement("img");
    image.src = objectURL;
    image.style.width = "50px";
    image.style.height = "35px";
    image.style.objectFit = "cover";
    image.style.borderTopLeftRadius = "5px";
    image.style.borderBottomLeftRadius = "5px";
    image.id = `${id}_chair_8_img_blob`;

    if (imgURL) {
      document.getElementById(`${id}_chair_8_img`).appendChild(image);
    } else {
      let element = document.getElementById(`${id}_chair_8_img`);
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  };

  useEffect(() => {
    if (userImage8) {
      fetchImage(userImage8, id).catch((error) => {
      });
    } else {
      if (document.getElementById(`${id}_chair_8_img_blob`)) {
        document.getElementById(`${id}_chair_8_img_blob`).remove();
      }
    }
  }, [userImage8, id]);

  const userId = userDetails._id;

  return (
    <>
      <div
        className="left-chair-wrapper"
        id={`${id}_chair_8`}
        onClick={() => {
          dispatch(editCurrentlyJoinedChair(`${id}_chair_8`));

          socket.emit(
            "updateBoothChair",
            {
              eventId,
              boothId: currentBoothId,
              tableId: id,
              chairId: `${id}_chair_8`,
              userName,
              userId,
              userRole: role,
              userEmail: userDetails.email,
              userImage,
              userCity,
              userCountry,
              userOrganisation,
              userDesignation,
              status: "Occupied",
            },
            (error) => {
              if (error) {
                alert(error);
              }
            }
          );

          dispatch(
            getRTCTokenForJoiningBoothTable(id, userId, launchTableScreen)
          );
        }}
      >
        <div
          className={`left-chair chair pt-2 ${
            chairIsOccupied ? " " : "left-chair-hover"
          }`}
        >
          {/* <PeopleGridAvatar /> */}

          <div style={{ transform: "translate(-8px, -8px)" }}>
            <Popup
              trigger={
                <div
                  id={`${id}_chair_8_img`}
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                ></div>
              }
              position="top center"
            >
              <div style={{ display: displayPopUp }}>
                <div
                  className="d-flex flex-row align-items-center"
                  style={{ display: displayPopUp }}
                >
                  <Avatar
                    alt={userName8}
                    src={userImage8}
                    variant="rounded"
                    style={{ display: displayPopUp }}
                  />
                  <div className="ms-3" style={{ display: displayPopUp }}>
                    <div
                      className="btn-outline-text"
                      style={{ fontSize: "14px", display: displayPopUp }}
                    >
                      {userName8}
                    </div>
                    <div
                      className="people-headline"
                      style={{ display: displayPopUp }}
                    >
                      {userDesignation8} at {userOrganisation8}
                    </div>
                    <div
                      className="people-location"
                      style={{ display: displayPopUp }}
                    >
                      {userCity8}, {userCountry8}
                    </div>
                  </div>
                </div>
              </div>
            </Popup>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chair_8;
