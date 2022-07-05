import React from 'react';
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";

const ProductLibraryListFields = () => {
  return (
    <div className="team-members-list-fields-container" style={{display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.5fr", gridGap: "20px"}}>
      <div className="registrations-name-field">
        <div className="registrations-field-label mx-5">Image</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Name</div>
      </div>
      <div className="registrations-email-field">
        <div className="registrations-field-label">Description</div>
      </div>
      <div className="registrations-phone-field">
        <div className="registrations-field-label">CTA Link</div>
      </div>
      <div className="registrations-invoice-field">
        <div className="registrations-field-label">Actions</div>
      </div>
    </div>
  );
};

export default ProductLibraryListFields;
