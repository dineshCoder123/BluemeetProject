import React from "react";
import {
  Dialog,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {showSnackbar} from "./../../../../actions";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const Paper = styled.div`
  width: 480px;
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

const EmbeddableWidget = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("lg");

  const { eventDetails } = useSelector((state) => state.event);

  const link = `https://www.bluemeet.in/event-landing-page/${eventDetails._id}/${eventDetails.communityId}`;

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
            <Heading> Embeddable widget </Heading>
          </HeaderFooter>
          <div className="px-4 py-3">
            <CodePaper>
              <code>
                &lt;iframe src={link} width="100%" height="2000px"
                frameborder="0" marginheight="0" marginwidth="0" allow="camera
                *;microphone *"&gt;
              </code>
            </CodePaper>
          </div>
          <HeaderFooter className="px-4 py-3 d-flex flex-row align-items-center justify-content-end">
            <button
              className="btn btn-outline-dark btn-outline-text me-3"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              // onClick={() => {
              //   navigator.clipboard.writeText();
              //   alert("copied to clipboard!");
              // }}

              onClick={() => {
                navigator.clipboard.writeText(`
                <iframe
                  src=${link} {" "}
                  width="100%" height="2000px" frameborder="0" marginheight="0"
                  marginwidth="0" allow="camera *;microphone *">`).then(function() {
                  console.log('Async: Copying to clipboard was successful!');
                  dispatch(showSnackbar("success", "Copied to clipboard!"));
                }, function(err) {
                  console.error('Async: Could not copy text: ', err);
                  dispatch(showSnackbar("error", "Failed to copy to clipboard!"));
                });

                
              }}

              className="btn btn-outline-primary btn-outline-text"
            >
              <ContentCopyIcon />
            </button>
          </HeaderFooter>
        </Paper>
      </Dialog>
    </>
  );
};

export default EmbeddableWidget;
