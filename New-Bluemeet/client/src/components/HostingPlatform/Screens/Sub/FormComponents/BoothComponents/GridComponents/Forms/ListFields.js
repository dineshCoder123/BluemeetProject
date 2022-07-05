// name formId clicks preview actions
import React from 'react';
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";

const FormsListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 0.5fr"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Form Id</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Clicks</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Preview</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default FormsListFields;
