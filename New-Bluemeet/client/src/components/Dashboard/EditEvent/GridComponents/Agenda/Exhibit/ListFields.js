import React from "react";
import Divider from "@material-ui/core/Divider";
import "./../../../../../../assets/Sass/DataGrid.scss";

const ExhibitListFields = () => {
  return (
      <>
    <div className="session-list-fields-container" style={{gridTemplateColumns: "2fr 3fr 3fr 1.5fr", gridGap: "32px"}}>
      <div className="event-card-field">
        <div className="event-field-label" style={{width: '100%'}}>Name</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label" style={{width: '100%'}}>Duration</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label" style={{width: '100%'}}>Moderators</div>
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

export default ExhibitListFields;
