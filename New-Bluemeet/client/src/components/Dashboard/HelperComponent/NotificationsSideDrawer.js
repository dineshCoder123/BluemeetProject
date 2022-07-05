import React from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import NoNotification from "./../../../assets/images/NoNotification.png";
import NotificationMessage from "../../NotificationMsg";

const Paper = styled.div`
  width: 400px !important;
`;

const IllustrationContainer = styled.div`
  height: 90vh;
  width: 100%;
`;

const Image = styled.img`
  border-radius: 15px;
  height: 250px;
  width: "100%";
  object-fit: contain;
`;

const NoNotificationText = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  color: #212121;
`;

const NotificationsSideDrawer = ({ open, handleClose }) => {
  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer anchor="right" open={open}>
          <Paper className="registration-more-details-right-drawer px-4 py-4">
            <div
              style={{ borderBottom: "1px solid #B3B3B3" }}
              className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between mb-4"
            >
              <div className="side-drawer-heading">Notifications</div>
              <div
                onClick={() => {
                  handleClose();
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelOutlinedIcon
                    style={{ fontSize: "22", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
            </div>

            <NotificationMessage ></NotificationMessage>

            {/* <IllustrationContainer className="d-flex flex-column align-items-center justify-content-center">
              <Image src={NoNotification} />
              <NoNotificationText className="mt-3">
                We'll let you know when something happens!
              </NoNotificationText>
            </IllustrationContainer> */}
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default NotificationsSideDrawer;
