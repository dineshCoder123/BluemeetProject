import { Avatar } from "@material-ui/core";
import React, { useState } from "react";
import "./Styles/IntegrationCard.scss";
import SalesforceAuth from "./Forms/SalesforceAuth";
import Chip from "@mui/material/Chip";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import UninstallSalesforce from "./Uninstall/UninstallSalesforce";

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

const Salesforce = () => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const [openUninstall, setOpenUninstall] = React.useState(false);

  const handleCloseUninstall = () => {
    setOpenUninstall(false);
  };

  const handleOpenSalesforce = () => {
    setOpen(true);
  };

  const handleCloseSalesforce = () => {
    setOpen(false);
  };

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
              "https://logos-world.net/wp-content/uploads/2020/10/Salesforce-Emblem.png"
            }
            alt={"Mailchimp"}
            className={`${classes.large} me-3`}
            variant="rounded"
          />
          <div>
            <div className="integration-name mb-2">Salesforce</div>
            <div className="integration-short-description">
              Manage customer relation with data driven approach by syncing all
              your evenz data with your salesforce account.
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
                <button
                  type="button"
                  className="btn btn-primary btn-outline-text ms-3"
                >
                  Upgrade
                </button>
              </>
            )}

            {communityDetails.isConnectedSalesforce ? (
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
                  handleOpenSalesforce();
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

      <SalesforceAuth
        openDrawer={open}
        handleCloseDrawer={handleCloseSalesforce}
      />

      <UninstallSalesforce
        open={openUninstall}
        handleClose={handleCloseUninstall}
      />
    </>
  );
};

export default Salesforce;
