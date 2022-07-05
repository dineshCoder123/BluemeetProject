import React from 'react';
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";

const FileLibraryListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr 0.5fr"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label ">Preview</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">No. of Downloads</div>
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

export default FileLibraryListFields;
