import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import styled from "styled-components";

import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { generateAPICredentials } from "../../../../actions";
import { useParams } from "react-router";

const GenerateApiKeyBody = styled.div`
  width: 480px;
  background-color: #ffffff;
`;

const GenerateApiKey = ({ openDrawer, handleCloseDrawer }) => {
  const params = useParams();

  const communityId = params.id;

  const userDetails = useSelector((state) => state.user.userDetails);

  const userId = userDetails._id;

  const [label, setLabel] = useState(null);

  const dispatch = useDispatch();

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
        onOpen={() => {
          console.log("Side nav was opended")
        }}
        onClose={() => {
          console.log("Side nav was closed")
        }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
        >
          <GenerateApiKeyBody className="px-4 py-3">
            <div className="d-flex flex-row align-items-center justify-content-between mb-4">
              <div
                style={{
                  fontWeight: "500",
                  fontFamily: "Ubuntu",
                  color: "#212121",
                  fontSize: "1rem",
                }}
              >
                Generate API Key
              </div>
              <IconButton>
                <HighlightOffRoundedIcon
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                />
              </IconButton>
            </div>

            <small
              className="mb-3 form-small-text"
              style={{ display: "block" }}
            >
              Enter a friendly name for your api credentials
            </small>

            <input
              type="text"
              placeholder="Label"
              className="form-control mb-4"
              value={label}
              onChange={(e) => {
                setLabel(e.target.value);
              }}
            ></input>

            <button
              onClick={() => {
                if (!label) return;
                // Make a request to generate a new pair of api credentials for this community created by this user at this date time and for this label with default status(enabled)
                dispatch(generateAPICredentials(communityId, userId, label));
              }}
              className="btn btn-outline-primary btn-outline-text"
              style={{ width: "100%" }}
            >
              Generate API Key
            </button>
          </GenerateApiKeyBody>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default GenerateApiKey;
