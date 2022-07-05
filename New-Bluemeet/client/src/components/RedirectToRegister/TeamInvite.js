import React, { useEffect } from "react";
import styled from "styled-components";
import BluemeetLOGO from "./../../assets/Logo/Bluemeet_LOGO_official.svg";
import Faker from "faker";
import { Avatar } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchInvitationDetails } from "./../../actions";
import history from "./../../history";
import Chip from "@mui/material/Chip";

const Paper = styled.div`
  height: auto;
  background-color: #f32f2f;
  text-align: center;
`;

const PaperGreen = styled.div`
  height: auto;
  background-color: #55940E;
  text-align: center;
`;

const NormalText = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #ffffff;
`;

const AttractiveText = styled.a`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #e2d40e;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #212121;
  }
`;

const StaticBanner = ({ communityName, status }) => {
  return (
    <>
      {status === "Accepted" ? (
        <PaperGreen className="py-2">
          <NormalText>
            You have already joined {communityName} community as a community
            manager.
          </NormalText>{" "}
        </PaperGreen>
      ) : (
        <Paper className="py-2">
          <NormalText>
            You have been invited to join as a community manager in{" "}
            {communityName} community.
          </NormalText>{" "}
          <AttractiveText>Create your account to get access.</AttractiveText>
        </Paper>
      )}
    </>
  );
};

const NavBar = styled.div`
  height: 7vh;
  background-color: #ffffff;
  border-bottom: 1px solid #ebebeb;
`;

const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #212121;
`;

const TextDescriptive = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #525252;
`;

const TextEmphasis = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  font-family: "Ubuntu";
  color: #db3a3a;
`;

const CreateAccountButton = styled.button`
  font-weight: 600;
  font-size: 1.2rem;
  width: 100%;
  font-family: "Ubuntu";
  color: #ffffff;
  border-radius: 15px;
`;

const CommunityTeamInvite = () => {
  const params = useParams();
  const dispatch = useDispatch();

  let communityName;
  let communityImage;
  let invitedUserEmail;
  let invitationStatus;

  const invitationId = params.invitationId;

  const { invitationDetails } = useSelector((state) => state.teamInvite);

  useEffect(() => {
    dispatch(fetchInvitationDetails(invitationId));
  }, []);

  if (invitationDetails) {
    communityName = invitationDetails.communityName;
    communityImage =
      invitationDetails.communityImage &&
      invitationDetails.communityImage.startsWith("https://")
        ? invitationDetails.communityImage
        : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${invitationDetails.communityImage}`;
    invitedUserEmail = invitationDetails.invitedUserEmail;
    invitationStatus = invitationDetails.status;
  }

  return (
    <>
      <StaticBanner
        communityName={communityName}
        status={invitationStatus}
      ></StaticBanner>

      <NavBar className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
        <img src={BluemeetLOGO} alt={"Bluemeet logo"} />
        <button
          onClick={() => {
            history.push("/");
          }}
          className="btn btn-outline-primary btn-outline-text"
        >
          Go to bluemeet.in
        </button>
      </NavBar>

      <div
        className="container d-flex flex-column align-items-center justify-content-center"
        style={{ height: "91vh" }}
      >
        <Avatar
          alt={communityName}
          style={{ height: "6rem", width: "6rem" }}
          src={communityImage}
          variant="rounded"
          className="mb-4"
        />

        <Heading className="mb-3">{communityName}</Heading>

        <TextDescriptive className="mb-3">
          You have been invited to join {communityName} as a community manager
          on Bluemeet. <br />{" "}
        </TextDescriptive>

        {invitationStatus === "Pending" ? (
          <TextEmphasis className="mb-5">
            Please create your account with this email {invitedUserEmail} to get
            stated.
          </TextEmphasis>
        ) : (
          <></>
        )}

        {invitationStatus === "Accepted" ? (
          <Chip
            label="Already accepted"
            color="success"
            style={{ width: "330px", fontWeight: "500" }}
          />
        ) : (
          <CreateAccountButton
            onClick={() => {
              history.push("/signup");
            }}
            className="btn btn-outline-text btn-primary"
            style={{ width: "330px" }}
          >
            Create my account
          </CreateAccountButton>
        )}
      </div>
    </>
  );
};

export default CommunityTeamInvite;
