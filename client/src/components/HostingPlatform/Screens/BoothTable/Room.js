/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./../../Styles/rooms.scss";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import socket from "./../../service/socket";
import { useDispatch, useSelector } from "react-redux";

import Chair1 from "./Chair/Chair_1";
import Chair2 from "./Chair/Chair_2";
import Chair3 from "./Chair/Chair_3";
import Chair4 from "./Chair/Chair_4";
import Chair5 from "./Chair/Chair_5";
import Chair6 from "./Chair/Chair_6";
import Chair7 from "./Chair/Chair_7";
import Chair8 from "./Chair/Chair_8";

import TableScreen from "./TableScreen";

import styled from "styled-components";
import EditBoothTable from "./EditBoothTable";
import {
  getBoothTable,
  fetchNumberOfPeopleOnBoothTable,
  fetchBoothTableDetails,
  fetchBoothChairs
} from "../../../../actions";

const RoomTitle = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #ffffff;
  font-size: 0.83rem;
`;
const RoomWraper = styled.div`
  background-color: #345b63 !important;

  &:hover {
    border: 1px solid #dcc7be;
  }
`;

const RoomNumber = styled.div`
  color: #dcc7be;
`;

const Room = ({ id, num, image, title, rawImage, priority }) => {
  const [openEditTable, setOpenEditTable] = React.useState(false);

  const [openTableScreen, setOpenTableScreen] = useState(false);

  const handleCloseEditTable = () => {
    setOpenEditTable(false);
  };

  const launchTableScreen = () => {
    setOpenTableScreen(true);
  };

  const closeTableScreen = () => {
    setOpenTableScreen(false);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("numberOfPeopleOnBoothTable", ({ numberOfPeopleOnTable }) => {
      dispatch(fetchNumberOfPeopleOnBoothTable(numberOfPeopleOnTable));
    });

    socket.on("boothTable", ({ boothTable }) => {
      dispatch(fetchBoothTableDetails(boothTable));
    });

    socket.on("updatedBoothTable", ({ tableDetails }) => {
      dispatch(fetchBoothTableDetails(tableDetails));
    });

    

  }, []);

  return (
    <>
      <RoomWraper className="room-wrapper px-4 py-3">
        <div className="room-num-and-edit-wrapper d-flex flex-row justify-content-between align-items-center">
          <RoomNumber className="room-number">{num}</RoomNumber>
          <IconButton
            aria-label="edit-room-details"
            onClick={() => {
              setOpenEditTable(true);
              dispatch(getBoothTable(id));
            }}
          >
            <EditRoundedIcon style={{ fontSize: "20", fill: "#ffffff" }} />
          </IconButton>
        </div>

        <div className="upper-chair-row mt-3">
          {/* // Upper_1_Chair */}
          {/* <div>
            <UPPER_1_CHAIR id={id} launchTableScreen={launchTableScreen} />
          </div> */}

          {/* // UPPER_2_CHAIR */}
          <div className="me-2">
            <Chair2 id={id} launchTableScreen={launchTableScreen} />
          </div>

          {/* // UPPER_3_CHAIR */}
          <div className="ms-2">
            <Chair3 id={id} launchTableScreen={launchTableScreen} />
          </div>
        </div>

        <div className="mid-l-r-chair-and-table d-flex flex-row">
          <div className="col-3 left-chair-row">
            {/* //Left Chair */}

            <Chair8 id={id} launchTableScreen={launchTableScreen} />
          </div>

          <div className="room-table px-3 py-4">
            <div className="table-logo-container px-2 py-2">
              {(() => {
                switch (priority) {
                  case "Logo":
                    return rawImage ? (
                      <img
                        src={image}
                        alt="logo"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <></>
                    );

                  case "Title":
                    return title ? (
                      <div
                        className="d-flex flex-row align-items-center justify-content-center"
                        style={{ height: "100%" }}
                      >
                        <RoomTitle>{title}</RoomTitle>
                      </div>
                    ) : (
                      <></>
                    );

                  default:
                    break;
                }
              })()}
            </div>
          </div>

          <div className="col-3 right-chair-row">
            {/* // Right Chair */}
            <Tooltip title="This is the tooltip">
              <Chair4
                style={{ width: "140px" }}
                id={id}
                launchTableScreen={launchTableScreen}
              />
            </Tooltip>
          </div>
        </div>

        <div className="lower-chair-row mb-3">
          {/*LOWER_5_CHAIR */}
          {/* <LOWER_5_CHAIR id={id} launchTableScreen={launchTableScreen} /> */}

          {/* // LOWER_6_CHAIR */}
          <div className="me-2">
            <Chair6 id={id} launchTableScreen={launchTableScreen} />
          </div>

          {/* // LOWER_7_CHAIR */}
          <div className="ms-2">
            <Chair7 id={id} launchTableScreen={launchTableScreen} />
          </div>
        </div>
      </RoomWraper>

      {/* Table Screen here */}

      {openTableScreen && (
        <TableScreen
          openTableScreen={openTableScreen}
          launchTableScreen={launchTableScreen}
          closeTableScreen={closeTableScreen}
          id={id}
        />
      )}

      <EditBoothTable
        open={openEditTable}
        handleClose={handleCloseEditTable}
        tableId={id}
      />
    </>
  );
};

export default Room;

// DONE => Edit Booth Table , DONE => Table Screen , DONE => getBoothTable
