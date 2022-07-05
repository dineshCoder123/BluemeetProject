import React from 'react';
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";

const VideoLibraryListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr 1fr 0.5fr",  gridGap: "24px"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Preview</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label">Video Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Date</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Timestamp</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default VideoLibraryListFields;
