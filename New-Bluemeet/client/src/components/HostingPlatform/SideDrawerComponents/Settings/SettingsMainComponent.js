import React from "react";
import { Divider, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import ArrowForwardIosRoundedIcon from "@material-ui/icons/ArrowForwardIosRounded";
const SettingsMainComponent = (props) => {
  return (
    <>
      <div className="hosting-platform-settings">
        <div className="d-flex flex-row align-items-center justify-content-between">
          <div>
            <div className="event-platform-side-drawer-heading">Settings</div>
            <div className="setting-tab-sub-text">
              Fully customize your event experience
            </div>
          </div>

          <IconButton
            onClick={() => {
              props.resetSelectedTab();
              props.setOpenDrawer(false);
            }}
          >
            <CancelRoundedIcon />
          </IconButton>
        </div>

        <div className="my-3">
          <Divider />
        </div>

        <div className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between">
          <div>
            <div className="setting-tab-text mb-1">Customize event</div>
            <div className="setting-tab-sub-text">
              Fully customize your event experience
            </div>
          </div>
          <IconButton>
            <ArrowForwardIosRoundedIcon className="icon-btn" />
          </IconButton>
        </div>
        <div className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between">
          <div>
            <div className="setting-tab-text mb-1">Update profile</div>
            <div className="setting-tab-sub-text">
              Update your profile info that is visible to others
            </div>
          </div>

          <IconButton>
            <ArrowForwardIosRoundedIcon className="icon-btn" />
          </IconButton>
        </div>
        <div className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between">
          <div>
            <div className="setting-tab-text mb-1">
              Audio and Video settings
            </div>
            <div className="setting-tab-sub-text">
              Test and update your camera and mic preferences
            </div>
          </div>

          <IconButton>
            <ArrowForwardIosRoundedIcon className="icon-btn" />
          </IconButton>
        </div>
        <div className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between">
          <div>
            <div className="setting-tab-text mb-1">User dashboard</div>
            <div className="setting-tab-sub-text">
              Switch to your user account
            </div>
          </div>

          <IconButton>
            <ArrowForwardIosRoundedIcon className="icon-btn" />
          </IconButton>
        </div>
        <div className="setting-tab px-3 py-2 mb-4 d-flex flex-row align-items-center justify-content-between">
          <div>
            <div className="setting-tab-text mb-1">Community dashboard</div>
            <div className="setting-tab-sub-text">
              Switch to any of your community dashboard
            </div>
          </div>

          <IconButton>
            <ArrowForwardIosRoundedIcon className="icon-btn" />
          </IconButton>
        </div>

        <div>
          <button
            className="btn btn-outline-danger btn-outline-text"
            style={{ width: "100%" }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SettingsMainComponent;
