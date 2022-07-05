/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";

import Faker from "faker";
import ReactTooltip from "react-tooltip";
import { Avatar, Dialog, IconButton } from "@material-ui/core";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import "./../Styles/report.scss";
import ActionConfirmation from "./ActionConfirmation";

const ReportActions = ({ open, handleClose }) => {

  const [openDrawer, setOpenDrawer] = useState(false);
  const [intent, setIntent] = useState(null);

  const handleOpenActionConfirmation = () => {
    setOpenDrawer(true);
  }

  const handleCloseActionConfirmation = () => {
    setOpenDrawer(false);
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        // onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="report-actions-container p-3">
          <div className="d-flex flex-row align-items-center justify-content-between">
            <div>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "1.05rem",
                  color: "#212121",
                }}
              >
                Take Action
              </span>

              <a data-tip="You can undo these actions from community dashboard" className="ms-3">
                <InfoOutlinedIcon style={{fill: "#6E6E6E", fontSize: "22px"}}/>
              </a>

              <ReactTooltip place="bottom" type="dark" effect="float" />
            </div>

            <IconButton
              onClick={() => {
                handleCloseActionConfirmation();
                handleClose();
              }}
            >
              <HighlightOffRoundedIcon />
            </IconButton>
          </div>

          <div>
            <hr />
          </div>

          <div
            style={{ width: "80%", marginLeft: "auto", marginRight: "auto" }}
          >
            <div
              className="mb-4"
              style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
            >
              <Avatar
                src={Faker.image.avatar()}
                alt={Faker.name.findName()}
                variant="rounded"
              />
              <div
                className="chat-box-name ms-3"
                style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
              >
                <div>{Faker.name.findName()}</div>

                <div
                  style={{
                    fontWeight: "500",
                    color: "#4B4B4B",
                    fontSize: "0.7rem",
                  }}
                  className="d-flex flex-row align-items-center justify-content-between"
                >
                  <div>Product Manager, Evenz</div>

                  {/* <div></div> */}
                </div>
              </div>
            </div>

            <div className="mb-3">
              <button
              onClick={() => {
                setIntent("eventSuspension");
                handleOpenActionConfirmation();
              }}
                className="btn btn-outline-primary btn-outline-text"
                style={{ width: "100%" }}
              >
                Remove from this event
              </button>
            </div>
            <div className="mb-3">
              <button
              onClick={() => {
                setIntent("communitySuspension");
                handleOpenActionConfirmation();
              }}
                className="btn btn-outline-primary btn-outline-text"
                style={{ width: "100%" }}
              >
                Ban from all events
              </button>
            </div>
            <div className="mb-3">
              <button
              onClick={() => {
                setIntent("temporarySuspension");
                handleOpenActionConfirmation();
              }}
                className="btn btn-outline-primary btn-outline-text"
                style={{ width: "100%" }}
              >
                Suspend for sometime
              </button>
            </div>
            <div className="mb-3">
              <button
              onClick={() => {
                setIntent("warnOnly");
                handleOpenActionConfirmation();
               
              }}
                className="btn btn-outline-primary btn-outline-text"
                style={{ width: "100%" }}
              >
                Issue warning
              </button>
            </div>
          </div>
        </div>
      </Dialog>

      <ActionConfirmation openDrawer={openDrawer} handleCloseDrawer={handleCloseActionConfirmation} intent={intent}/>
    </>
  );
};

export default ReportActions;
