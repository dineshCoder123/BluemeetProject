import React from 'react';
import './../../../assets/Sass/DataGrid.scss';
import './../../../assets/Sass/TeamManagement.scss';

const TeamMembersListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{gridTemplateColumns: "2fr 2fr 2fr 1fr 1fr"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-name-field">
        <div className="registrations-field-label">Role</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Email</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Status</div>
      </div>
      
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default TeamMembersListFields;
