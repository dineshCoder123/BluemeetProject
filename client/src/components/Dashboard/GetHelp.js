import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

const Container = styled.div`
  width: 468px;
  height: auto;
`;

const GetHelp = ({ open, handleClose }) => {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        onClose={handleClose}
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <Container className="d-flex flex-column align-items-center justify-content-center py-5">
          <a
            href="https://bluemeetinc.zendesk.com/hc/en-us"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            <button
              className="btn btn-outline-text btn-primary py-2 mb-5"
              style={{ width: "250px" }}
            >
              Visit Help Center
            </button>
          </a>
          <iframe
            className="mb-5"
            width="250"
            height="50"
            title="Whatsapp button"
            style={{ border: "0" }}
            src="https://cdn.smooch.io/message-us/index.html?channel=whatsapp&color=teal&size=standard&radius=4px&label=Message us on WhatsApp&number=919770668454"
          ></iframe>
          <iframe
            width="250"
            height="50"
            title="Facebook button"
            style={{ border: "0" }}
            src="https://cdn.smooch.io/message-us/index.html?channel=messenger&color=blue&size=standard&radius=4px&label=Message us on Messenger&pageId=109718641419918"
          ></iframe>
        </Container>
      </Dialog>
    </>
  );
};

export default GetHelp;
