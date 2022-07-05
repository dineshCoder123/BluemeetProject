import React from "react";
import styled from "styled-components";

const Paper = styled.div`
  border-radius: 10px;
  border: 1px solid #d6d6d6;
  height: auto;
  width: 100%;
`;

const Text = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  color: #212121;
`;

const StyledButton = styled.button`
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 500;
  width: 100%;
`;

// Notification Text, TimeAgo, Link, Link Text

const NotificationMessage = () => {
  return (
    <>
      <Paper className="px-4 py-3">
        <Text className="mb-3">
          Hi, Welcome to Bluemeet your virtual and Hybrid events partner. Please
          watch the intro video to get started.{" "}
        </Text>

        <StyledButton className="btn btn-outline-text btn-outline-primary">Watch Intro</StyledButton>
      </Paper>
    </>
  );
};

export default NotificationMessage;
