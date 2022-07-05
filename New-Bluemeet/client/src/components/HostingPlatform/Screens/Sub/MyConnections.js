/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import styled from "styled-components";
import MyConnectionsDetailsCard from "./Helper/MyConnectionsDetailsCard";
import MyConnectionsListFields from "./Helper/MyConnectionsListFields";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyConnections } from "./../../../../actions";

const MyConnections = () => {
  const dispatch = useDispatch();

  const { connections } = useSelector((state) => state.connections);
  const { id } = useSelector((state) => state.eventAccessToken);

  useEffect(() => {
    dispatch(fetchMyConnections());
  }, []);

  const renderConnections = (connections, currentUserId) => {
    return connections
      .slice(0)
      .reverse()
      .map((connection) => {
        let connectionName;
        let connectionImage;
        let connectionOrganisation;
        let connectionDesignation;
        let connectionStatus;
        let connectionId;

        // Return if the connection request is cancelled
        if (connection.cancelled) return;

        // Return if the connection request is Rejected
        if (connection.status === "Rejected") return;

        // Return if not both requestedByUser and requestedToUser are present
        if (!connection.requestedByUser || !connection.requestedToUser) return;

        // Determine if I have requested this connection or someone else requested to connect with me

        if (connection.requestedByUser._id === currentUserId) {
          // I have requested this connection and

          // * Assign appropriate values to above declared variables

          connectionName =
            connection.requestedToUser.firstName +
            " " +
            connection.requestedToUser.lastName;
          connectionImage = connection.requestedToUser.image
            ? connection.requestedToUser.image.startsWith("https://")
              ? connection.requestedToUser.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${connection.requestedToUser.image}`
            : "#";

          connectionOrganisation = connection.requestedToUser.organisation;
          connectionDesignation = connection.requestedToUser.designation;
          connectionStatus = connection.status;
          connectionId = connection.requestedToUser._id;
        } else {
          // Someone else requested to connect with me

          connectionName =
            connection.requestedByUser.firstName +
            " " +
            connection.requestedByUser.lastName;
          connectionImage = connection.requestedByUser.image
            ? connection.requestedByUser.image.startsWith("https://")
              ? connection.requestedByUser.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${connection.requestedByUser.image}`
            : "#";

          connectionOrganisation = connection.requestedByUser.organisation;
          connectionDesignation = connection.requestedByUser.designation;
          connectionStatus = connection.status;
          connectionId = connection.requestedByUser._id;
        }

        return (
          <MyConnectionsDetailsCard
            key={connectionId}
            name={connectionName}
            image={connectionImage}
            organisation={connectionOrganisation}
            designation={connectionDesignation}
            status={connectionStatus}
            connectionId={connectionId}
          />
        );
      });
  };

  return (
    <>
      <div className="event-management-content-grid px-3 mb-4 py-4">
        <MyConnectionsListFields />

        {renderConnections(connections, id)}
      </div>
    </>
  );
};

export default MyConnections;
