import React, { useState } from "react";
import styled from "styled-components";
import { editEvent, showSnackbar } from "../../../actions";
import UploadEventImageForm from "./FormComponents/uploadEventImageForm";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Chip from "@mui/material/Chip";
import { Field, reduxForm } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import { useParams } from "react-router";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import EmbeddableWidget from "./SubComponent/EmbeddableWidget";
import PublishEventConfirmation from "./SubComponent/PublishEventConfirmation";

import {
  editEventDescription,
  errorTrackerForEditEventDiscription,
  errorTrackerForFetchEvent,
} from "../../../actions";
import dateFormat from "dateformat";
import EditBasicDetailsForm from "./FormComponents/EditBasicDetailsForm";
import { Link } from "react-router-dom";
import MainEventSetupCheckList from "../Checklist/Main";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";

import Switch from "@mui/material/Switch";

import ArchiveRoundedIcon from "@mui/icons-material/ArchiveRounded";
import UnarchiveRoundedIcon from "@mui/icons-material/UnarchiveRounded";

const label = {
  inputProps: { "aria-label": "Switch demo" },
};

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const EventOverviewGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
  grid-gap: 24px;
  height: 400px;
`;

const EventDetails = styled.div`
  height: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px;
`;

const EventPromoImageContainer = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  padding: 7px;
`;

const EventDetailsHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #212121;
`;

const EventDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 3fr;
  grid-gap: 24px;
`;

const EventName = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.2rem;
  color: #5f5f5f;
`;

const TextSmall = styled.div`
  font-weight: 400;
  font-size: 0.72rem;
  font-family: "Ubuntu";
  color: #212121;
`;

const TextSignificant = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  font-family: "Ubuntu";
  color: #212121;
  width: fit-content;
`;

const EventLinkInput = styled.input`
  font-weight: 500;
  font-size: 0.8rem;
  font-family: "Ubuntu";
  color: #212121;
`;

const EventOverview = (props) => {
  const [openBasicForm, setOpenBasicForm] = useState(false);

  const [openWidget, setOpenWidget] = useState(false);

  const [openPublish, setOpenPublish] = useState(false);

  const handleClosePublish = () => {
    setOpenPublish(false);
  };

  const handleCloseWidget = () => {
    setOpenWidget(false);
  };

  const handleCloseBasicForm = () => {
    setOpenBasicForm(false);
  };

  const { eventDetails, isLoading } = useSelector((state) => state.event);

  const { handleSubmit } = props;

  const { error } = useSelector((state) => state.event);

  let aboutText;

  if (eventDetails) {
    aboutText = eventDetails.editingComment;
  }

  const [editorState, setEditorState] = React.useState(
    aboutText
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(aboutText)))
      : EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const onSubmit = () => {
    const JSONData = {
      editingComment: convertToRaw(editorState.getCurrentContent()),
    };

    dispatch(editEventDescription(JSONData, id));
  };

  const renderEditor = ({ input, id }) => {
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        name="editior"
        onEditorStateChange={onEditorStateChange}
        {...input}
        id={id}
      />
    );
  };

  if (isLoading || !eventDetails) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ height: "73vh", width: "100%" }}
      >
        <div class="spinner-border" role="status"></div>
      </div>
    );
  }

  if (error) {
    dispatch(errorTrackerForFetchEvent());
    return dispatch(errorTrackerForEditEventDiscription());
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Overview</SectionHeading>
          <div>
            {eventDetails.archived ? (
              <button
                onClick={() => {
                  dispatch(editEvent({ archived: false }, id));
                }}
                className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
              >
                {" "}
                <UnarchiveRoundedIcon />{" "}
                <span className="ms-2"> Unarchive </span>{" "}
              </button>
            ) : (
              <button
                onClick={() => {
                  dispatch(editEvent({ archived: true }, id));
                }}
                className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
              >
                <ArchiveRoundedIcon /> <span className="ms-2"> Archive </span>
              </button>
            )}
          </div>
        </div>
        <div className=" px-3 mb-4">
          <MainEventSetupCheckList />
          <EventOverviewGrid className="mb-5 pb-4">
            <EventDetails className="px-4 py-3">
              <EventDetailsHeading className="mb-3">
                Event Name
              </EventDetailsHeading>
              <EventDetailsGrid className="mb-5">
                <EventName>{eventDetails.eventName}</EventName>
                <div className="d-flex flex-row align-items-center justify-content-end">
                  <button
                    disabled={eventDetails.status === "Ended" ? true : false}
                    onClick={() => {
                      setOpenBasicForm(true);
                    }}
                    className="btn btn-outline-primary btn-outline-text me-3"
                    style={{ justifySelf: "end" }}
                  >
                    {" "}
                    <EditRoundedIcon
                      className="me-2"
                      style={{ fontSize: "18px" }}
                    />{" "}
                    edit
                  </button>
                  {eventDetails.publishedStatus !== "Draft" ? (
                    <Chip
                      label="Published"
                      color="success"
                      style={{ fontWeight: 600, fontFamily: "Ubuntu" }}
                    />
                  ) : (
                    <button
                      disabled={eventDetails.status === "Ended" ? true : false}
                      onClick={() => {
                        setOpenPublish(true);
                      }}
                      className="btn btn-outline-primary btn-outline-text"
                      style={{ justifySelf: "end" }}
                    >
                      {" "}
                      <PublishRoundedIcon
                        className="me-2"
                        style={{ fontSize: "18px" }}
                      />{" "}
                      Publish
                    </button>
                  )}
                </div>
                <div className="d-flex flex-row align-items-center ">
                  <div className="me-5">
                    <TextSmall className="">Starting on</TextSmall>
                    <TextSignificant className="my-1">
                      {dateFormat(eventDetails.startDate, "fullDate")}
                    </TextSignificant>
                    <TextSmall>
                      {dateFormat(eventDetails.startTime, "h:MM TT")}
                    </TextSmall>
                  </div>
                  <div className="me-5">
                    <TextSmall className="">Ending on</TextSmall>
                    <TextSignificant className="my-1">
                      {dateFormat(eventDetails.endDate, "fullDate")}
                    </TextSignificant>
                    <TextSmall>
                      {dateFormat(eventDetails.endTime, "h:MM TT")}
                    </TextSmall>
                  </div>
                  <div>
                    <TextSmall className="">Timezone</TextSmall>
                    <TextSignificant className="my-1">
                      {eventDetails.Timezone}
                    </TextSignificant>
                  </div>
                </div>
              </EventDetailsGrid>
              <div className="referral-link-and-copy-to-clipboard mb-4">
                <div
                  className="ui action input me-4"
                  style={{ minWidth: "400px" }}
                >
                  <EventLinkInput
                    className="event-sharable-link"
                    type="text"
                    value={`https://www.bluemeet.in/event-landing-page/${eventDetails._id}/${eventDetails.communityId}`}
                    readOnly
                    placeholder="Search..."
                  />
                  <button
                    className="ui icon button"
                    onClick={() => {
                      navigator.clipboard
                        .writeText(
                          `https://www.bluemeet.in/event-landing-page/${eventDetails._id}/${eventDetails.communityId}`
                        )
                        .then(
                          function () {
                            console.log(
                              "Async: Copying to clipboard was successful!"
                            );
                            dispatch(
                              showSnackbar("success", "Copied to clipboard!")
                            );
                          },
                          function (err) {
                            console.error("Async: Could not copy text: ", err);
                            dispatch(
                              showSnackbar(
                                "error",
                                "Failed to copy to clipboard!"
                              )
                            );
                          }
                        );
                    }}
                  >
                    <ContentCopyRoundedIcon />
                  </button>
                </div>
                <Link
                  to={`/compatibility-test/community/${eventDetails.communityId}/event/${eventDetails._id}/`}
                  target="_blank"
                  disabled={eventDetails.status === "Ended" ? true : false}
                  className="btn btn-primary btn-outline-text me-4"
                >
                  Go to event
                </Link>
                <buttton
                  onClick={() => {
                    setOpenWidget(true);
                  }}
                  className="btn btn-outline-primary btn-outline-text me-4"
                >
                  Embeddable widget
                </buttton>
                <div className="d-flex flex-row align-items-center mt-4">
                  <div style={{ fontWeight: "500", fontSize: "0.9rem" }}>
                    Ticket Sale
                  </div>
                  <Switch
                    {...label}
                    checked={eventDetails.ticketSaleIsEnabled}
                    onChange={(e) => {
                      dispatch(
                        editEvent(
                          { ticketSaleIsEnabled: e.target.checked },
                          eventDetails._id
                        )
                      );
                    }}
                  />
                </div>
              </div>

              {/* // TODO We need to make it work properly */}
            </EventDetails>
            <EventPromoImageContainer>
              <UploadEventImageForm />
            </EventPromoImageContainer>
          </EventOverviewGrid>
          <form onSubmit={handleSubmit(onSubmit)} className="pt-5">
            <div className="d-flex flex-row align-items-center justify-content-between mb-3 pt-4">
              <TextSignificant className="" style={{ fontSize: "1.15rem" }}>
                Description
              </TextSignificant>
              <div
                className="d-flex flex-row justify-content-end"
                style={{ width: "100%" }}
              >
                <button
                  type="submit"
                  className={`btn btn-primary btn-outline-text`}
                >
                  Save description
                </button>
              </div>
            </div>
            <TextSmall className="mb-4">
              Make a great impression on your attendees by adding an
              eye-catching description.
              <br /> You can add paragraphs, images, links and more.
            </TextSmall>
            <div className="mb-5 pb-5">
              <div
                className="rich-text-editor-wrapper p-3"
                style={{ minHeight: "500px", border: "1px solid #CACACA" }}
              >
                <Field component={renderEditor} id={id} />
              </div>
            </div>
          </form>
        </div>
      </div>

      <EditBasicDetailsForm
        hideFormHeading="1"
        showBlockButton="false"
        id={id}
        open={openBasicForm}
        handleClose={handleCloseBasicForm}
      />

      <EmbeddableWidget open={openWidget} handleClose={handleCloseWidget} />
      <PublishEventConfirmation
        open={openPublish}
        handleClose={handleClosePublish}
      />
    </>
  );
};

export default reduxForm({
  form: "editorForm",
  destroyOnUnmount: false,
})(EventOverview);
