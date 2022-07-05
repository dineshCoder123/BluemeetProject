import React, { useState } from "react";
import "./../Styles/Settings.scss";

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { IconButton, Divider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";

import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateRegistrationSettings } from "./../../../actions";

const RoyalBlueSwitch = withStyles({
  switchBase: {
    color: "#538BF7",
    "&$checked": {
      color: "#3474F3",
    },
    "&$checked + $track": {
      backgroundColor: "#145DF0",
    },
  },
  checked: {},
  track: {},
})(Switch);

const NotificationSettings = ({ openDrawer, handleCloseDrawer }) => {
  const dispatch = useDispatch();
  const params = useParams();

  const { id } = useSelector((state) => state.eventAccessToken);

  const userId = id;

  const eventId = params.eventId;

  let myRegistration;

  const { registrations } = useSelector((state) => state.registration);

  if (registrations) {
    myRegistration = registrations.find(
      (element) =>
        element.bookedByUser === userId && element.bookedForEventId === eventId
    );
  }

  const [messageNotifications, setMessageNotifications] = useState(
    myRegistration ? myRegistration.messageNotifications : true
  );

  const [alerts, setAlerts] = useState(
    myRegistration ? myRegistration.alerts : true
  );

  const [pollNotification, setPollNotification] = useState(
    myRegistration ? myRegistration.pollNotification : true
  );

  const [notificationSound, setNotificationSound] = useState(
    myRegistration ? myRegistration.notificationSound : true
  );

  const [emailNotifications, setEmailNotifications] = useState(
    myRegistration ? myRegistration.emailNotifications : true
  );

  const [sessionReminders, setSessionReminders] = useState(
    myRegistration ? myRegistration.sessionReminders : true
  );

  const formValues = {
    messageNotifications,
    alerts,
    pollNotification,
    notificationSound,
    emailNotifications,
    sessionReminders,
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
          anchor="right"
          open={openDrawer}
          disableBackdropTransition={true}
        >
          <div
            className="hosting-platform-settings px-4 py-4"
            style={{ minWidth: "420px" }}
          >
            <div className="d-flex flex-row align-items-center justify-content-between">
              <div className="event-platform-side-drawer-heading">
                Notification Settings
              </div>

              <IconButton
                onClick={() => {
                  handleCloseDrawer();
                }}
              >
                <CancelRoundedIcon />
              </IconButton>
            </div>

            <div className="my-3">
              <Divider />
            </div>

            <div className="px-3 py-2">
              <div>
                <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                  <div className="hosting-platform-widget-name">
                    Message notifications
                  </div>

                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <RoyalBlueSwitch
                            checked={messageNotifications}
                            onChange={(e) => {
                              setMessageNotifications(e.target.checked);

                              let newFormValues = { ...formValues };
                              newFormValues.messageNotifications =
                                e.target.checked;
                              if (myRegistration) {
                                dispatch(
                                  updateRegistrationSettings(
                                    newFormValues,
                                    myRegistration._id
                                  )
                                );
                              }
                            }}
                            name="messageNotifications"
                          />
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="my-3">
                  <Divider />
                </div>
                <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                  <div className="hosting-platform-widget-name">Alerts</div>

                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <RoyalBlueSwitch
                            checked={alerts}
                            onChange={(e) => {
                              setAlerts(e.target.checked);

                              let newFormValues = { ...formValues };
                              newFormValues.alerts = e.target.checked;
                              if (myRegistration) {
                                dispatch(
                                  updateRegistrationSettings(
                                    newFormValues,
                                    myRegistration._id
                                  )
                                );
                              }
                            }}
                            name="alerts"
                          />
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="my-3">
                  <Divider />
                </div>
                <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                  <div className="hosting-platform-widget-name">
                    Poll notification
                  </div>

                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <RoyalBlueSwitch
                            checked={pollNotification}
                            onChange={(e) => {
                              setPollNotification(e.target.checked);

                              let newFormValues = { ...formValues };
                              newFormValues.pollNotification = e.target.checked;
                              if (myRegistration) {
                                dispatch(
                                  updateRegistrationSettings(
                                    newFormValues,
                                    myRegistration._id
                                  )
                                );
                              }
                            }}
                            name="pollNotification"
                          />
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="my-3">
                  <Divider />
                </div>
                <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                  <div className="hosting-platform-widget-name">
                    Notification sound
                  </div>

                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <RoyalBlueSwitch
                            checked={notificationSound}
                            onChange={(e) => {
                              setNotificationSound(e.target.checked);
                              let newFormValues = { ...formValues };
                              newFormValues.notificationSound =
                                e.target.checked;
                              if (myRegistration) {
                                dispatch(
                                  updateRegistrationSettings(
                                    newFormValues,
                                    myRegistration._id
                                  )
                                );
                              }
                            }}
                            name="notificationSound"
                          />
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="my-3">
                  <Divider />
                </div>
                <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between pt-2">
                  <div className="hosting-platform-widget-name">
                    Email notifications
                  </div>
                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <RoyalBlueSwitch
                            checked={emailNotifications}
                            onChange={(e) => {
                              setEmailNotifications(e.target.checked);

                              let newFormValues = { ...formValues };
                              newFormValues.emailNotifications =
                                e.target.checked;

                              if (myRegistration) {
                                dispatch(
                                  updateRegistrationSettings(
                                    newFormValues,
                                    myRegistration._id
                                  )
                                );
                              }
                            }}
                            name="emailNotifications"
                          />
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="my-3">
                  <Divider />
                </div>
                <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between pt-2">
                  <div className="hosting-platform-widget-name">
                    Session reminders
                  </div>
                  <div>
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <RoyalBlueSwitch
                            checked={sessionReminders}
                            onChange={(e) => {
                              setSessionReminders(e.target.checked);
                              let newFormValues = { ...formValues };

                              newFormValues.sessionReminders = e.target.checked;
                              if (myRegistration) {
                                dispatch(
                                  updateRegistrationSettings(
                                    newFormValues,
                                    myRegistration._id
                                  )
                                );
                              }
                            }}
                            name="sessionReminders"
                          />
                        }
                      />
                    </FormGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default NotificationSettings;
