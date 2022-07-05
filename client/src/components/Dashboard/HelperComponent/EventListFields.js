import React from "react";
import './../../../assets/Sass/DataGrid.scss';

const EventListFields = () => {
  return (
    <div className="events-list-fields-container">
      <div className="event-card-field ">
        <div className="event-field-label ms-3">Event</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label">Visibility</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label">Status</div>
      </div>
      <div className="event-views-field">
        <div className="event-field-label">Views</div>
      </div>
      <div className="event-registrations-field">
        <div className="event-field-label">Registrations</div>
      </div>
      <div className="event-running-status-field">
        <div className="event-field-label">Running Status</div>
      </div>
      <div className="event-stage-field">
        <div className="event-field-label">Actions</div>
      </div>
    </div>
  );
};

export default EventListFields;
