import React, { useState, useEffect } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import Divider from "@material-ui/core/Divider";
import TeamMembersListFields from "./HelperComponent/TeamMembersListFields";
import TeamMembersDetailsCard from "./HelperComponent/TeamMembersDetailsCard";
import styled from "styled-components";
import AddNewMember from "./FormComponents/AddNewMember";
import CreateNewRole from "./FormComponents/CreateNewRole";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPendingInvitations,
  fetchCommunityManagers,
  getSuperAdmin,
} from "./../../actions";
import { useParams } from "react-router-dom";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderInvitedPeople = (persons) => {
  if (!persons) return;
  return persons.map((person) => {
    return (
      <TeamMembersDetailsCard
        id={person.id}
        email={person.invitedUserEmail}
        status={"Pending"}
        position={"Community Manager"}
        name={person.existingUserName}
        image={
          person.existingUserImage &&
          person.existingUserImage.startsWith("https://")
            ? person.existingUserImage
            : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.existingUserImage}`
        }
      />
    );
  });
};

const renderCommunityManagers = (persons) => {
  if (!persons) return;
  return persons.map((person) => {
    return (
      <TeamMembersDetailsCard
        id={person.id}
        name={person.firstName + " " + person.lastName}
        status={"Accepted"}
        position={"Community Manager"}
        email={person.email}
        image={
          person.image && person.image.startsWith("https://")
            ? person.image
            : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${person.image}`
        }
      />
    );
  });
};

const TeamManagement = (props) => {
  const params = useParams();

  const { invitations, communityManagers } = useSelector(
    (state) => state.community
  );

  const { superAdminName, superAdminEmail, superAdminImage } = useSelector(
    (state) => state.community.communityDetails
  );

  const { superAdmin } = useSelector((state) => state.community);

  const communityId = params.id;

  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch invited members of this community who have status pending
    dispatch(fetchPendingInvitations(communityId));

    // Fetch community super admin
    dispatch(getSuperAdmin(communityId));

    // Fetch People who have accepted invitation
    dispatch(fetchCommunityManagers(communityId));
  }, []);

  const [activeTab, setActiveTab] = useState("members");

  const [openAddNewMember, setOpenAddNewMember] = React.useState(false);

  const [openCreateNewRole, setOpenCreateNewRole] = React.useState(false);

  const handleOpenCreateNewRole = () => {
    setOpenCreateNewRole(true);
  };

  const handleCloseCreateNewRole = () => {
    setOpenCreateNewRole(false);
  };

  const handleAddNewMember = () => {
    setOpenAddNewMember(true);
  };

  const handleCloseAddNewMember = () => {
    setOpenAddNewMember(false);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <SectionHeading className="">Team Management</SectionHeading>
          <div className="sec-heading-action-button d-flex flex-row">
            {(() => {
              switch (activeTab) {
                case "members":
                  return (
                    <button
                      className="btn btn-primary btn-outline-text ms-3"
                      onClick={handleAddNewMember}
                    >
                      Add New Member
                    </button>
                  );

                case "roles":
                  return (
                    <button
                      className="btn btn-primary btn-outline-text ms-3"
                      onClick={handleOpenCreateNewRole}
                    >
                      Add New Role
                    </button>
                  );
                default:
                  break;
              }
            })()}
          </div>
        </div>

        <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
          {(() => {
            switch (activeTab) {
              case "members":
                return (
                  <>
                    <TeamMembersListFields />
                    <div
                      className="divider-wrapper"
                      style={{ margin: "1.2% 0" }}
                    >
                      <Divider />
                    </div>
                    {superAdmin ? (
                      <TeamMembersDetailsCard
                        image={
                          superAdmin.image
                            ? superAdmin.image.startsWith("https://")
                              ? superAdmin.image
                              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${superAdmin.image}`
                            : "#"
                        }
                        name={superAdmin.firstName + " " + superAdmin.lastName}
                        position={"Super admin"}
                        email={superAdmin.email}
                        status={"----"}
                      />
                    ) : (
                      <></>
                    )}

                    {renderCommunityManagers(communityManagers)}

                    {renderInvitedPeople(invitations)}
                  </>
                );

              default:
                break;
            }
          })()}
        </div>
      </div>

      <AddNewMember
        open={openAddNewMember}
        handleClose={handleCloseAddNewMember}
      />
      <CreateNewRole
        open={openCreateNewRole}
        handleClose={handleCloseCreateNewRole}
      />
    </>
  );
};

export default TeamManagement;
