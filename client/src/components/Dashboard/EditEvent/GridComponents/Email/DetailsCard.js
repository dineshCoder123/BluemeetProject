import React, { useState } from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../../assets/Sass/DataGrid.scss";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";

import CloudDownloadRoundedIcon from "@mui/icons-material/CloudDownloadRounded"; // Download report
import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded"; // Update report
import CircleRoundedIcon from "@mui/icons-material/CircleRounded"; // Dot indicator
import PieChartRoundedIcon from "@mui/icons-material/PieChartRounded"; // Analytics Icon

import PersonRoundedIcon from "@mui/icons-material/PersonRounded"; // Attendee

import MailOutlineOutlinedIcon from "@mui/icons-material/MailOutlineOutlined"; // Mail icon

import ModeEditOutlineRoundedIcon from "@mui/icons-material/ModeEditOutlineRounded"; // Edit mode

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded"; // Preview

import SendRoundedIcon from "@mui/icons-material/SendRounded"; // Send

import Chip from "@mui/material/Chip";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded"; // Delete

import { styled as MUIStyled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import dateFormat from "dateformat";

import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import EditIcon from "@mui/icons-material/Edit";

import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded";
import RecordVoiceOverRoundedIcon from "@mui/icons-material/RecordVoiceOverRounded";
import StorefrontRoundedIcon from "@mui/icons-material/StorefrontRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import SendTestEmail from "../../SubComponent/SendTestEmail";
import EmailConfirmation from "../../SubComponent/EmailConfirmation";
import DndEmailEditor from "../../SubComponent/DndEmailEditor";
import DeleteEmail from "../../SubComponent/Email/DeleteEmail";

import { setCurrentMailTemplate, showSnackbar } from "./../../../../../actions";

const MenuText = styled.span`
  font-weight: 500;
  font-size: 0.87rem;
  color: #212121;
`;

const ListFieldText = styled.div`
  font-family: "Ubuntu";
  font-size: 0.83rem;
  font-weight: 500;
  color: #535353;
`;

const EventReportIconBox = styled.div`
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) =>
    props && props.color ? props.color : "#538BF7"};
  color: #ffffff;
`;

const now = Date.now();

const StyledMenu = MUIStyled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const EmailDetailsCard = ({
  name,
  subject,
  lastUpdatedAt,
  status,
  id,
  html,
  design,
}) => {
  const dispatch = useDispatch();

  let everyoneEmails = [];
  let attendeeEmails = [];
  let speakerEmails = [];
  let exhibitorEmails = [];

  const { registrations } = useSelector((state) => state.registration);

  // "Attendee", "Speaker", "Exhibitor", "Host"

  for (let element of registrations) {
    everyoneEmails.push(element.userEmail);
  }
  for (let element of registrations) {
    if (element.type === "Attendee") {
      attendeeEmails.push(element.userEmail);
    }
  }
  for (let element of registrations) {
    if (element.type === "Speaker") {
      speakerEmails.push(element.userEmail);
    }
  }
  for (let element of registrations) {
    if (element.type === "Exhibitor") {
      exhibitorEmails.push(element.userEmail);
    }
  }

  const [type, setType] = useState("Attendee");

  const [openTestEmail, setOpenTestEmail] = React.useState(false);
  const [openEditMail, setOpenEditMail] = React.useState(false);
  const [openDeleteMail, setOpenDeleteMail] = React.useState(false);
  const [openEmailConfirmation, setOpenEmailConfirmation] =
    React.useState(false);

  const handleCloseTestEmail = () => {
    setOpenTestEmail(false);
  };

  const handleCloseEmailConfirmation = () => {
    setOpenEmailConfirmation(false);
  };

  const handleOpenDeleteMail = () => {
    setOpenDeleteMail(true);
  };

  const handleCloseDeleteMail = () => {
    setOpenDeleteMail(false);
  };

  const handleOpenEditMail = () => {
    setOpenEditMail(true);
  };

  const handleCloseEditMail = () => {
    setOpenEditMail(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClickMore = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "2.5fr 2.5fr 1fr 1fr 0.5fr",
          gridGap: "16px",
          alignItems: "center",
        }}
      >
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Title */}
            <div className="d-flex flex-row align-items-center">
              <EventReportIconBox className="me-3">
                <MailOutlineOutlinedIcon />
              </EventReportIconBox>
              {name}
            </div>
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {subject}
          </ListFieldText>
        </div>

        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Email status */}
            {status === "Sent" ? (
              <Chip label="Sent" color="success" variant="outlined" />
            ) : (
              <Chip label="Draft" color="primary" variant="outlined" />
            )}
          </ListFieldText>
        </div>
        <div className="">
          <ListFieldText className="" style={{ width: "100%" }}>
            {/* Last update */}
            {dateFormat(new Date(lastUpdatedAt))}
          </ListFieldText>
        </div>

        <div className="">
          <IconButton
            id="demo-customized-button"
            aria-controls="demo-customized-menu"
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            variant="outlined"
            disableElevation
            onClick={handleClickMore}
          >
            <MoreVertOutlinedIcon />
          </IconButton>

          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                handleOpenEditMail();
                dispatch(setCurrentMailTemplate(id));
                handleClose();
              }}
              disableRipple
            >
              <EditIcon />
              <MenuText>Edit</MenuText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (design && html) {
                  setOpenTestEmail(true);
                } else {
                  dispatch(
                    showSnackbar(
                      "warning",
                      "Please edit your email template body."
                    )
                  );
                }

                handleClose();
              }}
              disableRipple
            >
              <MailOutlineRoundedIcon />
              <MenuText>Send test email</MenuText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (design && html) {
                  if (
                    typeof attendeeEmails !== "undefined" &&
                    attendeeEmails.length > 0
                  ) {
                    setType("Attendee");
                    setOpenEmailConfirmation(true);
                  } else {
                    dispatch(
                      showSnackbar(
                        "info",
                        "There are no attendees yet to send email."
                      )
                    );
                  }
                } else {
                  dispatch(
                    showSnackbar(
                      "warning",
                      "Please edit your email template body."
                    )
                  );
                }

                handleClose();
              }}
              disableRipple
            >
              <PersonOutlineRoundedIcon />
              <MenuText>Send to attendees</MenuText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (design && html) {
                  if (
                    typeof speakerEmails !== "undefined" &&
                    speakerEmails.length > 0
                  ) {
                    setType("Speaker");
                    setOpenEmailConfirmation(true);
                  } else {
                    dispatch(
                      showSnackbar(
                        "info",
                        "There are no speakers to send email."
                      )
                    );
                  }
                } else {
                  dispatch(
                    showSnackbar(
                      "warning",
                      "Please edit your email template body."
                    )
                  );
                }

                handleClose();
              }}
              disableRipple
            >
              <RecordVoiceOverRoundedIcon />
              <MenuText>Send to speakers</MenuText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (design && html) {
                  if (
                    typeof exhibitorEmails !== "undefined" &&
                    exhibitorEmails.length > 0
                  ) {
                    setType("Exhibitor");
                    setOpenEmailConfirmation(true);
                  } else {
                    dispatch(
                      showSnackbar(
                        "info",
                        "There are no exhibitors to send email."
                      )
                    );
                  }
                } else {
                  dispatch(
                    showSnackbar(
                      "warning",
                      "Please edit your email template body."
                    )
                  );
                }

                handleClose();
              }}
              disableRipple
            >
              <StorefrontRoundedIcon />
              <MenuText>Send to exhibitors</MenuText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                if (design && html) {
                  setType("Everyone");
                  setOpenEmailConfirmation(true);
                } else {
                  dispatch(
                    showSnackbar(
                      "warning",
                      "Please edit your email template body."
                    )
                  );
                }

                handleClose();
              }}
              disableRipple
            >
              <ClearAllRoundedIcon />
              <MenuText>Send to everyone</MenuText>
            </MenuItem>
            <Divider sx={{ my: 0.5 }} />
            <MenuItem
              onClick={() => {
                handleOpenDeleteMail();
                handleClose();
              }}
              disableRipple
            >
              <DeleteRoundedIcon />
              <MenuText>Delete</MenuText>
            </MenuItem>
          </StyledMenu>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <SendTestEmail
        open={openTestEmail}
        handleClose={handleCloseTestEmail}
        mailId={id}
      />
      <EmailConfirmation
        type={type}
        mailId={id}
        everyoneEmails={everyoneEmails}
        speakerEmails={speakerEmails}
        attendeeEmails={attendeeEmails}
        exhibitorEmails={exhibitorEmails}
        open={openEmailConfirmation}
        handleClose={handleCloseEmailConfirmation}
      />
      {/* <DndEmailEditor open={openCreateMail} handleClose={handleCloseCreateMail} /> */}
      <DndEmailEditor
        open={openEditMail}
        handleClose={handleCloseEditMail}
        mailId={id}
        name={name}
        subject={subject}
        html={html}
        design={design}
      />
      <DeleteEmail
        open={openDeleteMail}
        handleClose={handleCloseDeleteMail}
        mailId={id}
      />
    </>
  );
};

export default EmailDetailsCard;
