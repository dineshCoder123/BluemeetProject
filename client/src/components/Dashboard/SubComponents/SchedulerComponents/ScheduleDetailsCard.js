import React, { useState } from "react";
import "./../../../../index.css";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./../../../../assets/Sass/DataGrid.scss";
import { Divider } from "@material-ui/core";
import ViewAndEditMailList from "./SubComponent/ViewAndEditMailList";

const ScheduleDetailsCard = () => {

    const [openMailList, setOpenMailList] = useState(false);

    const handleOpenMailList = () => {
        setOpenMailList(true);
    }

    const handleCloseMailList = () => {
        setOpenMailList(false);
    }

  return (
    <>
      <div
        className="registrations-list-fields-container"
        style={{ gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr" }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">
            {/* Mail to card */}
            {/* <div>{Faker.internet.email()} + 296</div> */}
            <div
            onClick={handleOpenMailList}
              className="me-3 px-3 py-2 user-registration-status-chip email-list-group"
              style={{ backgroundColor: "#D3DDF1", color: "#212121" }}
            >
              {"Eureka conference attendees"}
            </div>
          </div>
        </div>
        <div
          className="registrations-email-field"
          style={{ justifySelf: "center" }}
        >
          <div className="registrations-field-label">
            <button className="btn btn-outline-primary btn-outline-text">
              View & edit
            </button>
          </div>
        </div>
        <div
          className="registrations-phone-field"
          style={{ justifySelf: "center" }}
        >
          <div className="registrations-field-label">
            <div className="me-3 px-3 py-2 user-registration-status-chip">
              {"Queued"}
            </div>
          </div>
        </div>

        <div
          className="registrations-amount-field"
          style={{ justifySelf: "center" }}
        >
          <div className="registrations-field-label">
            {"08 Sep, 2021 8:30 PM"}
          </div>
        </div>
        <div
          className="registrations-ticket-type-field"
          style={{ justifySelf: "center" }}
        >
          <div className="registrations-field-label">
            <div
              className="event-field-label registrations-field-label"
              style={{ width: "100%" }}
            >
              <div
                onClick={() => {
                  // dispatch(fetchBooth(props.id));
                  // handleEditBooth();
                }}
              >
                <IconButton color="primary" aria-label="add to shopping cart">
                  <EditRoundedIcon />
                </IconButton>
              </div>
              <div
                onClick={() => {
                  // handleDeleteBooth()
                }}
              >
                <IconButton color="secondary" aria-label="add to shopping cart">
                  <DeleteRoundedIcon />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <ViewAndEditMailList openDrawer={openMailList} handleCloseDrawer={handleCloseMailList} />
    </>
  );
};

export default ScheduleDetailsCard;
