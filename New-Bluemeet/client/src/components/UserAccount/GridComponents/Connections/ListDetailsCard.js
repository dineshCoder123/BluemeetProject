import React from "react";
import Faker from "faker";
import { Avatar } from "@material-ui/core";
import Chip from "@mui/material/Chip";
import Divider from "@material-ui/core/Divider";
import "./../../../../assets/Sass/DataGrid.scss";

const ListDetailsCard = () => {
  return (
    <>
      <div
        className="session-list-fields-container"
        style={{
          gridTemplateColumns: "4fr 3fr 2.5fr 2.5fr 2.5fr 3fr",
          gridGap: "16px",
          alignItems: "center",
        }}
      >
        <div className="">
          <div
            className=" d-flex flex-row align-items-center"
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            <Avatar src={Faker.image.avatar()} />
            <span className="ms-3"> {Faker.name.findName()} </span>
          </div>
        </div>
        <div className="">
          <div
            className=""
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            {Faker.internet.email()}
          </div>
        </div>
        <div className="">
          <div
            className=""
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            {Faker.company.companyName()}
          </div>
        </div>
        <div className="">
          <div
            className=""
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            {"Product manager"}
          </div>
        </div>
        <div className="">
          <div
            className=""
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            <Chip label="Connected" variant="outlined" color="success" />
          </div>
        </div>
        <div className="">
          <div
            className="d-flex flex-row align-items-center"
            style={{ width: "100%", fontWeight: "500", fontSize: "0.8rem" }}
          >
            <button className="btn btn-outline-text btn-primary">Accept</button>
            <button className="btn btn-outline-text btn-outline-danger ms-3">Reject</button>
            {/* // * NOTE: When connection is accepted then show disconnect and msg button */}
            {/* // * NOTE: When connection is not accpeted then show accept or reject button.  */}
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
    </>
  );
};

export default ListDetailsCard;
