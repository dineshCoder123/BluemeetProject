import React, { useState } from "react";
import styled from "styled-components";


import Ice from "./../Images/ice.jpeg";
import Winter from "./../Images/winter.jpeg";
import Sunrise from "./../Images/sunrise.jpeg";
import Sunset from "./../Images/sunset.jpeg";
import DarkChristmas from "./../Images/Darkchristmas.jpeg";
import Christmas from "./../Images/christmas.jpeg";
import Mountains from "./../Images/Mountains.jpeg";
import Festival from "./../Images/Festival.jpeg";
import NewYear from "./../Images/new_year.jpeg";
import Desert from "./../Images/desert.jpeg";
import Ocean from "./../Images/ocean.jpeg";
import Rocks from "./../Images/ocean.jpeg";
import Beach from "./../Images/beach.jpeg";
import Startup from "./../Images/startup.jpeg";
import Tech from "./../Images/tech.jpeg";
import Finance from "./../Images/finance.jpeg";

import { TwitterPicker } from "react-color";

import { Divider } from "@material-ui/core";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";


import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";



const RoyalBlueSwitch = withStyles({
  switchBase: {
    color: "#538BF7",
    "&$checked": {
      color: "#3474F3",
    },
    "&$checked + $track": {
      backgroundColor: "#145DF0",
    },
  },
  checked: {},
  track: {},
})(Switch);

const CustomHorizontalTabWarpper = styled.div`
  width: 500px;
  height: auto;
  border-radius: 10px;
  background-color: #345b63;

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 16px;
  padding-top: 6px;
  padding-bottom: 6px;
`;

const CustomTabButton = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  color: #fff;
  align-self: center;

  text-align: center;
  padding: 6px 12px;
  background-color: ${(props) =>
    props.active && props.active ? "#152d35" : "#345b63"};
  border-radius: 10px;
  border: 1px solid transparent;

  &:hover {
    border: 1px solid #fff;
    background-color: transparent;
    cursor: pointer;
  }
`;

const FormLabelUI = styled.div`
  font-weight: 400;
  font-size: 0.75rem;
  font-family: "Ubuntu";
  color: #152d35;

  margin-bottom: 6px;
`;

const VibesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 16px;
  align-items: center;
  width: 500px;
`;

const VibeCard = styled.div`
  font-size: 0.7rem;
  font-weight: 500;
  color: #686868;
  font-family: "Ubuntu";
  text-align: center;

  img {
      border: 2px solid transparent;
      /* padding: 5px; */
    height: 80px;
    border-radius: 8px;

    object-fit: cover;
    margin-bottom: 5px;

    &:hover {
        border: 2px solid #152d35;
    }
  }

  &:hover {
    font-weight: 500;
  color: #152d35;
  cursor: pointer;
  }
`;

const SessionCustomisation = () => {
  const [selectedTab, setSelectedTab] = useState("color");



  const [background, setBackground] = useState("#538BF7");

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  const [checked, setChecked] = React.useState(false);

  const handleChangeToggle = () => {
    setChecked(!checked);
  };

  return (
    <>
      <CustomHorizontalTabWarpper className="px-3 mb-4">
        <CustomTabButton
          active={selectedTab === "color" ? true : false}
          onClick={() => {
            setSelectedTab("color");
          }}
        >
          Color
        </CustomTabButton>
        <CustomTabButton
          active={selectedTab === "vibes" ? true : false}
          onClick={() => {
            setSelectedTab("vibes");
          }}
        >
          Vibes
        </CustomTabButton>
        <CustomTabButton
          active={selectedTab === "widget" ? true : false}
          onClick={() => {
            setSelectedTab("widget");
          }}
        >
          Widget
        </CustomTabButton>
      </CustomHorizontalTabWarpper>

      {(() => {
        switch (selectedTab) {
          case "color":
            return (
              <div className="mb-4">
                <FormLabelUI>Color</FormLabelUI>
                <div
                  className="theme-color-preview mb-3"
                  style={{ backgroundColor: background }}
                ></div>
                <TwitterPicker
                  color={background}
                  onChangeComplete={handleChangeComplete}
                />
              </div>
            );

            case "widget":
                return (
                    <div>
                    <div className="d-flex flex-column mb-4">
                      {/* <div className="event-platform-side-drawer-heading">
                        Manage Widgets
                      </div> */}
                      <div className="setting-tab-sub-text">
                        Here you can hide areas that you don't want in your session.
                      </div>
                    </div>
    
                    <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                      <div className="hosting-platform-widget-name">Live chat</div>
    
                      <div>
                        {/* <VisibilityOffIcon className="icon-btn" />
                        <div className="show-hide-text">hide</div> */}
                        <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup>
                      </div>
                    </div>
                    <div className="my-3">
                      <Divider />
                    </div>
                    <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                      <div className="hosting-platform-widget-name">People in session</div>
    
                      <div>
                        {/* <VisibilityOffIcon className="icon-btn" />
                        <div className="show-hide-text">hide</div> */}
                        <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup>
                      </div>
                    </div>
                    <div className="my-3">
                      <Divider />
                    </div>
                    
                    
                    
                    <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                      <div className="hosting-platform-widget-name">Raise hand</div>
    
                      <div>
                        {/* <VisibilityOffIcon className="icon-btn" />
                        <div className="show-hide-text">hide</div> */}
                        <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup>
                      </div>
                    </div>
                    <div className="my-3">
                      <Divider />
                    </div>
                    <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                      <div className="hosting-platform-widget-name">Q & A</div>
    
                      <div>
                        {/* <VisibilityOffIcon className="icon-btn" />
                        <div className="show-hide-text">hide</div> */}
                        <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup>
                      </div>
                    </div>
                    <div className="my-3">
                      <Divider />
                    </div>
                    <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                      <div className="hosting-platform-widget-name">Attendee count</div>
    
                      <div>
                        {/* <VisibilityOffIcon className="icon-btn" />
                        <div className="show-hide-text">hide</div> */}
                        <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup>
                      </div>
                    </div>
                    <div className="my-3">
                      <Divider />
                    </div>
                    <div className="event-widget-show-hide d-flex flex-row align-items-center justify-content-between">
                      <div className="hosting-platform-widget-name">Emoji reactions on stage</div>
    
                      <div>
                        {/* <VisibilityOffIcon className="icon-btn" />
                        <div className="show-hide-text">hide</div> */}
                        <FormGroup row>
                    <FormControlLabel
                      control={
                        <RoyalBlueSwitch
                          checked={checked}
                          onChange={handleChangeToggle}
                          name="mailchimpSwitch"
                        />
                      }
                    />
                  </FormGroup>
                      </div>
                    </div>
                    <div className="my-3">
                      <Divider />
                    </div>
                   
                  </div>
                )

          case "vibes":
            return (
              <VibesGrid>
                <VibeCard>
                  <img src={Winter} alt={"Winter"} />
                  <div>Winter</div>
                </VibeCard>
                <VibeCard>
                  <img src={Ice} alt={"Winter"} />
                  <div>Ice</div>
                </VibeCard>
                <VibeCard>
                  <img src={Sunrise} alt={"Winter"} />
                  <div>Sunrise</div>
                </VibeCard>
                <VibeCard>
                  <img src={Sunset} alt={"Winter"} />
                  <div>Sunset</div>
                </VibeCard>
                <VibeCard>
                  <img src={DarkChristmas} alt={"Winter"} />
                  <div>Dark Christmas</div>
                </VibeCard>
                <VibeCard>
                  <img src={Christmas} alt={"Winter"} />
                  <div>Christmas</div>
                </VibeCard>
                <VibeCard>
                  <img src={Mountains} alt={"Winter"} />
                  <div>Mountains</div>
                </VibeCard>
                <VibeCard>
                  <img src={Festival} alt={"Winter"} />
                  <div>Festival</div>
                </VibeCard>
                <VibeCard>
                  <img src={NewYear} alt={"Winter"} />
                  <div>New year</div>
                </VibeCard>
                <VibeCard>
                  <img src={Desert} alt={"Winter"} />
                  <div>Desert</div>
                </VibeCard>
                <VibeCard>
                  <img src={Ocean} alt={"Winter"} />
                  <div>Ocean</div>
                </VibeCard>
                <VibeCard>
                  <img src={Winter} alt={"Winter"} />
                  <div>Winter</div>
                </VibeCard>
                <VibeCard>
                  <img src={Rocks} alt={"Winter"} />
                  <div>Rocks</div>
                </VibeCard>
                <VibeCard>
                  <img src={Beach} alt={"Winter"} />
                  <div>Beach</div>
                </VibeCard>
                <VibeCard>
                  <img src={Startup} alt={"Startup"} />
                  <div>Startup</div>
                </VibeCard>
                <VibeCard>
                  <img src={Tech} alt={"Tech"} />
                  <div>Technology</div>
                </VibeCard>
                <VibeCard>
                  <img src={Finance} alt={"Finance"} />
                  <div>Finance</div>
                </VibeCard>
              </VibesGrid>
            );

            default: 
            return <div>This is session customisation</div>
        }
      })()}
    </>
  );
};

export default SessionCustomisation;
