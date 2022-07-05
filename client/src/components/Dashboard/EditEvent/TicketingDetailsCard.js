import React from "react";

import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./../../../assets/Sass/DataGrid.scss";

import Chip from "@mui/material/Chip";

import ConfirmationNumberOutlinedIcon from "@material-ui/icons/ConfirmationNumberOutlined";
import Ripple from "../../ActiveStatusRipple";
import EditTicket from "./FormComponents/EditTicketForms/EditTicket";
import DeleteTicket from "./FormComponents/EditTicketForms/DeleteTicket";
import { fetchTicket } from "../../../actions";
import { useDispatch } from "react-redux";

const TicketingDetailsCard = (props) => {
  const [open, setOpen] = React.useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  const handleDeleteTicket = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteTicket = () => {
    setOpenDeleteDialog(false);
  };
  const dispatch = useDispatch();
  const handleEditTicket = () => {
    dispatch(fetchTicket(props.id));
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const truncateText = (str, n) => {
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  return (
    <>
      <div className="ticketing-list-fields-container">
        <div
          className="event-card-field"
          style={{
            width: "100%",
          }}
        >
          <div className="registrations-name-field">
            <div className="registrations-field-label d-flex flex-row justify-content-start">
              {/* attendee avatar and name */}
              <ConfirmationNumberOutlinedIcon
                className="me-2"
                style={{ fontSize: "22px", fill: "#538BF7" }}
              />

              {/* {props.name} */}
              {truncateText(props.name, 20)}
            </div>
          </div>
        </div>
        <div
          className="event-visibility-field"
          style={{
            width: "100%",
          }}
        >
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            {/* {props.description} */}
            {truncateText(props.description, 35)}
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
            {/* Here we need to show chips with label Free or Donation if its not paid ticket */}
            {(() => {
              switch (props.type) {
                case "Free":
                  return (
                    <Chip label="Free" color="primary" variant="outlined" />
                  );

                case "Paid":
                  return `${props.currency} ${props.price}`;

                case "Donation":
                  return (
                    <Chip label="Donation" color="primary" variant="outlined" />
                  );
                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div
          className="event-views-field"
          style={{
            width: "100%",
          }}
        >
          <div className="registrations-field-label">{`${props.unitsAvailable} units`}</div>
        </div>
        <div
          className="event-views-field"
          style={{
            width: "100%",
          }}
        >
          <div className="event-field-label registrations-field-label">
            <div className="speaker-card-session-grid">{`${props.unitsSold} units`}</div>
          </div>
        </div>
        <div className="event-running-status-field">
          <div
            className="d-flex flex-row"
            style={{
              width: "100%",
            }}
          >
            <div
              className="d-flex flex-row align-items-center event-field-label field-label-value"
              style={{ color: "#75BF72" }}
            >
              {props.active === true ? (
                <div className="d-flex flex-row">
                  {" "}
                  <Ripple /> Active{" "}
                </div>
              ) : (
                <div style={{ color: "#B83838" }}>Inactive</div>
              )}
            </div>
          </div>
        </div>
        <div className="event-registrations-field">
          <div
            className="event-field-label registrations-field-label"
            style={{ width: "100%" }}
          >
            <div
              onClick={() => {
                handleEditTicket();
              }}
            >
              <IconButton color="primary" aria-label="add to shopping cart">
                <EditRoundedIcon />
              </IconButton>
            </div>
            <div
              onClick={() => {
                handleDeleteTicket();
              }}
            >
              <IconButton color="secondary" aria-label="add to shopping cart">
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      <EditTicket
        ticketType={props.type}
        open={open}
        handleClose={handleClose}
        id={props.id}
      />
      <DeleteTicket
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteTicket={handleCloseDeleteTicket}
        id={props.id}
      />
    </>
  );
};

export default TicketingDetailsCard;