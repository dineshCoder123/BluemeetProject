import React from 'react';
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";

const LinkLibraryListFields = () => {
  return (
    <div className="team-members-list-fields-container">
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">No. of Clicks</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">URL</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default LinkLibraryListFields;
