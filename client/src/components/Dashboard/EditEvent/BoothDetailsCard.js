import React from "react";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./../../../assets/Sass/DataGrid.scss";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import EditBooth from "./FormComponents/EditBoothsForms/EditBooth";
import DeleteBooth from "./FormComponents/EditBoothsForms/DeleteBooth";
import { useDispatch } from "react-redux";
import {
  fetchBooth,
  sendBoothInvitation,
  showSnackbar,
} from "../../../actions";
import MailIcon from "@mui/icons-material/Mail";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Chip from "@mui/material/Chip";

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
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const BoothDetailsCard = ({
  id,
  boothTags,
  name,
  emails,
  url,
  invitationLink,
}) => {
  const [open, setOpen] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const dispatch = useDispatch();
  const handleDeleteBooth = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteBooth = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditBooth = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  const truncateText = (str, n) => {
    if (!str) return;
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  return (
    <>
      <div>
        <div
          className="session-field-value-container"
          style={{
            gridTemplateColumns: "4fr 3fr 2.5fr 2fr 3fr",
            gridGap: "24px",
            alignItems: "center",
          }}
        >
          <div
            className="event-card-field "
            style={{
              width: "100%",
            }}
          >
            <div className="registrations-name-field">
              <div className="registrations-field-label d-flex flex-row justify-content-start">
                <Avatar
                  alt={name}
                  src={url}
                  variant="rounded"
                  className={classes.large}
                />
                <div
                  className="ms-3 px-2 registration-name-styled"
                  style={{ fontFamily: "Inter" }}
                >
                  {truncateText(name, 25)}
                </div>
              </div>
            </div>
          </div>

          <div
            className="event-status-field"
            style={{
              width: "100%",
            }}
          >
            <div
              className="event-field-label registrations-field-label d-flex flex-column align-items-start"
              style={{ width: "100%" }}
            >
              {emails &&
                emails.map((email) => {
                  return (
                    <Chip
                      label={truncateText(email, 20)}
                      color="primary"
                      variant="outlined"
                    />
                  );
                })}
            </div>
          </div>
          <div
            className="event-views-field"
            style={{
              width: "100%",
            }}
          >
            <div className="event-field-label registrations-field-label">
              <div
                className="speaker-card-session-grid"
                style={{ gridTemplateColumns: "1fr" }}
              >
                {  boothTags && typeof boothTags !== "undefined" && boothTags.length > 0 ? (
                  boothTags.map((boothTag) => {
                    return (
                      <Chip
                        label={truncateText(boothTag, 35)}
                        color="secondary"
                        variant="outlined"
                      />
                    );
                  })
                ) : (
                  <Chip
                    label={"No tags"}
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </div>
            </div>
          </div>
          <div
            className="event-views-field"
            style={{
              width: "100%",
            }}
          >
            <div className="event-field-label registrations-field-label">
              <Chip
                label={"Sent"}
                color="success"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className="event-registrations-field">
            <div
              className="event-field-label registrations-field-label"
              style={{ width: "100%" }}
            >
              <div
                onClick={() => {
                  dispatch(fetchBooth(id));
                  handleEditBooth();
                }}
              >
                <IconButton color="primary" aria-label="add to shopping cart">
                  <EditRoundedIcon />
                </IconButton>
              </div>
              <div onClick={handleDeleteBooth}>
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <DeleteRoundedIcon />
                </IconButton>
              </div>
              <div
                onClick={() => {
                  dispatch(sendBoothInvitation(id));
                }}
              >
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <MailIcon style={{ color: "#1351C5" }} />
                </IconButton>
              </div>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(invitationLink).then(
                    function () {
                      console.log(
                        "Async: Copying to clipboard was successful!"
                      );
                      dispatch(showSnackbar("success", "Copied to clipboard!"));
                    },
                    function (err) {
                      console.error("Async: Could not copy text: ", err);
                      dispatch(
                        showSnackbar("error", "Failed to copy to clipboard!")
                      );
                    }
                  );
                }}
              >
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <ContentCopyIcon style={{ color: "#A113C5" }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
        <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
          <Divider />
        </div>
      </div>

      <EditBooth open={open} handleClose={handleClose} id={id} />
      <DeleteBooth
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteBooth={handleCloseDeleteBooth}
        id={id}
      />
    </>
  );
};

export default BoothDetailsCard;
