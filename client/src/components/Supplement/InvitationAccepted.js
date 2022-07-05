import React, { useEffect } from "react";
import styled from "styled-components";
import BluemeetLogo from "./../../assets/Logo/light.svg";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { acceptInvitation, fetchInvitationDetails } from "./../../actions";

const Nav = styled.div`
  background-color: #525f7f;
  height: 7vh;
  width: 100%;
`;

const CenteredPaper = styled.div`
  border-radius: 10px;
  background-color: #525f7f;
  height: 400px;
  width: 558px;
`;

const MsgText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #ffffff;
`;

const InvitationAccepted = () => {
  const params = useParams();

  const InvitationId = params.inviteId;

  const { invitationDetails } = useSelector((state) => state.teamInvite);

  useEffect(() => {
    dispatch(fetchInvitationDetails(InvitationId));
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(acceptInvitation(InvitationId));
  }, []);

  let communityName;
  let invitedUserEmail;

  if (invitationDetails) {
    communityName = invitationDetails.communityName;

    invitedUserEmail = invitationDetails.invitedUserEmail;
  }

  return (
    <>
      <Nav className="py-2 px-4 d-flex flex-row align-items-center">
        <img src={BluemeetLogo} alt="Logo" />
      </Nav>

      <div
        style={{ height: "93vh" }}
        className="d-flex flex-row align-items-center justify-content-center"
      >
        <CenteredPaper className="px-4 py-3 d-flex flex-column align-items-center justify-content-center">
          <CheckCircleRoundedIcon
            style={{ color: "#90EE7D", fontSize: "100px" }}
            className="mb-3"
          />

          <MsgText size="1.1rem" className="mb-4">
            Congratulations!
          </MsgText>

          <MsgText
            className="mb-5"
            style={{ maxWidth: "300px", textAlign: "center" }}
          >
            You have successfully accepted invitation to join {communityName} community.
          </MsgText>

          <MsgText
            style={{
              maxWidth: "300px",
              textAlign: "center",
              color: "#F0E114",
            }}
          >
            Please log in using <br /> {invitedUserEmail} to access this community.
          </MsgText>
        </CenteredPaper>
      </div>
    </>
  );
};

export default InvitationAccepted;
