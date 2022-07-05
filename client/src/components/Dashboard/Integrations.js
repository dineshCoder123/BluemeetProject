import React, { useState } from "react";
import "./../../assets/Sass/Dashboard_Overview.scss";
import "./../../assets/Sass/EventManagement.scss";
import "./../../assets/Sass/SideNav.scss";
import "./../../assets/Sass/TopNav.scss";
import "./../../assets/Sass/DataGrid.scss";
import "./../../assets/Sass/Registrations.scss";
import IntegrationsSub from "./IntegrationSubComponents.js/IntegrationsSub";
import ApiKeysSub from "./IntegrationSubComponents.js/ApiKeysSub";
import GenerateApiKey from "./IntegrationSubComponents.js/Forms/GenerateApiKey";
import styled from "styled-components";
import RequestIntegrationForm from "./Integrations/MoreIntegrations/RequestIntegrationForm";
import BuildWithBluemeetForm from "./Integrations/MoreIntegrations/BuildWithBluemeetForm";

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

const Integrations = () => {
  const [openRequestIntegration, setOpenRequestIntegration] =
    React.useState(false);
  const [openBuildWithBluemeet, setOpenBuildWithBluemeet] =
    React.useState(false);
  const [alignment, setAlignment] = React.useState("integrations");

  const [openGenerateApikey, setOpenGenerateApikey] = useState(false);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const handleCloseRequestIntegration = () => {
    setOpenRequestIntegration(false);
  };

  const handleCloseBuildWithBluemeet = () => {
    setOpenBuildWithBluemeet(false);
  };

  const handleCloseOpenGenerateApiKey = () => {
    setOpenGenerateApikey(false);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 pt-4 pb-1">
          {(() => {
            switch (alignment) {
              case "integrations":
                return <SectionHeading>Integrations</SectionHeading>;

              case "apikeys":
                return <SectionHeading>Api keys</SectionHeading>;

              default:
                break;
            }
          })()}
          <div className="sec-heading-action-button d-flex flex-row">
            {(() => {
              switch (alignment) {
                case "integrations":
                  return (
                    <div className="d-flex flex-row align-items-center">
                      <button
                        onClick={() => {
                          setOpenBuildWithBluemeet(true);
                        }}
                        className="btn btn-outline-dark btn-outline-text me-3"
                      >
                        Build with Bluemeet
                      </button>
                      <button
                        onClick={() => {
                          setOpenRequestIntegration(true);
                        }}
                        className="btn btn-dark btn-outline-text"
                      >
                        Request integration
                      </button>
                    </div>
                  );

                case "apikeys":
                  return (
                    <button
                      onClick={() => {
                        setOpenGenerateApikey(true);
                      }}
                      className="btn btn-primary btn-outline-text"
                    >
                      Generate new Key
                    </button>
                  );

                default:
                  break;
              }
            })()}
          </div>
        </div>
        <div className="px-4 py-4">
          <div
            className="d-flex flex-row align-items-center "
            style={{ borderBottom: "1px solid #D1D1D1" }}
          >
            <SwitchTab
              active={alignment === "integrations" ? true : false}
              onClick={() => {
                setAlignment("integrations");
              }}
              className="me-4"
            >
              Integrations
            </SwitchTab>

            <SwitchTab
              active={alignment === "apikeys" ? true : false}
              className=" me-5"
              onClick={() => {
                setAlignment("apikeys");
              }}
            >
              API keys
            </SwitchTab>
          </div>
        </div>

        {(() => {
          switch (alignment) {
            case "integrations":
              return <IntegrationsSub />;

            case "apikeys":
              return <ApiKeysSub />;

            default:
              break;
          }
        })()}
      </div>
      <GenerateApiKey
        openDrawer={openGenerateApikey}
        handleCloseDrawer={handleCloseOpenGenerateApiKey}
      />
      <BuildWithBluemeetForm
        open={openBuildWithBluemeet}
        handleClose={handleCloseBuildWithBluemeet}
      />
      <RequestIntegrationForm
        open={openRequestIntegration}
        handleClose={handleCloseRequestIntegration}
      />
    </>
  );
};

export default Integrations;
