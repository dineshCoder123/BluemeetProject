import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { editUser, errorTrackerForEditUser } from "../../../actions";
import { DashboardSectionHeading } from "../Elements";
import Checkbox from "@mui/material/Checkbox";

const Label = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 0.9rem;
`;

const EditNotificationSettings = () => {
  const { error } = useSelector((state) => state.user);

  const { userDetails } = useSelector((state) => state.user);

  const [
    NotificationsForRegisteredEvents,
    setNotificationsForRegisteredEvents,
  ] = useState(
    userDetails ? userDetails.notificationsForRegisteredEvents : false
  );

  const [NotificationsForEventRemainder, setNotificationsForEventRemainder] =
    useState(userDetails ? userDetails.notificationsForEventRemainder : false);

  const [
    NotificationBasedOnMyPreference,
    setNotificationBasedOnMyPreference,
  ] = useState(
    userDetails ? userDetails.notificationBasedOnMyPreference : false
  );

  const dispatch = useDispatch();
  

  if (error) {
    return dispatch(errorTrackerForEditUser());
  }

  const handleSubmit = () => {
    let formValues = {};

    formValues.notificationsForRegisteredEvents =
      NotificationsForRegisteredEvents;
    formValues.notificationsForEventRemainder =
      NotificationsForEventRemainder;
    formValues.notificationBasedOnMyPreference =
      NotificationBasedOnMyPreference;

      console.log(formValues);

    dispatch(editUser(formValues));
  };

  return (
    <>
      <div className="user-account-edit-profile px-2 py-2">
        <form>
          <DashboardSectionHeading className=" mb-3">
            Manage notifications
          </DashboardSectionHeading>

          <div className="mb-3">
            <Checkbox
              onChange={(e) => {
                setNotificationsForRegisteredEvents(e.target.checked);
              }}
              checked={NotificationsForRegisteredEvents}
            />

            <Label className="ms-2">Receive Email Notifications for registered events.</Label>
          </div>
          <div className="mb-3">
            <Checkbox
              onChange={(e) => {
                setNotificationsForEventRemainder(e.target.checked);
              }}
              checked={NotificationsForEventRemainder}
            />

            <Label className="ms-2">Receive Email Notifications for event reminders.</Label>
          </div>
          <div className="mb-3">
            <Checkbox
              onChange={(e) => {
                setNotificationBasedOnMyPreference(e.target.checked);
              }}
              checked={NotificationBasedOnMyPreference}
            />

            <Label className="ms-2">
              Receive Suggested List of events based on my preference.
            </Label>
          </div>

          <div className="row edit-profile-form-row my-3 d-flex flex-row justify-content-end">
            <button
              onClick={() => {
                handleSubmit();
              }}
              type="button"
              // disabled={submitting || pristine}
              className="col-3 btn btn-primary btn-outline-text"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditNotificationSettings;
