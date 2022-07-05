import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import EmailSVG from "./../../../../assets/images/email.svg";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

import { useDispatch } from "react-redux";
import { SendMail, showSnackbar } from "./../../../../actions";

const Heading = styled.div`
  font-size: 1.1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.86rem;
  color: #494949;
`;

const Image = styled.img`
  height: 360px;
  width: auto;
  object-fit: contain;
`;

const EmailConfirmation = ({
  type,
  mailId,
  open,
  handleClose,
  everyoneEmails,
  speakerEmails,
  attendeeEmails,
  exhibitorEmails,
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSendEmail = () => {
    switch (type) {
      case "Attendee":
        typeof attendeeEmails !== "undefined" && attendeeEmails.length > 0
          ? dispatch(SendMail(mailId, attendeeEmails))
          : dispatch(
              showSnackbar("info", "There are no attendees to send email.")
            );
        break;
      case "Speaker":
        typeof speakerEmails !== "undefined" && speakerEmails.length > 0
          ? dispatch(SendMail(mailId, speakerEmails))
          : dispatch(
              showSnackbar("info", "There are no speakers to send email.")
            );

        break;
      case "Exhibitor":
        typeof exhibitorEmails !== "undefined" && exhibitorEmails.length > 0
          ? dispatch(SendMail(mailId, exhibitorEmails))
          : dispatch(
              showSnackbar("info", "There are no exhibitors to send email.")
            );

        break;
      case "Everyone":
        dispatch(SendMail(mailId, everyoneEmails));
        break;

      default:
        break;
    }
    handleClose();
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="" style={{ width: "520px" }}>
          <HeaderFooter className="p-3">
            <Heading className="">Mail confirmation</Heading>
          </HeaderFooter>

          <DialogContent
            className="py-4 d-flex flex-column align-items-center"
            style={{}}
          >
            {/* Here write main content */}

            <Image className="mb-4" src={EmailSVG} />

            <div className="">
              <FormLabel className="mb-2">
                {(() => {
                  switch (type) {
                    case "Attendee":
                      return (
                        <span>
                          This mail will be sent to all {attendeeEmails.length}{" "}
                          attendees of this Event.
                        </span>
                      );

                    case "Speaker":
                      return (
                        <span>
                          This mail will be sent to all {speakerEmails.length}{" "}
                          attendees of this Event.
                        </span>
                      );

                    case "Exhibitor":
                      return (
                        <span>
                          This mail will be sent to all {exhibitorEmails.length}{" "}
                          attendees of this Event.
                        </span>
                      );

                    case "Everyone":
                      return (
                        <span>
                          This mail will be sent to all {everyoneEmails.length}{" "}
                          attendees of this Event.
                        </span>
                      );

                    default:
                      break;
                  }
                })()}
              </FormLabel>
            </div>
          </DialogContent>
          <HeaderFooter className="p-3">
            <DialogActions>
              <button
                className="btn btn-outline-dark btn-outline-text me-3"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSendEmail();
                }}
                className="btn btn-primary btn-outline-text"
              >
                <SendRoundedIcon className="me-2" />
                <span>Send Email</span>
              </button>
            </DialogActions>
          </HeaderFooter>
        </div>
      </Dialog>
    </>
  );
};

export default EmailConfirmation;
