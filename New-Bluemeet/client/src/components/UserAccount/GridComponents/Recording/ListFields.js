import React from "react";
import "./../../../../assets/Sass/DataGrid.scss";

import styled from "styled-components";

const ListFieldsStyled = styled.div`
  font-weight: 500;
  font-size: 0.85rem;
  font-family: "Ubuntu";
  color: #152d35;
`;

const RecordingsListFields = () => {
  return (
    <div className="registrations-list-fields-container">
      <div className="registrations-name-field" style={{justifySelf: "start"}}>
        <ListFieldsStyled className=" mx-5">Session Name</ListFieldsStyled>
      </div>
      <div className="registrations-email-field">
        <ListFieldsStyled className="">Event Name</ListFieldsStyled>
      </div>
      <div className="registrations-phone-field">
        <ListFieldsStyled className="">Duration</ListFieldsStyled>
      </div>
      <div className="registrations-amount-field">
        <ListFieldsStyled className="">Quality</ListFieldsStyled>
      </div>
      
      <div className="registrations-invoice-field">
        <ListFieldsStyled className="">Download</ListFieldsStyled>
      </div>
    </div>
  );
};

export default RecordingsListFields;
