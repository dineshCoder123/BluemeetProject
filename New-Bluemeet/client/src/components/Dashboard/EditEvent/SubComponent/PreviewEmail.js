import React from "react";
import styled from "styled-components";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";

import Select from "react-select";

import SendRoundedIcon from "@mui/icons-material/SendRounded";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import SendTestEmail from "./SendTestEmail";
import EmailConfirmation from "./EmailConfirmation";
import { useSelector } from "react-redux";

import { stateToHTML } from "draft-js-export-html";
import { convertFromRaw } from "draft-js";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
  }),
};

const Container = styled.div`
  background-color: transparent;
  height: 80vh;
`;

const TextDescriptive = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #494949;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #494949;
`;

const MailContainer = styled.div`
  background-color: #ffffff70;
  min-height: 500px;
  min-height: 450px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #d1d1d1;
  max-width: 768px;
`;

const PreviewEmail = ({ open, handleClose }) => {
  let Attendees = [];

  const { registrations } = useSelector((state) => state.registration);

  for (let element of registrations) {
    Attendees.push({ label: element.userName, value: element._id });
  }

  const { mailDetails } = useSelector((state) => state.mail);

  const [openSendTestEmail, setOpenSendTestEmail] = React.useState(false);

  const [openEmailConfirmation, setOpenEmailConfirmation] =
    React.useState(false);

  const handleCloseSendTestEmail = () => {
    setOpenSendTestEmail(false);
  };

  const handleCloseEmailConfirmation = () => {
    setOpenEmailConfirmation(false);
  };

  const convertFromJSONToHTML = (text) => {
    console.log(JSON.parse(text));
    return stateToHTML(convertFromRaw(JSON.parse(text).editingComment));
  };

  if (!mailDetails) {
    return;
  }

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#538BF7" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <KeyboardBackspaceRoundedIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Mail Preview
            </Typography>
            <button
              onClick={() => {
                setOpenSendTestEmail(true);
              }}
              className="btn btn-light btn-outline-text me-3"
            >
              <span>Send test mail </span>
            </button>
            <button
              onClick={() => {
                setOpenEmailConfirmation(true);
              }}
              className="btn btn-light btn-outline-text"
            >
              <SendRoundedIcon className="me-2" /> <span>Send mail</span>
            </button>
          </Toolbar>
        </AppBar>
        {/* Main Body goes here */}
        <Container className="container mt-4">
          <div className="mb-5">
            <div className="mb-3">
              <TextDescriptive>
                {" "}
                <span className="me-2">To: </span> All registered attendees
              </TextDescriptive>
            </div>
            <div className="mb-3">
              <TextDescriptive>
                <span className="me-2">Email subject: </span>{" "}
                {mailDetails ? mailDetails.subject : "----"}
              </TextDescriptive>
            </div>
            <div className="mb-3">
              <TextDescriptive>
                <span className="me-2"> Pre header: </span>{" "}
                {mailDetails ? mailDetails.preHeader : "-----"}
              </TextDescriptive>
            </div>
          </div>

          <div style={{ maxWidth: "420px" }} className="mb-5">
            <FormLabel className="mb-1">Preview email as</FormLabel>
            <Select
              // Build a list of all attendees from registrations data its very easy.
              options={Attendees}
              styles={styles}
            />
          </div>

          {/*  Set dangerously set inner html */}
          {mailDetails.body ? (
            <MailContainer
              dangerouslySetInnerHTML={{
                __html: convertFromJSONToHTML(mailDetails.body),
              }}
            ></MailContainer>
          ) : (
            <></>
          )}
        </Container>
      </Dialog>
      <SendTestEmail
        open={openSendTestEmail}
        handleClose={handleCloseSendTestEmail}
      />
      <EmailConfirmation
        open={openEmailConfirmation}
        handleClose={handleCloseEmailConfirmation}
      />
    </>
  );
};

export default PreviewEmail;
