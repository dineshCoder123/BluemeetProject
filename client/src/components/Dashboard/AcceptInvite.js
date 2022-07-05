import React from "react";
import "./../../index.css";
import Faker from "faker";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import AvatarMenu from "../AvatarMenu";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const AcceptInvite = () => {
  const classes = useStyles();
  return (
    <>
      <div className="row topnav-container px-3">
        <div className="col-6 left">
          <div className="brand-logo-text">
            Evenz <span>Communities</span>
          </div>
        </div>
        <div className="col-6 right">
            <AvatarMenu />
        </div>
      </div>

      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ width: "100%", height: "93vh", borderTop: "2px solid #BCD2FF" }}
      >
        <div className="community-invitation-card p-5">
          <div
            className="d-flex flex-row justify-content-center mb-5"
            style={{ padding: "0" }}
          >
            <Avatar
              alt="Travis Howard"
              src={Faker.image.avatar()}
              className={classes.large}
            />
          </div>
          <div
            className="d-flex flex-row justify-content-center btn-outline-text mb-4"
            style={{ padding: "0", fontSize: "1.25rem" }}
          >
            Community Name
          </div>
          <div
            className="d-flex flex-row justify-content-center btn-outline-text"
            style={{ padding: "0", color: "#757575" }}
          >
            You have been invited to join as a member in this community.
          </div>
          <div
            className="d-flex flex-row justify-content-center btn-outline-text mt-4"
            style={{ padding: "0", color: "#757575" }}
          >
            <button className="btn btn-primary btn-outline-text me-4">
              Accept Invitation
            </button>
            <button className="btn btn-outline-primary btn-outline-text">
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptInvite;
