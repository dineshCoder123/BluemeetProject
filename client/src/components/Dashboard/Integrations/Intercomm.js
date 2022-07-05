import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Styles/IntegrationCard.scss";
import { makeStyles } from "@material-ui/core/styles";
import IntercomAppID from "./Forms/IntercomAppID";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import { Link, useParams } from "react-router-dom";
import { navigationIndexForCommunityDash } from "./../../../actions";
import { useDispatch, useSelector } from "react-redux";
import UninstallTawk from "./Uninstall/UninstallTawk";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));

const Tawk = () => {
  const [open, setOpen] = useState(false);

  const [openUninstall, setOpenUninstall] = React.useState(false);

  const handleCloseUninstall = () => {
    setOpenUninstall(false);
  };

  const dispatch = useDispatch();

  const params = useParams();

  const userId = params.userId;
  const communityId = params.id;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const { communityDetails } = useSelector((state) => state.community);

  let isEligible = false; // plan !== Free & if plan === "AppSumo" then codesApplied.length*1 === 3 => eligible

  if (communityDetails.planName !== "Free") {
    if (communityDetails.isAppSumoCustomer) {
      if (communityDetails.codesApplied.length * 1 === 3) {
        // Eligible
        isEligible = true;
      }
    }
    if (communityDetails.planName === "Growth") {
      // Eligible
      isEligible = true;
    }
    if (communityDetails.planName === "Custom") {
      // Eligible
      isEligible = true;
    }
  }

  return (
    <>
      <div className="integration-card-container px-4 py-3 mb-4">
        <div
          className=""
          style={{ display: "grid", gridTemplateColumns: "0.7fr 8fr 4fr" }}
        >
          <Avatar
            src={
              "https://www.tawk.to/wp-content/uploads/2020/04/tawk-sitelogo.png"
            }
            alt={"Mailchimp"}
            className={`${classes.large} me-3`}
            variant="rounded"
          />

          <div>
            <div className="integration-name mb-2">TAWK.to</div>
            <div className="integration-short-description">
              Get in touch with your attendees as they visit your event
              registration page and assist them to boost registrations.
            </div>
          </div>

          <div
            className="d-flex flex-row align-items-center"
            style={{ justifySelf: "end" }}
          >
            <Button
              style={{
                fontFamily: "Ubuntu",
                fontSize: "0.85rem",
                fontWeight: "500",
                textTransform: "capitalize",
              }}
              className="me-3"
            >
              Learn more
            </Button>

            {isEligible ? (
              <></>
            ) : (
              <>
                <Chip
                  label="Premium"
                  color="warning"
                  variant="outlined"
                  style={{ fontWeight: "500" }}
                />
                <Link
                  to={`/user/${userId}/community/billing/${communityId}`}
                  onClick={() => {
                    dispatch(navigationIndexForCommunityDash(7));
                  }}
                  type="button"
                  className="btn btn-primary btn-outline-text ms-3"
                >
                  Upgrade
                </Link>
              </>
            )}

            {communityDetails.isConnectedTawk ? (
              <button
                onClick={() => {
                  setOpenUninstall(true);
                }}
                className="btn btn-outline-danger btn-outline-text ms-3"
              >
                Uninstall
              </button>
            ) : isEligible ? (
              <button
                onClick={() => {
                  handleOpen();
                }}
                className="btn btn-outline-primary btn-outline-text ms-3"
              >
                Install
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <IntercomAppID openDrawer={open} handleCloseDrawer={handleCloseDrawer} />
      <UninstallTawk open={openUninstall} handleClose={handleCloseUninstall} />
    </>
  );
};

export default Tawk;
