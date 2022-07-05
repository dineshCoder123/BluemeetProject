/* eslint-disable no-unused-vars */
import React from "react";
import Avatar from "@material-ui/core/Avatar";
import styled from "styled-components";
import BluemeetLogoLight from "./../../assets/images/Bluemeet_Logo_Light.svg";
import { useDispatch, useSelector } from "react-redux";
import CreateNewCommunityForm from "./Forms/CreateNewCommunityForm";
import {
  communitySignIn,
  errorTrackerForCommunitySignIn,
  setCommunityVerificationId,
  setCommunityVerificationEmail,
  setOpenCommunityVerificationNotice,
} from "../../actions";
import Loader from "../Loader";
import CreateNewCommunityMsgCard from "./CreateNewCommunityMsgCard";
import maleMascot from "./../../assets/images/winkingPerson.png";
import CircleIcon from "@mui/icons-material/Circle";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

const SideNavPaper = styled.div`
  width: 100%;
  background-color: #f5f5f596;
`;

const BtnOutlinedWithIcon = styled.div`
  border: 1px solid #152d35;
  color: #152d35;
  padding: 8px 16px;
  border-radius: 10px;

  font-size: 0.8rem;
  font-family: "Ubuntu";
  font-weight: 500;

  &:hover {
    background-color: #152d35;
    color: #dcc7be;
    cursor: pointer;
  }
`;

const ProfileTabPaper = styled.div`
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0px 3px 0 #152d353f;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const CommunitiesHeading = styled.div`
  font-size: 0.9rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #152d35;
  letter-spacing: 0.15px;
`;
const CommunityTabPaper = styled.div`
  background-color: transparent;
  border-radius: 10px;
  border: 1px solid transparent;

  color: #152d35 !important;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.85rem;
  text-transform: capitalize;
  display: grid;
  grid-template-columns: 1fr 3fr;

  &:hover {
    color: #152d35 !important;
    cursor: pointer;

    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 0px 6px 0 #152d353f;
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

const ProfileName = styled.div`
  color: #152d35 !important;
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: capitalize;
`;

const ProfileEmail = styled.div`
  color: #152d35 !important;
  font-family: "Ubuntu";
  font-weight: 400;
  font-size: 0.75rem;
  text-transform: none;
`;

const CommunityProfileTab = (props) => {
  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.community);

  const { id } = useSelector((state) => state.user.userDetails);

  const userId = id;
  const onClickCommunityTab = () => {
    dispatch(communitySignIn(props.communityId, userId));
  };

  if (error) {
    console.log(error);
    return dispatch(errorTrackerForCommunitySignIn());
  }

  const truncateText = (str, n) => {
    if (!str) return;
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  return (
    <CommunityTabPaper
      className="px-4 py-2 mb-3 mx-2"
      onClick={onClickCommunityTab}
    >
      <Avatar
        alt={props.name}
        variant="rounded"
        src={props.communityImage}
        style={{ alignSelf: "center" }}
      />
      <div className="d-flex flex-column justify-content-center align-items-left ms-3">
        <div className="mb-1">{truncateText(props.name, 14)}</div>
      </div>
    </CommunityTabPaper>
  );
};

const UnverifiedCommunityTab = ({ id, name, image, email }) => {
  const dispatch = useDispatch();

  const handleClickUnverifiedCommunityTab = () => {
    // Open dialog and set email
    dispatch(setCommunityVerificationId(id));
    dispatch(setCommunityVerificationEmail(email));
    dispatch(setOpenCommunityVerificationNotice(true));
  };

  const truncateText = (str, n) => {
    if (!str) return;
    return str.length > n ? `${str.substring(0, n)} ...` : str;
  };

  return (
    <>
      <Tooltip title="Needs email verification" placement="right">
        <div>
          <CommunityTabPaper
            className="px-4 py-2 mb-3 mx-2"
            onClick={handleClickUnverifiedCommunityTab}
          >
            <Avatar
              alt={name}
              variant="rounded"
              src={image}
              style={{ alignSelf: "center" }}
            />
            <div className="d-flex flex-column justify-content-center align-items-left ms-3">
              <div className="mb-1">
                {truncateText(name, 14)}{" "}
                <span className="ms-3">
                  <CircleIcon style={{ color: "red", fontSize: "10px" }} />
                </span>
              </div>
            </div>
          </CommunityTabPaper>
        </div>
      </Tooltip>
    </>
  );
};

class UserProfileTab extends React.Component {
  render() {
    const { name, email, imageURL } = this.props;
    console.log(name, email);

    const truncateText = (str, n) => {
      if (!str) return;
      return str.length > n ? `${str.substring(0, n)} ...` : str;
    };

    return (
      <ProfileTabPaper className="user-profile-tab px-4 py-2 mb-4 mx-2">
        <Avatar
          alt={name}
          variant="rounded"
          src={imageURL}
          style={{ alignSelf: "center" }}
        />
        <div className="d-flex flex-column justify-content-between align-items-left ms-3">
          <ProfileName className="mb-1">{truncateText(name, 14)}</ProfileName>
          <ProfileEmail>{truncateText(email, 18)}</ProfileEmail>
        </div>
      </ProfileTabPaper>
    );
  }
}

const UserAccountSideNav = () => {
  const { isLoading } = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);

  const { isCommunityLoading } = useSelector((state) => state.community);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { communities, communityRequests } = useSelector(
    (state) => state.community
  );
  const { userDetails } = useSelector((state) => state.user);
  if (isLoading) {
    return (
      <div
        className="d-flex flex-row align-items-center justify-content-center"
        style={{ width: "100%", height: "100vh" }}
      >
        {" "}
        <Loader />{" "}
      </div>
    );
  }

  let firstName;
  let lastName;
  let email;
  let image;

  if (userDetails) {
    firstName = userDetails.firstName;
    lastName = userDetails.lastName;
    email = userDetails.email;
    image = userDetails.image;
  }

  const name = `${firstName} ${lastName}`;

  const renderCommunitiesList = (communities) => {
    if (communities) {
      return communities.map((community) => {
        console.log(community);
        return (
          <CommunityProfileTab
            name={community.name}
            // TODO ALLOW COMMUNITY TO UPLOAD AND EDIT ITS LOGO
            communityId={community._id}
            key={community._id}
            communityImage={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${community.image}`}
          />
        );
      });
    }
  };

  const renderCommunityRequests = (communityRequests) => {
    if (communityRequests) {
      return communityRequests.map((request) => {
        return (
          <UnverifiedCommunityTab
            id={request._id}
            key={request._id}
            name={request.name}
            email={request.email}
            image={
              request.logo
                ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${request.logo}`
                : "#"
            }
          />
        );
      });
    }
  };

  let userImageURL;

  if (image) {
    if (image.startsWith("https://")) {
      userImageURL = image;
    } else {
      userImageURL = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${image}`;
    }
  }

  return (
    <SideNavPaper>
      <div className="px-3 py-2 mb-4 mt-3">
        <img
          src={BluemeetLogoLight}
          alt="bluemeet logo"
          style={{ height: "50px" }}
        />
      </div>

      <UserProfileTab name={name} email={email} imageURL={userImageURL} />

      <div className="user-community-tab-section">
        <CommunitiesHeading className="user-community-tab-headline px-4 mb-3">
          Communities
        </CommunitiesHeading>
        <div
          className="user-community-tab-list mb-4"
          style={{ overflow: "auto", height: "77vh" }}
        >
          {isCommunityLoading ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "100%", height: "auto" }}
            >
              {" "}
              <Loader />{" "}
            </div>
          ) : (typeof communities !== "undefined" && communities.length) ||
            (typeof communityRequests !== "undefined" &&
              communityRequests.length) > 0 ? (
            renderCommunitiesList(communities)
          ) : (
            <CreateNewCommunityMsgCard
              msgText="Start by creating your community"
              img={maleMascot}
            />
          )}

          {isCommunityLoading ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "100%", height: "auto" }}
            >
              {" "}
              <Loader />{" "}
            </div>
          ) : typeof communityRequests !== "undefined" &&
            communityRequests.length > 0 ? (
            renderCommunityRequests(communityRequests)
          ) : (
            <></>
          )}

          <div className="create-new-community-sidebar-btn d-flex flex-row justify-content-center my-4">
            <BtnOutlinedWithIcon className="py-2" onClick={handleClickOpen}>
              Create New Community
            </BtnOutlinedWithIcon>

            <CreateNewCommunityForm closeHandler={handleClose} open={open} />
          </div>
        </div>
      </div>
    </SideNavPaper>
  );
};
export default UserAccountSideNav;
