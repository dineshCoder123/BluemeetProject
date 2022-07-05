import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Popup } from "semantic-ui-react";

const Container = styled.div`
  border-radius: 15px;
  background-color: #212121;

  video {
    object-fit: contain !important;
  }
`;

const Outer = styled.div`
  video {
    object-fit: contain !important;
  }
`;

const UserIdentity = styled.div`
  border-radius: 10px;
  background-color: #e9e9e923;

  font-weight: 500;
  font-size: 0.8rem;
  color: #bdb107;

  position: absolute;
  bottom: 16px;
  left: 16px;
`;

const ScreenTrackPlayer = ({ userId }) => {
  let isMe = false;
  const userDetails = useSelector((state) => state.user.userDetails);

  let uid = userId.slice(7);

  console.log(
    uid,
    "This is the extracted uid of the user who is sharing his/her screen"
  );

  if (uid === userDetails._id) {
    isMe = true;
  }

  const { registrations } = useSelector((state) => state.registration);

  const myRegistration = registrations.find(
    (element) => element.bookedByUser === uid
  );

  const name = myRegistration.userName;

  console.log(userId);

  return (
    <>
      <Container>
        <Outer
          style={{ height: "100%", width: "100%", borderRadius: "15px" }}
          id={userId}
        ></Outer>

        <Popup
          content={<div></div>}
          trigger={
            <UserIdentity className="d-flex flex-row align-items-center p-3">
              <span className="">
                {name} {isMe ? "(You)" : <></>}
              </span>
            </UserIdentity>
          }
        />
      </Container>
    </>
  );
};


export default ScreenTrackPlayer;