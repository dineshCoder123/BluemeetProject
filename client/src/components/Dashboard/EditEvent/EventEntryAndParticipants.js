import React, { useState } from "react";
import styled from "styled-components";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Chip from "@mui/material/Chip";
import ComingSoon from "./../../../assets/images/coming-soon.png";
import WhoCanEnterEvent from "./HelperComponents/WhoCanEnterEvent";
import PreviewRegistrationForm from "./HelperComponents/PreviewRegisterationForm";
import EditRegistraionForm from "./HelperComponents/EditRegistrationForm";
import Participants from "./HelperComponents/Participants";

const SectionHeading = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: #555555;
  font-family: "Ubuntu";
`;

const SwitchTab = styled.div`
  font-weight: 500;
  font-size: 0.95rem;
  font-family: "Ubuntu";
  color: ${(props) => (props && props.active ? "#272727" : "#575757")};
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  border-bottom: ${(props) =>
    props && props.active ? "3px solid #538BF7" : "3px solid transparent"};
  width: fit-content;

  &:hover {
    color: #272727;
    cursor: pointer;
  }
`;

const TextSmall = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  font-family: "Ubuntu";
  color: "#474747";
  letter-spacing: 0.5px;
`;

const TextProminent = styled.div`
  font-weight: 700;
  font-size: 1.2rem;
  font-family: "Ubuntu";
  color: "#080808";
`;

const TextMedium = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.94rem;
  color: #212121;
`;

const CommingSoonIllustration = styled.img`
  height: 250px;
  width: auto;
`;

const EventEntryAndParticipants = () => {
  const [activeTab, setActiveTab] = useState("participants");

  const [openEntryRules, setOpenEntryRules] = useState(false);

  const [openFormPreview, setOpenFormPreview] = useState(false);

  const [openEditForm, setOpenEditForm] = useState(false);

  const handleCloseEntryRules = () => {
    setOpenEntryRules(false);
  };

  const handleCloseFormPreview = () => {
    setOpenFormPreview(false);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }} className="px-4 py-4">
        <div className="secondary-heading-row d-flex flex-row justify-content-between mb-5">
          <SectionHeading className="">
            Event registrations
          </SectionHeading>
        </div>

        <div
          className="d-flex flex-row align-items-center mb-4"
          style={{ borderBottom: "1px solid #D1D1D1" }}
        >
          
          <SwitchTab
            active={activeTab === "participants" ? true : false}
            onClick={() => {
              setActiveTab("participants");
            }}
          >
            Registrations
          </SwitchTab>
        </div>

        <TextSmall className="mb-4">
          {activeTab === "entryRules"
            ? "Define how participants will enter event and how will they register"
            : `Manage your event participants and invited attendees. You can also import attendees or download all the registration details of your participants.`}
        </TextSmall>

        {(() => {
          switch (activeTab) {
            case "entryRules":
              return (
                <div>
                  <TextProminent className="mb-4">
                    How to authenticate?
                  </TextProminent>

                  <div className="d-flex flex-row align-items-center mb-5">
                    <TextMedium style={{ marginRight: "200px" }}>
                      {" "}
                      <SecurityRoundedIcon className="me-3" />{" "}
                      <span>Anyone can enter after sign in</span>{" "}
                    </TextMedium>

                    <button
                      onClick={() => {
                        setOpenEntryRules(true);
                      }}
                      className="btn btn-outline-primary btn-outline-text me-3"
                      style={{ justifySelf: "end" }}
                    >
                      {" "}
                      <EditRoundedIcon
                        className="me-2"
                        style={{ fontSize: "18px" }}
                      />{" "}
                      edit
                    </button>
                  </div>

                  <TextProminent className="mb-4">
                    <span className="me-4">
                      {" "}
                      Dynamic form for registration{" "}
                    </span>
                    <Chip
                      label="Coming soon"
                      variant="outlined"
                      style={{ color: "#ffffff", backgroundColor: "#212121" }}
                    />
                  </TextProminent>

                  <TextSmall className="mb-4">
                    Available for AppSumo customer, growth and enterprise only
                  </TextSmall>

                  <CommingSoonIllustration
                    src={ComingSoon}
                    alt={"coming soon"}
                  ></CommingSoonIllustration>
                </div>
              );

            case "participants":
              return <Participants className="mt-3" />;
            default:
              break;
          }
        })()}
      </div>
      <WhoCanEnterEvent
        handleClose={handleCloseEntryRules}
        open={openEntryRules}
      />

      <PreviewRegistrationForm
        handleClose={handleCloseFormPreview}
        open={openFormPreview}
      />

      <EditRegistraionForm
        handleClose={handleCloseEditForm}
        open={openEditForm}
      />
    </>
  );
};

export default EventEntryAndParticipants;
