import React from "react";

const ApiKeysListFields = () => {
  return (
    <div className="events-list-fields-container" style={{display: "grid", gridTemplateColumns: "1.5fr 2fr 2fr 1fr 0.3fr"}}>
      <div className="event-edit-field">
        <div className="event-field-label">Label</div>
      </div>
      <div className="event-card-field">
        <div className="event-field-label">Api key</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label">Secret</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label">Status</div>
      </div>
      <div className="event-views-field">
        <div className="event-field-label">Actions</div>
      </div>
    </div>
  );
};

export default ApiKeysListFields;
