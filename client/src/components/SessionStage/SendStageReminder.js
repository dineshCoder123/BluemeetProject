import React from "react";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendStageReminder, showSnackbar } from "./../../actions";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const Paper = styled.div`
  width: 440px;
  height: auto;
`;

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #727272 !important;
  margin-bottom: 5px;
`;

const TextAreaWidget = styled.textarea`
  padding: 5px 10px;
  border-radius: 5px;
  width: 100%;
  /* background-color: #345b63; */
  background-color: transparent;

  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;

  color: #212121;

  &:focus {
    border: 1px solid #152d35;
    outline: none;
  }
`;

const SendStageReminder = ({ open, handleClose, userId }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const params = useParams();
  const sessionId = params.sessionId;

  const [msg, setMsg] = React.useState("");

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSendReminder = () => {
    dispatch(sendStageReminder(sessionId, userId, msg, setMsg, handleClose));
  };

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper className="">
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
            <div></div>
            <div className="coupon-overlay-form-headline">Send reminder</div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <div className="mb-4 overlay-form-input-row px-4 pb-4">
            <FormLabel >Your message</FormLabel>
            {/* Styled textarea */}

            <TextAreaWidget
              className=""
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
              }}
            />
          </div>

          <div style={{ width: "100%" }} className="px-4 pb-4">
            <button
              onClick={() => {
                if (!msg) {
                  dispatch(
                    showSnackbar(
                      "info",
                      "A valid message is required to send reminder."
                    )
                  );
                } else {
                  handleSendReminder();
                }
              }}
              type="button"
              className="btn btn-primary btn-outline-text"
              style={{ width: "100%", textAlign: "center" }}
            >
              Send reminder
            </button>
          </div>
        </Paper>
      </Dialog>
    </>
  );
};

export default SendStageReminder;
