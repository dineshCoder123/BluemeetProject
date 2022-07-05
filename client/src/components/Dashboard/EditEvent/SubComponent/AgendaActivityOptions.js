import React from "react";
import styled from "styled-components";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Dialog } from "@material-ui/core";

import VideoCameraBackRoundedIcon from '@mui/icons-material/VideoCameraBackRounded'; // Session
import CastConnectedRoundedIcon from '@mui/icons-material/CastConnectedRounded'; // Stream in
import ConnectWithoutContactRoundedIcon from '@mui/icons-material/ConnectWithoutContactRounded'; // Networking
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'; // Booth
import FreeBreakfastRoundedIcon from '@mui/icons-material/FreeBreakfastRounded'; // Break
import AddNewSession from "../FormComponents/EditSessionForms/AddNewSession";
import AddStreamInBluemeet from "../FormComponents/EditSessionForms/AddStreamInBluemeet";
import AddNewNetworking from "../FormComponents/EditSessionForms/AddNewNetworking";
import AddExhibitorInteraction from "../FormComponents/EditSessionForms/AddExhibitInteraction";
import AddNewBreak from "../FormComponents/EditSessionForms/AddNewBreak";

const StageToolsContainer = styled.div`
  min-height: 400px;
  background: #EEEEEE;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 16px;
`;

const ToolButton = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #464545;
  padding: 10px 12px;
  border-radius: 5px;
  border: 1px solid #5A5A5A;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    border: 1px solid #0c1c21;
    cursor: pointer;
    background-color: #fff;
  }
`;

const HeadlineWithCloseIcon = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  grid-gap: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  background: #F8F7F7;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`;

const ButtonOutlinedDark = styled.div`
  padding: 6px 10px;
  text-align: center;
  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";
  color: #5F5F5F;
  background-color: transparent;
  border: 1px solid #212121;
  border-radius: 5px;

  &:hover {
    background-color: #212121;
    color: #ffffff;
    cursor: pointer;
  }
`;

const AgendaActivityOptions = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [openSession, setOpenSession] = React.useState(false);
  const [openStreamIn, setOpenStreamIn] = React.useState(false);
  const [openNetworking, setOpenNetworking] = React.useState(false);
  const [openBooth, setOpenBooth] = React.useState(false);
  const [openBreak, setOpenBreak] = React.useState(false);

  const handleOpenSession = () => {
      setOpenSession(true);
  }
  const handleOpenStreamIn = () => {
      setOpenStreamIn(true);
  }
  const handleOpenNetworking = () => {
      setOpenNetworking(true);
  }
  const handleOpenBooth = () => {
      setOpenBooth(true);
  }
  const handleOpenBreak = () => {
      setOpenBreak(true);
  }

  const handleCloseSession = () => {
      setOpenSession(false);
  }
  const handleCloseStreamIn = () => {
      setOpenStreamIn(false);
  }
  const handleCloseNetworking = () => {
      setOpenNetworking(false);
  }
  const handleCloseBooth = () => {
      setOpenBooth(false);
  }
  const handleCloseBreak = () => {
      setOpenBreak(false);
  }

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        style={{minWidth: "none"}}
      >
        <HeadlineWithCloseIcon className="py-2">
          <div></div>
          <div style={{ textAlign: "center" }}>Choose activity type</div>
          <div></div>
        </HeadlineWithCloseIcon>
        <StageToolsContainer className="p-4">
          <ToolButton onClick={handleOpenSession}>
            <VideoCameraBackRoundedIcon
              style={{ fontSize: "48px" }}
              className="mb-3"
            />
            <div>Session</div>
          </ToolButton>
          <ToolButton onClick={handleOpenStreamIn}>
          <CastConnectedRoundedIcon
              style={{ fontSize: "48px" }}
              className="mb-3"
            />
            <div>Stream in Bluemeet</div>
          </ToolButton>
          <ToolButton onClick={handleOpenNetworking}>
            <ConnectWithoutContactRoundedIcon
              style={{ fontSize: "48px" }}
              className="mb-3"
            />
            <div> Networking </div>
          </ToolButton>
          <ToolButton onClick={handleOpenBooth}>
            <StorefrontRoundedIcon
              style={{ fontSize: "48px" }}
              className="mb-3"
            />
            <div>Exhibit hour</div>
          </ToolButton>
          <ToolButton
          onClick={handleOpenBreak}
            style={{
              gridColumnStart: "1",
              gridColumnEnd: "3",
              gridRowStart: "3",
              gridRowEnd: "10",
            }}
          >
             <FreeBreakfastRoundedIcon
              style={{ fontSize: "48px" }}
              className="mb-3"
            />
            <div>Break</div>
          </ToolButton>
        </StageToolsContainer>
        <div className="px-3 py-2" onClick={handleClose}>
          <ButtonOutlinedDark>Close</ButtonOutlinedDark>
        </div>
      </Dialog>
      <AddNewSession open={openSession} handleClose={handleCloseSession} />
      <AddStreamInBluemeet open={openStreamIn} handleClose={handleCloseStreamIn} />
      <AddNewNetworking open={openNetworking} handleClose={handleCloseNetworking} />
      <AddExhibitorInteraction open={openBooth} handleClose={handleCloseBooth} />
      <AddNewBreak open={openBreak} handleClose={handleCloseBreak} />
    </>
  );
};

export default AgendaActivityOptions;
