// import React from 'react';
// import styled from 'styled-components';

// const CreateEmail = () => {
//     return (
//         <>

//         </>
//     )
// }

// export default CreateEmail;

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";

import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Select from "react-select";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { Field, reduxForm } from "redux-form";
import PreviewEmail from "./PreviewEmail";

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
  display: grid;
  grid-template-columns: 5fr 1.8fr;
  grid-gap: 24px;
`;

const Grid2In1 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
`;

const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #222222;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.76rem;
  color: #494949;
`;

const Tag = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.79rem;
  color: #363636;

  background-color: #f3f3f3a2;
  padding: 10px;
  width: fit-content;
  height: fit-content;

  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background-color: #f1f0f0;
  }
`;

const StyledInput = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  /* font-size: 0.8rem; */
  color: #6c6c6c;

  &:hover {
    border: 1px solid #538bf7;
  }
`;

const LearnMore = styled.a`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;

  text-decoration: none;

  &:hover {
    cursor: pointer;
  }
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #646464;
`;

const TextDescriptive = styled.span`
  font-weight: 400;
  font-family: "Ubuntu";
  font-size: 0.82rem;
  color: #646464;
`;

const EditEmail = ({
  open,
  handleClose,
  handleSubmit,
  pristine,
  submitting,
}) => {
  const dispatch = useDispatch();

  const [openPreview, setOpenPreview] = React.useState(false);

  const handleClosePreview = () => {
      setOpenPreview(false);
  }

  const aboutText = useSelector(
    (state) => state.event.eventDetails.editingComment
  );

  const [editorState, setEditorState] = React.useState(
    aboutText
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(aboutText)))
      : EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const onSubmit = () => {
    const JSONData = {
      editingComment: convertToRaw(editorState.getCurrentContent()),
    };
    // dispatch(editEventDescription(JSONData, id));
  };

  const renderEditor = ({ input, id }) => {
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="emailEditor"
        name="editior"
        onEditorStateChange={onEditorStateChange}
        {...input}
        id={id}
      />
    );
  };

  return (
      <>
    <div>
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
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Mail
            </Typography>
            <button onClick={() => {
                setOpenPreview(true)
            }} className="btn btn-light btn-outline-text me-3">
              <SendRoundedIcon className="me-2" /> <span> Preview & Send </span>
            </button>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save as draft
            </Button>
          </Toolbar>
        </AppBar>
        {/* Main Body goes here */}
        <Container className="container mt-4">
          <div className="p-4">
            <Heading className="mb-4">Email details</Heading>

            <Grid2In1 className="mb-3">
              <div>
                <FormLabel className="mb-1">Template name</FormLabel>
                <input
                  type="text"
                  placeholder="Give this template a name"
                  className="form-control"
                ></input>
              </div>
              <div>
                <FormLabel className="mb-1">Subject</FormLabel>
                <input
                  type="text"
                  placeholder="Your email subject"
                  className="form-control"
                ></input>
              </div>
            </Grid2In1>

            <Grid2In1 className="mb-4">
              <div>
                <FormLabel className="mb-1">
                  Pre-header (appears after subject in inbox)
                </FormLabel>
                <input
                  type="text"
                  placeholder="Pre-header"
                  className="form-control"
                ></input>
              </div>
              <div>
                <FormLabel className="mb-1">Recipient</FormLabel>
                <Select
                  options={[
                    { label: "Speakers", value: "Speakers" },
                    { label: "Attendees", value: "Attendees" },
                    { label: "Exhibitors", value: "Exhibitors" },
                  ]}
                  styles={styles}
                />
              </div>
            </Grid2In1>

            <Field component={renderEditor} />
          </div>
          <div className="p-4" style={{height: "85vh", overflow: "auto"}}>
            <Heading className="mb-4">Personalisation tags</Heading>
            <TextSmall>
              Copy and paste following tags to personalise your emails with
              event, attendee, speaker and exhibitor information.
            </TextSmall>
            <LearnMore className="mb-5">Learn more</LearnMore>

            <div className="py-4">
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{user.email}}`}</Tag>
                <TextDescriptive>Email of the attendee</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{user.first_name}}`}</Tag>
                <TextDescriptive>Firts name of the attendee</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{user.last_name}}`}</Tag>
                <TextDescriptive>Last name of the attendee</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{user.name}}`}</Tag>
                <TextDescriptive>Full name of the attendee</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.name}}`}</Tag>
                <TextDescriptive>Name of the event</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.magic_link}}`}</Tag>
                <TextDescriptive>
                  The link to the recipient's magic link to the event.
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.calender_link}}`}</Tag>
                <TextDescriptive>
                  A link to a downloadable calendar item containing the event
                  link.
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{ticket.name}}`}</Tag>
                <TextDescriptive>
                  The name of the ticket which the recipient holds
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{registration.amount}}`}</Tag>
                <TextDescriptive>
                  The price, the recipient has paid for their ticket
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.currency}}`}</Tag>
                <TextDescriptive>
                  The currency used for paid tickets
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.original_picture}}`}</Tag>
                <TextDescriptive>
                  The URL of the original size event picture (use as image
                  source)
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.medium_picture}}`}</Tag>
                <TextDescriptive>
                  The URL of a 200*200 px version of the event picture (use as
                  image source)
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{organiser.medium_picture}}`}</Tag>
                <TextDescriptive>
                  The URL of the organization profile picture (use as image
                  source)
                </TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.todays_schedule}}`}</Tag>
                <TextDescriptive>List schedules for today</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.tomorrows_schedule}}`}</Tag>
                <TextDescriptive>List schedules for tomorrow</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.todays_speaker}}`}</Tag>
                <TextDescriptive>List speakers for today</TextDescriptive>
              </div>
              <div className="d-flex flex-row  mb-3">
                <Tag className="me-3">{`{{event.tomorrows_speaker}}`}</Tag>
                <TextDescriptive>List speakers for tomorrow</TextDescriptive>
              </div>
            </div>
          </div>
        </Container>
      </Dialog>
    </div>
    <PreviewEmail open={openPreview} handleClose={handleClosePreview} />
    </>
  );
};

export default reduxForm({
  form: "editEmail",
  destroyOnUnmount: false,
})(EditEmail);
