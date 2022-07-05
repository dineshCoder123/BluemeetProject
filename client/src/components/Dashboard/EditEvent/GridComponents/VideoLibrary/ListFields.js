import React from "react";
import "./../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../assets/Sass/TeamManagement.scss";

const VideoLibraryListFields = () => {
  return (
    <div className="team-members-list-fields-container">
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Video Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Date</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Time</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default VideoLibraryListFields;
