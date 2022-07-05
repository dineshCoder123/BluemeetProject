/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";

import { Popup } from "semantic-ui-react";
import socket from "../service/socket";
import { useParams } from "react-router";
import { getRTCTokenForJoiningTable, editCurrentlyJoinedChair } from "../../../actions";

const LOWER_5_CHAIR = ({ id, launchTableScreen }) => {
  const dispatch = useDispatch();

  const chair = useSelector((state) =>
    state.rooms.chairs.find((chair) => {
      return chair && chair.chairId
        ? chair.chairId === `${id}_chair_5` && chair.status === "Occupied"
          ? chair
          : null
        : null;
    })
  );

  let chairIsOccupied;
  let userName5;
  let userImage5;
  let userCity5;
  let userCountry5;
  let userOrganisation5;
  let userDesignation5;
  let displayPopUp = "auto";
  // let displayAvatar = "auto";

  if (chair) {
    // What if chair_5 is occupied
    chairIsOccupied = true;

    userName5 = chair.userName;
    userImage5 = chair.userImage.startsWith("https://")
      ? chair.userImage
      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chair.userImage}`;
    userCity5 = chair.userCity;
    userCountry5 = chair.userCountry;
    userOrganisation5 = chair.userOrganisation;
    userDesignation5 = chair.userDesignation;
  } else {
    // What if chair_5 is not occupied
    chairIsOccupied = false;
    displayPopUp = "none";
  }

  const fetchImage = async (imgURL, id) => {
    let response = await fetch(imgURL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let myBlob = await response.blob();

    let objectURL = URL.createObjectURL(myBlob);

    let image = document.createElement("img");
    image.src = objectURL;
    image.style.width = "40px";
    image.style.height = "35px";
    image.style.objectFit = "cover";
    image.style.borderBottomLeftRadius = "5px";
    image.style.borderBottomRightRadius = "5px";
    image.id = `${id}_chair_5_img_blob`;

    if (imgURL) {
      document.getElementById(`${id}_chair_5_img`).appendChild(image);
    } else {
      let element = document.getElementById(`${id}_chair_5_img`);
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  };

  const userDetails = useSelector((state) => state.user.userDetails);

  const { role } = useSelector((state) => state.eventAccessToken);

  const userName = `${userDetails.firstName} ${userDetails.lastName}`;

  const userImage = userDetails.image && userDetails.image;
  const userCity = userDetails.city && userDetails.city;
  const userCountry = userDetails.country && userDetails.country;
  const userOrganisation = userDetails.organisation
    && userDetails.organisation;
  const userDesignation = userDetails.designation
    && userDetails.designation;

  useEffect(() => {
    if (userImage) {
      fetchImage(userImage5, id).catch((e) => {
        //   "There has been a problem with your fetch operation."
      });
    } else {
      if(document.getElementById(`${id}_chair_5_img_blob`)) {
        document.getElementById(`${id}_chair_5_img_blob`).remove();
      }
      
    }
  }, [userImage5, id, userImage]);

  const params = useParams();
  // console.log(params);

  const eventId = params.eventId;
  const userId = userDetails._id;

  return (
    <>
      <div
        className="lower-chair-wrapper"
        id={`${id}_chair_5`}
        onClick={() => {
          dispatch(
            editCurrentlyJoinedChair(`${id}_chair_5`)
          );

          socket.emit(
            "updateChair",
            {
              eventId,
              tableId: id,
              chairId: `${id}_chair_5`,
              userId,
              userName,
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
          dispatch(getRTCTokenForJoiningTable(id, userId, launchTableScreen));
        }}
      >
        <div className={`lower-chair chair pt-2 ${chairIsOccupied ? " " : "lower-chair-hover"}`}>
          <div style={{ transform: "translateY(0)" }}>
            <Popup
              trigger={
                <div
                  id={`${id}_chair_5_img`}
                  style={{
                    position: "relative",
                    top: "0",
                    left: "0",
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                ></div>
              }
              position="bottom center"
            >
              <div style={{ display: displayPopUp }}>
                <div
                  className="d-flex flex-row align-items-center"
                  style={{ display: displayPopUp }}
                >
                  <Avatar
                    alt={userName5}
                    src={userImage5}
                    variant="rounded"
                    style={{ display: displayPopUp }}
                  />
                  <div className="ms-3" style={{ display: displayPopUp }}>
                    <div
                      className="btn-outline-text"
                      style={{ fontSize: "14px", display: displayPopUp }}
                    >
                      {userName5}
                    </div>
                    <div
                      className="people-headline"
                      style={{ display: displayPopUp }}
                    >
                      {userDesignation5} at {userOrganisation5}
                    </div>
                    <div
                      className="people-location"
                      style={{ display: displayPopUp }}
                    >
                      {userCity5}, {userCountry5}
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

export default LOWER_5_CHAIR;
