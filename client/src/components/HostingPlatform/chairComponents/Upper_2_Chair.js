/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@material-ui/core";
import { Popup } from "semantic-ui-react";
import socket from "../service/socket";
import { useParams } from "react-router";
import {
  getRTCTokenForJoiningTable,
  editCurrentlyJoinedChair,
} from "../../../actions";

const UPPER_2_CHAIR = ({ id, launchTableScreen }) => {
  const dispatch = useDispatch();

  const chair = useSelector((state) =>
    state.rooms.chairs.find((chair) => {
      return chair && chair.chairId
        ? chair.chairId === `${id}_chair_2` && chair.status === "Occupied"
          ? chair
          : null
        : null;
    })
  );

  const params = useParams();
  // console.log(params);

  let chairIsOccupied;
  let userName2;
  let userImage2;
  let userCity2;
  let userCountry2;
  let userOrganisation2;
  let userDesignation2;
  let displayPopUp = "auto";

  if (chair) {
    // What if chair_2 is occupied
    chairIsOccupied = true;

    userName2 = chair.userName;
    userImage2 = chair.userImage.startsWith("https://")
      ? chair.userImage
      : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${chair.userImage}`;
    userCity2 = chair.userCity;
    userCountry2 = chair.userCountry;
    userOrganisation2 = chair.userOrganisation;
    userDesignation2 = chair.userDesignation;
  } else {
    // What if chair_2 is not occupied
    chairIsOccupied = false;

    displayPopUp = "none";
  }

  const eventId = params.eventId;

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
    image.style.borderTopLeftRadius = "5px";
    image.style.borderTopRightRadius = "5px";
    image.id = `${id}_chair_2_img_blob`;

    if (imgURL) {
      document.getElementById(`${id}_chair_2_img`).appendChild(image);
    } else {
      let element = document.getElementById(`${id}_chair_2_img`);
      while (element.firstChild) {
        element.removeChild(element.firstChild);
      }
    }
  };

  useEffect(() => {
    if (userImage) {
      fetchImage(userImage2, id).catch((e) => {
        //   "There has been a problem with your fetch operation."
      });
    } else {
      if(document.getElementById(`${id}_chair_2_img_blob`)) {
        document.getElementById(`${id}_chair_2_img_blob`).remove();
      }
      
    }
  }, [userImage2, userImage, id]);

  const userId = useSelector((state) => state.user.userDetails._id);

  return (
    <>
      <div
        className="upper-chair-wrapper"
        id={`${id}_chair_2`}
        onClick={() => {
          dispatch(editCurrentlyJoinedChair(`${id}_chair_2`));

          socket.emit(
            "updateChair",
            {
              eventId,
              tableId: id,
              chairId: `${id}_chair_2`,
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

          dispatch(getRTCTokenForJoiningTable(id, userId, launchTableScreen));
        }}
      >
        <div
          className={`upper-chair chair pt-2 ${
            chairIsOccupied ? " " : "upper-chair-hover"
          }`}
        >
          <div style={{ transform: "translateY(-16.5px)" }}>
            <Popup
              trigger={
                <div
                  id={`${id}_chair_2_img`}
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
              position="top center"
            >
              <div style={{ display: displayPopUp }}>
                <div
                  className="d-flex flex-row align-items-center"
                  style={{ display: displayPopUp }}
                >
                  <Avatar
                    alt={userName2}
                    src={userImage2}
                    variant="rounded"
                    style={{ display: displayPopUp }}
                  />
                  <div className="ms-3" style={{ display: displayPopUp }}>
                    <div
                      className="btn-outline-text"
                      style={{ fontSize: "14px", display: displayPopUp }}
                    >
                      {userName2}
                    </div>
                    <div
                      className="people-headline"
                      style={{ display: displayPopUp }}
                    >
                      {userDesignation2} at {userOrganisation2}
                    </div>
                    <div
                      className="people-location"
                      style={{ display: displayPopUp }}
                    >
                      {userCity2}, {userCountry2}
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

export default UPPER_2_CHAIR;