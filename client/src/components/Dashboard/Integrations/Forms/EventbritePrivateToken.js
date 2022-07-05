import React, { useState } from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton } from "@material-ui/core";
import EventbriteIntegrationPNG from "./../../../../assets/images/int-1.png";
import { useDispatch } from "react-redux";
import { editCommunity } from "../../../../actions";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const EventbritePrivateToken = ({ openDrawer, handleCloseDrawer }) => {
  const dispatch = useDispatch();

  const { eventbritePrivateToken } = useSelector(
    (state) => state.community.communityDetails
  );

  const params = useParams();

  const communityId = params.id;

  const [privateToken, setPrivateToken] = useState(eventbritePrivateToken);
  
  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
          onOpen={() => {
            console.log("Side nav was opended")
          }}
          onClose={() => {
            console.log("Side nav was closed")
          }}
        >
          <div className="integration-side-drawer-form px-4 py-4">
            <div>
              <IconButton>
                <HighlightOffRoundedIcon
                  onClick={() => {
                    handleCloseDrawer();
                  }}
                />
              </IconButton>
            </div>
            <div style={{ textAlign: "center" }} className="mb-4">
              <img
                style={{ maxHeight: "420px" }}
                src={EventbriteIntegrationPNG}
                alt="integration illustration"
              />
            </div>
            <div>
              <div className="mb-3">
                <label
                  Forhtml="eventStartDate"
                  className="form-label form-label-customized"
                >
                  Eventbrite Private Token
                </label>

                <input
                  type="text"
                  className="me-3 form-control"
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setPrivateToken(e.target.value);
                  }}
                  value={privateToken}
                  id="email-group-name"
                  aria-describedby="emailGroupName"
                  placeholder="Your private token"
                />
              </div>
              <div className="d-flex flex-row align-items-center justify-content-end mb-4">
                <button
                  onClick={() => {
                    // Store this private token in community document.
                    dispatch(
                      editCommunity(communityId, {
                        eventbritePrivateToken: privateToken,
                      })
                    );
                    console.log(privateToken);
                  }}
                  className="btn btn-outline-primary btn-outline-text"
                >
                  Connect
                </button>
              </div>

              <div>
                <div className="want-help-heading mb-3">Want help ?</div>
                <div className="integration-guide-btn px-4 py-2">
                  Guid to Integrate Eventbrite with Evenz.
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default EventbritePrivateToken;
