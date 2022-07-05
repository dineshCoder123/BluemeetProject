import React from "react";
import { Dialog, useMediaQuery, useTheme } from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { showSnackbar } from "./../../../../actions";

import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";


const EventLinkInput = styled.input`
  font-weight: 500;
  font-size: 0.8rem;
  font-family: "Ubuntu";
  color: #212121;
`;

const Paper = styled.div`
  width: 480px;
`;

const FormLabel = styled.label`
  font-family: "Ubuntu" !important;
  font-size: 0.82rem !important;
  font-weight: 500 !important;
  color: #5f5f5f !important;
`;

const CodePaper = styled.div`
  background-color: #ffffff;
  padding: 22px;

  background: rgba(255, 255, 255, 0.25);
  /* box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37); */
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;
const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const EventStreamSettings = ({ open, handleClose, url, secretKey }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("lg");

  return (
    <>
      <Dialog
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper>
          <HeaderFooter className="px-4 py-3">
            <Heading> RTMP Credentials </Heading>
          </HeaderFooter>
          <div className="px-4 py-3">
            <CodePaper>
              <FormLabel className="form-label form-label-customized">
                RTMP Stream key
              </FormLabel>
              <div
                className="ui action input mb-4"
                style={{
                  minWidth: "380px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <EventLinkInput
                  className="event-sharable-link"
                  type="text"
                  value={`${secretKey}`}
                  readOnly
                />
                <button
                  className="ui icon button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${secretKey}`).then(
                      function () {
                        console.log(
                          "Async: Copying to clipboard was successful!"
                        );
                        dispatch(
                          showSnackbar(
                            "success",
                            "RTMP stream key copied to clipboard!"
                          )
                        );
                      },
                      function (err) {
                        console.error("Async: Could not copy text: ", err);
                        dispatch(
                          showSnackbar("error", "Failed to copy to clipboard!")
                        );
                      }
                    );
                  }}
                >
                  <ContentCopyRoundedIcon style={{ fontSize: "18px" }} />
                </button>
              </div>
              <FormLabel className="form-label form-label-customized">
                RTMP server url
              </FormLabel>
              <div
                className="ui action input"
                style={{
                  minWidth: "380px",
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <EventLinkInput
                  className="event-sharable-link"
                  type="text"
                  value={`${url}`}
                  readOnly
                />
                <button
                  className="ui icon button"
                  onClick={() => {
                    navigator.clipboard.writeText(`${url}`).then(
                      function () {
                        console.log(
                          "Async: Copying to clipboard was successful!"
                        );
                        dispatch(
                          showSnackbar(
                            "success",
                            "RTMP server url copied to clipboard!"
                          )
                        );
                      },
                      function (err) {
                        console.error("Async: Could not copy text: ", err);
                        dispatch(
                          showSnackbar("error", "Failed to copy to clipboard!")
                        );
                      }
                    );
                  }}
                >
                  <ContentCopyRoundedIcon style={{ fontSize: "18px" }} />
                </button>
              </div>
            </CodePaper>
          </div>
          <HeaderFooter className="px-4 py-3 d-flex flex-row align-items-center justify-content-end">
            <button
              className="btn btn-outline-dark btn-outline-text"
              onClick={handleClose}
            >
              Cancel
            </button>
          </HeaderFooter>
        </Paper>
      </Dialog>
    </>
  );
};

export default EventStreamSettings;