import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";

import React from "react";
import { google, outlook, office365, yahoo, ics } from "calendar-link";
import Select from "react-select";

const timelineOptions = [
  { value: "minutes", label: "minutes" },
  { value: "hours", label: "hours" },
  { value: "days", label: "days" },
  { value: "weeks", label: "weeks" },
];

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.8rem",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    color: "#757575",
    fontSize: "0.8rem",
  }),
};

const WidgetHeadlineWithClose = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #152d35;

  border-bottom: 1px solid #152d35;
`;

const SetReminderPaper = styled.div`
  background-color: #ffffff;
  height: auto;
  width: 400px;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  font-family: "Ubuntu";
  color: #152d35;

  margin-bottom: 6px;
`;

const CustomAddToCalander = styled.div`
  height: 40px;
  width: 40px;
  padding: 4px;

  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 3px #00000029;
  border-radius: 10px;
  opacity: 1;

  object-fit: contain;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 6px 6px #00000029;
  }
`;

const MeetingNotificationInputGrid = styled.div`
  display: grid;
  grid-template-columns: 0.3fr 1fr 1fr;
  grid-gap: 10px;
  align-items: center;
`;

const ButtonOutlinedDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  color: #152d35;
  background-color: transparent;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    background-color: #152d35;

    color: #ffffff;

    cursor: pointer;
  }
`;

const SetReminder = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  // Set event as an object
  const event = {
    title: "My birthday party",
    description: "Be there!",
    start: "2019-12-29 18:00:00 +0100",
    duration: [3, "hour"],
  };

  // Then fetch the link
  google(event); // https://calendar.google.com/calendar/render...
  outlook(event); // https://outlook.live.com/owa/...
  office365(event); // https://outlook.office.com/owa/...
  yahoo(event); // https://calendar.yahoo.com/?v=60&title=...
  ics(event); // standard ICS file based on https://icalendar.org

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        // maxWidth={"668px"}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <SetReminderPaper className="px-4 py-3">
          <WidgetHeadlineWithClose className="pb-1 mb-4">
            <div>Set Reminder</div>
            <div style={{ textAlign: "end" }}>
              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </WidgetHeadlineWithClose>

          <FormLabel className="mb-3">Personal note</FormLabel>

          <textarea className="form-control mb-4"></textarea>

          <FormLabel className="mb-3">Add to calander (Recommended) </FormLabel>

          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <a href={google(event)} target="_blank" rel="noreferrer">
              <CustomAddToCalander className="p-2">
                <img
                  style={{ objectFit: "contain" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png"
                  alt="google png"
                />
              </CustomAddToCalander>
            </a>
            <a href={ics(event)} target="_blank" rel="noreferrer">
              <CustomAddToCalander className="p-2">
                <img
                  style={{ objectFit: "contain" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/842px-Apple_logo_black.svg.png"
                  alt="google png"
                />
              </CustomAddToCalander>
            </a>
            <a href={outlook(event)} target="_blank" rel="noreferrer">
              <CustomAddToCalander>
                <img
                  style={{ objectFit: "contain" }}
                  src="https://i.gadgets360cdn.com/large/outlook_main_1568724579940.jpg?downsize=950:*"
                  alt="google png"
                />
              </CustomAddToCalander>
            </a>
            <a href={office365(event)} target="_blank" rel="noreferrer">
              <CustomAddToCalander>
                <img
                  style={{ objectFit: "contain" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png"
                  alt="google png"
                />
              </CustomAddToCalander>
            </a>
            <a href={yahoo(event)} target="_blank" rel="noreferrer">
              <CustomAddToCalander>
                <img
                  style={{ objectFit: "contain" }}
                  src="https://www.freepnglogos.com/uploads/yahoo-logo-png/yahoo-icon-logo-transparent-png-10.png"
                  alt="google png"
                />
              </CustomAddToCalander>
            </a>
          </div>

          <FormLabel className="mb-3">Notification</FormLabel>

          <MeetingNotificationInputGrid className="mb-5">
            <CircleNotificationsIcon />
            <input
              type="number"
              className="form-control"
              placeholder="10"
            ></input>

            <Select
              defaultValue={timelineOptions[0]}
              styles={styles}
              menuPlacement={"top"}
              name={"notificationTimeline"}
              options={timelineOptions}
            />
          </MeetingNotificationInputGrid>

          <ButtonOutlinedDark>Set reminder</ButtonOutlinedDark>
        </SetReminderPaper>
      </Dialog>
    </>
  );
};

export default SetReminder;
