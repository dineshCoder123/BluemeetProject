import React from "react";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { IconButton } from "@material-ui/core";
import SlidoIntegrationPNG from "./../../../../assets/images/int23.svg";
import { useDispatch } from "react-redux";
import { editCommunity } from "../../../../actions";
import { useParams } from "react-router-dom";


const SlidoEnable = ({ openDrawer, handleCloseDrawer }) => {
  const params = useParams();
  const communityId = params.id;

  const dispatch = useDispatch();

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
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
                src={SlidoIntegrationPNG}
                alt="integration illustration"
              />
            </div>
            <div>
              <div className="d-flex flex-row align-items-center justify-content-end mb-4">
                <button
                  onClick={() => {
                    dispatch(
                      editCommunity(communityId, { isConnectedSlido: true })
                    );
                  }}
                  className="btn btn-outline-primary btn-outline-text"
                  style={{ width: "100%" }}
                >
                  Enable slido
                </button>
              </div>
              <div>
                <div className="want-help-heading mb-3">Want help ?</div>
                <div className="integration-guide-btn px-4 py-2">
                  Guide to Integrate Typeform with Evenz.
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default SlidoEnable;
