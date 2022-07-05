import React from "react";
import Divider from "@material-ui/core/Divider";
import './../../../assets/Sass/DataGrid.scss';

const SponsorsListFields = () => {
  return (
      <>
    <div className="sponsors-list-fields-container" style={{gridTemplateColumns: " 1fr 1.6fr 1.3fr 1fr 0.5fr", alignItems: "center"}}>
    
      <div className="event-card-field">
        <div className="event-field-label" style={{width: '100%'}}>Logo</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label" style={{width: '100%'}}>Name</div>
      </div>
      <div className="event-views-field">
        <div className="event-field-label" style={{width: '100%'}}>Website</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label" style={{width: '100%'}}>Tier</div>
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

export default SponsorsListFields;
