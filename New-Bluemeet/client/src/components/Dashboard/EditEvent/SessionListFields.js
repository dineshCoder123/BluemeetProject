import React from "react";
import Divider from "@material-ui/core/Divider";
import './../../../assets/Sass/DataGrid.scss';

const SessionListFields = () => {
  return (
      <>
    <div className="session-list-fields-container">
      <div className="event-card-field">
        <div className="event-field-label" style={{width: '100%'}}>Name</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label" style={{width: '100%'}}>Duration</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label" style={{width: '100%', justifySelf: "center"}}>Type</div>
      </div>
      <div className="event-views-field">
        <div className="event-field-label" style={{width: '100%'}}>Speakers</div>
      </div>
      <div className="event-registrations-field">
        <div className="event-field-label" style={{width: '100%'}}>Actions</div>
      </div>
    </div>
    <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
    
  );
};

export default SessionListFields;
