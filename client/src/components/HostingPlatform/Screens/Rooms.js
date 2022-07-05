import React, { useEffect } from "react";
import "./../Styles/rooms.scss";
import Room from "./../HelperComponents/Room";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "./../../Loader";
import socket from "../service/socket";

import { fetchChairArrangement, getEventTables } from "../../../actions";

const RenderEventTables = (tables) => {
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
  const params = useParams();
  const eventId = params.eventId;

  const { eventTables } = useSelector((state) => state.eventTables);

  useEffect(() => {
    dispatch(getEventTables(eventId));
    socket.on("roomChairData", ({ roomChairs }) => {
      dispatch(fetchChairArrangement(roomChairs));
    });
  }, []);

  if (!eventTables) {
    return <Loader />;
  }

  return (
    <>
      <div className="rooms-grid-layout ">{RenderEventTables(eventTables)}</div>
    </>
  );
};

export default Rooms;
