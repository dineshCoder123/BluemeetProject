import React from 'react';
import Faker from 'faker';

import { Avatar } from '@material-ui/core';


const TableInvitationAlert = () => {
    return (
      <>
        <div className="general-alert-container px-4 py-3 mb-3">
          <div
            className=" mb-4"
            style={{ display: "grid", gridTemplateColumns: "1fr 6fr" }}
          >
            <Avatar
              src={Faker.image.avatar()}
              alt={Faker.name.findName()}
              variant="rounded"
            />
            <div
              className="chat-box-name ms-3"
              style={{ textTransform: "capitalize", fontFamily: "Ubuntu" }}
            >
              <div>{Faker.name.findName()}</div>
  
              <div
                style={{
                  fontWeight: "500",
                  color: "#4B4B4B",
                  fontSize: "0.7rem",
                }}
                className="d-flex flex-row align-items-center justify-content-between"
              >
                <div>Product Manager, Evenz</div>
  
                <div>3m ago</div>
              </div>
            </div>
          </div>
  
          <div className="alert-text mb-3">
            Invited you to Table 24 <b> Artificial Intelligence </b> 
          </div>
        </div>
      </>
    );
  };

  export default TableInvitationAlert;