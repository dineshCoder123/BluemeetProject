import React from "react";
import styled from "styled-components";
import {
  Avatar,
  Dialog,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const Paper = styled.div`
  width: 380px;
`;

const Heading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;
const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const CommunityTabGrid = styled.div`
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: #f5f5f5;

  &:hover {
    cursor: pointer;
    background-color: #f1f1f1;
  }

  display: grid;
  grid-template-columns: 1fr 4fr 1fr;
  grid-gap: 10px;
  align-items: center;
`;

const CommunityName = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;

  text-decoration: none !important;
  text-decoration-thickness: 0px;
  text-decoration-color: transparent;
`;

const renderCommunities = (communities, userId) => {
  return communities.map((community) => {
    return (
      <CommunityTabGrid
        onClick={() => {
          window.location.href = `/user/${userId}/community/getting-started/${community._id}`;
        }}
        className="p-3 mb-3"
      >
        <Avatar
          src={
            community.image.startsWith("https://")
              ? community.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${community.image}`
          }
          alt={community.name}
          variant="rounded"
        />
        <CommunityName style={{ textDecoration: "none !important" }}>
          {community.name}
        </CommunityName>
        <IconButton>
          <KeyboardArrowRightRoundedIcon />
        </IconButton>
      </CommunityTabGrid>
    );
  });
};

const SwitchCommunity = ({ open, handleClose }) => {
  const params = useParams();
  const eventId = params.eventId;

  const { communities } = useSelector((state) => state.community);

  const { userDetails } = useSelector((state) => state.user);

  const userId = userDetails._id;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [maxWidth, setMaxWidth] = React.useState("lg");

  return (
    <>
      <Dialog
        maxWidth={maxWidth}
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <Paper>
          <HeaderFooter className="px-4 py-3">
            <Heading> Switch community </Heading>
          </HeaderFooter>
          <div className="px-4 py-3">
            {renderCommunities(communities, userId)}
          </div>
          <HeaderFooter className="px-4 py-3 d-flex flex-row align-items-center justify-content-end">
            <button
              className="btn btn-outline-dark btn-outline-text"
              onClick={handleClose}
            >
              Cancel
            </button>
          </HeaderFooter>
        </Paper>
      </Dialog>
    </>
  );
};

export default SwitchCommunity;