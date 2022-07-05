import React from "react";
import Divider from "@material-ui/core/Divider";
import './../../../assets/Sass/DataGrid.scss';

const TicketingListFields = () => {
  return (
      <>
    <div className="ticketing-list-fields-container">
      <div className="event-card-field">
        <div className="event-field-label" style={{width: '100%'}}>Title</div>
      </div>
      <div className="event-visibility-field">
        <div className="event-field-label" style={{width: '100%'}}>Description</div>
      </div>
      <div className="event-views-field">
        <div className="event-field-label" style={{width: '100%'}}>Amount</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label" style={{width: '100%'}}>Available</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label" style={{width: '100%'}}>Sold</div>
      </div>
      <div className="event-status-field">
        <div className="event-field-label" style={{width: '100%'}}>Status</div>
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

export default TicketingListFields;
