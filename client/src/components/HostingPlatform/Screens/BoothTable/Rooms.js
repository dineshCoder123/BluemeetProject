import React, { useEffect } from "react";
import "./../../Styles/rooms.scss";
import Room from "./Room";
import { useDispatch, useSelector } from "react-redux";
import Loader from "./../../../Loader";
import socket from "./../../service/socket";

import { getBoothTables, fetchBoothChairs } from "../../../../actions";

const RenderBoothTables = (tables) => {
  if (!tables) return;
  return tables.map((table, index) => {
    return (
      <Room
        id={table.tableId}
        num={index + 1}
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${table.image}`}
        title={table.title}
        rawImage={table.image}
        priority={table.priority}
      />
    );
  });
};

const Rooms = () => {
  const dispatch = useDispatch();

  const { currentBoothId } = useSelector((state) => state.booth);

  const { boothTables } = useSelector((state) => state.boothTables);

  window.onbeforeunload = () => {
    // window.alert("closing now.....");
  };

  useEffect(() => {
    dispatch(getBoothTables(currentBoothId));
  }, []);

  if (!boothTables) {
    return <Loader />;
  }

  return (
    <>
      <div className="rooms-grid-layout ">{RenderBoothTables(boothTables)}</div>
    </>
  );
};

export default Rooms;
