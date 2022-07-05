import React from 'react';
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";

const PromoCodesListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{display: "grid", gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 0.5fr"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Instruction</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Code</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Discount</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">Clicks</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default PromoCodesListFields;
