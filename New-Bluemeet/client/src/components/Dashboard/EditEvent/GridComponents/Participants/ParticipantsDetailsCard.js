import React, { useState } from "react";

import "./../../../../../assets/Sass/Registrations.scss";
import "./../../../../../assets/Sass/DataGrid.scss";

import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { useDispatch } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PreviewParticipant from "../../HelperComponents/PreviewParticipant";
import {showSnackbar, sendAttendeeInvite} from "./../../../../../actions";

const ParticipantsDetailsCard = ({
  id,
  name,
  email,
  ticketType,
  totalAmountPaid,
  currency,
  image,
  addedVia,
  invitationLink,
}) => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className="registrations-field-value-container"
        style={{ gridTemplateColumns: "2fr 2fr 1fr 1fr 1fr 1fr" }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5 d-flex flex-row ">
            <Avatar alt={name} src={image} variant="rounded" />
            <div
              className="ms-3 px-2 registration-name-styled"
              style={{ textTransform: "capitalize" }}
            >
              {name}
            </div>
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {email}
          </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {ticketType}
          </div>
        </div>
        <div className="registrations-ticket-type-field">
          <div className="registrations-field-label registrations-field-value-modified">
            <span style={{ textTransform: "uppercase" }}> {currency} </span>
            <span className="ms-2">
              {((totalAmountPaid * 1) / 100).toFixed(2)}
            </span>
          </div>
        </div>
        <div className="registrations-ticket-type-field">
          <div className="registrations-field-label registrations-field-value-modified">
            {addedVia}
          </div>
        </div>
        <div className="registrations-amount-field">
          <div className="registrations-field-label registrations-field-value-modified">
            <div
              onClick={() => {
                dispatch(sendAttendeeInvite(id)) // We have given registration id and so we will send mail invite using the registration info
              }}
            >
              <IconButton color="secondary" aria-label="add to shopping cart">
                <MailIcon style={{ color: "#1351C5" }} />
              </IconButton>
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(invitationLink).then(function() {
                  console.log('Async: Copying to clipboard was successful!');
                  dispatch(showSnackbar("success", "Magic link Copied to clipboard!"));
                }, function(err) {
                  console.error('Async: Could not copy text: ', err);
                  dispatch(showSnackbar("error", "Failed to copy magic link to clipboard!"));
                });
              }}
            >
              <IconButton color="secondary" aria-label="add to shopping cart">
                <ContentCopyIcon style={{ color: "#A113C5" }} />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      <PreviewParticipant open={open} handleClose={handleClose} />
    </>
  );
};

export default ParticipantsDetailsCard;
