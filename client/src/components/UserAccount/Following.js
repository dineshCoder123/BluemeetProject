import React from "react";
import styled from "styled-components";
import { DashboardSectionHeading } from "./Elements";
import FollowingDetailsCard from "./GridComponents/Following/DetailsCard";
import FollowingListFields from "./GridComponents/Following/ListFields";
import { useSelector } from "react-redux";
import NotFollowing from "./../../assets/images/NotFollowing.png";
import NoContentFound from "./../NoContent";

const Paper = styled.div`
  height: 83vh;
  width: 100%;
`;

const renderFollowing = (communities) => {
  return communities.map((community) => {
    return (
      <FollowingDetailsCard
        key={community._id}
        id={community._id}
        name={community.name}
        email={community.email}
        image={
          community.image
            ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${community.image}`
            : "#"
        }
      />
    );
  });
};

const Following = () => {
  const { userDetails } = useSelector((state) => state.user);

  let communities = [];

  if (userDetails) {
    if (userDetails.following) {
      communities = userDetails.following;
    }
  }

  return (
    <>
      <div className="user-account-main-body-home-content">
        <div
          className="user-account-main-body-home-content-left ps-2"
          style={{ overflow: "auto", height: "100%" }}
        >
          <DashboardSectionHeading className="pb-4 ps-4">
            Following
          </DashboardSectionHeading>

          <div className="px-4">
            {typeof communities !== "undefined" && communities.length > 0 ? (
              <>
                <FollowingListFields />
                {renderFollowing(communities)}
              </>
            ) : (
              <div
                className="d-flex flex-row align-items-center justify-content-center"
                style={{ height: "73vh", width: "100%" }}
              >
                <NoContentFound
                  msgText="You are not following any community"
                  img={NotFollowing}
                />
              </div>
            )}
            {}
          </div>
        </div>
      </div>
    </>
  );
};

export default Following;
