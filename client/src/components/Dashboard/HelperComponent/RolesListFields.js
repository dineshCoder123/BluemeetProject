import React from 'react';
import './../../../assets/Sass/DataGrid.scss';
import './../../../assets/Sass/TeamManagement.scss';

const RolesListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{gridTemplateColumns: "1.8fr 2fr 1fr 1fr 1fr"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Title</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Assigned to</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Last updated at</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Last updated by</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label" style={{justifySelf: "center !important"}}>Actions</div>
      </div>
    </div>
  );
};

export default RolesListFields;
