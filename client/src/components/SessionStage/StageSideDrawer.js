import React, { useState } from "react";
import { Avatar } from "@material-ui/core";
import Faker from "faker";
import { Dropdown } from "semantic-ui-react";

import PauseRoundedIcon from "@material-ui/icons/PauseRounded"; // Pause
import StopRoundedIcon from "@material-ui/icons/StopRounded"; // Stop
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded"; // Resume

import VideocamRoundedIcon from "@material-ui/icons/VideocamRounded"; // Video Camera Icon
import MicNoneRoundedIcon from "@material-ui/icons/MicNoneRounded"; // Microphone Icon
import ScreenShareRoundedIcon from "@material-ui/icons/ScreenShareRounded"; // Screen Share Icon

import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

import {
  SessionLinkNav,
  SessionVideoContainer,
  SessionSideDrawer,
  SessionSideIconBtnNav,
  ViewCompleteProfileBtn,
  UserRoleTag,
  PersonName,
  PeopleListWidget,
  LinkTab,
  Divider,
  IconButton,
  TabButton,
  BtnOutlined,
} from "./Elements";

import { makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import MainChatComponent from "../HostingPlatform/StageSideBar/Chat/MainChatComponent";
import MainQnAComponent from "../HostingPlatform/StageSideBar/QnA/MainQnAComponent";
import MainPollComponent from "../HostingPlatform/StageSideBar/Poll/MainPollComponent";

const DropdownIcon = ({ switchView, view }) => (
  <Dropdown icon={
    view === "list" ? (
      <FormatListBulletedRoundedIcon style={{ fontSize: "18px" }} />
    ) : (
      <GridViewRoundedIcon style={{ fontSize: "18px" }} />
    )
  } button className="icon">
    <Dropdown.Menu style={{ right: "0", left: "auto" }}>
      <Dropdown.Item
        icon={
          <FormatListBulletedRoundedIcon
            style={{ fontSize: "18px" }}
            className="me-2"
          />
        }
        text="List"
        onClick={() => {
          switchView("list");
        }}
      />
      <Dropdown.Item
        icon={
          <GridViewRoundedIcon style={{ fontSize: "18px" }} className="me-2" />
        }
        text="Grid"
        onClick={() => {
          switchView("grid");
        }}
      />
    </Dropdown.Menu>
  </Dropdown>
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

const StageSideDrawerComponent = ({ runningStatus }) => {
  // We need to know the current running state and if this user is a host or not in all of this side drawer component

  let sessionHasEnded = false;

  let currentUserIsAHost = false;
  let currentUserIsASpeaker = false;

  const [activeLinkTab, setActiveLinkTab] = useState("chat");

  const [activeTab, setActiveTab] = useState("activity");

  const [view, setView] = useState("grid");

  const switchView = (view) => {
    setView(view);
  };


  const { role, sessionRole } = useSelector((state) => state.eventAccessToken);

  if (sessionRole === "host" && role !== "speaker") {
    currentUserIsAHost = true;
  }

  if (sessionRole === "host" && role === "speaker") {
    currentUserIsASpeaker = true;
  }


  if (runningStatus === "Ended") {
    sessionHasEnded = true;
  }

  const classes = useStyles();

  let gridColumns = "1fr 1fr";

  if(currentUserIsAHost) {
    gridColumns = "1fr 1fr 1fr 1fr"
  }
  if(runningStatus === "Ended") {
    gridColumns = "1fr 1fr"
  }

  return (
    <>
      <SessionSideDrawer>
        <SessionSideIconBtnNav
          style={{
            gridTemplateColumns: gridColumns,
          }}
        >
          <TabButton
            className=""
            style={{ paddingTop: "10px", paddingBottom: "10px" }}
            active={activeTab === "activity" ? true : false}
            onClick={() => {
              setActiveTab("activity");
            }}
          >
            Activity
          </TabButton>
          <TabButton
            active={activeTab === "people" ? true : false}
            onClick={() => {
              setActiveTab("people");
            }}
          >
            People
          </TabButton>
          {currentUserIsAHost && !sessionHasEnded ? (
            <>
              {" "}
              <TabButton
                active={activeTab === "raisedHands" ? true : false}
                onClick={() => {
                  setActiveTab("raisedHands");
                }}
              >
                Raised hands
              </TabButton>
              <TabButton
                active={activeTab === "videos" ? true : false}
                onClick={() => {
                  setActiveTab("videos");
                }}
              >
                Videos
              </TabButton>{" "}
            </>
          ) : (
            <></>
          )}
        </SessionSideIconBtnNav>

        {/* <MainChatComponent /> */}

        <div>
          <Divider />
        </div>

        {(() => {
          switch (activeTab) {
            case "activity":
              return (
                <>
                  <div>
                    <SessionLinkNav>
                      <LinkTab
                        onClick={() => {
                          setActiveLinkTab("chat");
                        }}
                        active={activeLinkTab === "chat" ? true : false}
                      >
                        Chat
                      </LinkTab>
                      <LinkTab
                        onClick={() => {
                          setActiveLinkTab("q&a");
                        }}
                        active={activeLinkTab === "q&a" ? true : false}
                      >
                        Q&A
                      </LinkTab>
                      <LinkTab
                        onClick={() => {
                          setActiveLinkTab("poll");
                        }}
                        active={activeLinkTab === "poll" ? true : false}
                      >
                        Poll
                      </LinkTab>
                    </SessionLinkNav>

                    {(() => {
                      switch (activeLinkTab) {
                        case "chat":
                          return (
                            <div className="d-flex flex-column align-items-center justify-content-between">
                              <MainChatComponent
                            
                                currentUserIsAHost={currentUserIsAHost}
                                runningStatus={runningStatus}
                              />
                            </div>
                          );
                        case "q&a":
                          return (
                            <div
                              className="d-flex flex-column"
                              style={{ height: "100%" }}
                            >
                              <div
                                style={{ height: "69vh" }}
                                className="py-3 px-3"
                              >
                                <MainQnAComponent
                                  currentUserIsAHost={currentUserIsAHost}
                                  runningStatus={runningStatus}
                                />
                              </div>
                            </div>
                          );
                        case "poll":
                          return (
                            <div
                              className="d-flex flex-column"
                              style={{ height: "100%" }}
                            >
                              <div
                                style={{ height: "69vh" }}
                                className="py-3 px-3"
                              >
                                <MainPollComponent
                                  currentUserIsAHost={currentUserIsAHost}
                                  currentUserIsASpeaker={currentUserIsASpeaker}
                                  runningStatus={runningStatus}
                                />
                              </div>
                            </div>
                          );

                        default:
                          break;
                      }
                    })()}
                  </div>
                </>
              );

            case "people":
              return (
                <div>
                  <div className=" pt-2 px-2">
                    <div className="search-box-and-view-switch-container d-flex flex-row justify-content-between mb-3">
                      <div
                        className="ui icon input me-3"
                        style={{ width: "100%" }}
                      >
                        <input
                          type="text"
                          placeholder="Search people..."
                          className="form-control"
                        />
                         <SearchRoundedIcon
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  color: "#757575",
                }}
              />
                      </div>

                      <DropdownIcon switchView={switchView} view={view} />
                    </div>

                    {(() => {
                      switch (view) {
                        case "grid":
                          return (
                            <div className="people-list-grid">
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                              <Avatar
                                src={Faker.image.avatar()}
                                variant="rounded"
                                className={classes.large}
                              />
                            </div>
                            // <div className="people-list-grid">
                            //   {renderPeopleList(currentlyInEvent)}
                            // </div>
                          );
                        case "list":
                          return (
                            <div>
                              <PeopleListWidget className="mb-3">
                                <div className="d-flex flex-row mb-4 justify-content-between">
                                  <div className="d-flex flex-row">
                                    <Avatar
                                      src={Faker.image.avatar()}
                                      alt={Faker.name.findName()}
                                      variant="rounded"
                                      className="me-3"
                                    />
                                    <div>
                                      <PersonName>
                                        {Faker.name.findName()}
                                      </PersonName>
                                      <PersonName>
                                        {"Product manager, Bluemeet"}
                                      </PersonName>
                                    </div>
                                  </div>

                                  <UserRoleTag>Host</UserRoleTag>
                                </div>
                                <ViewCompleteProfileBtn>
                                  View complete profile
                                </ViewCompleteProfileBtn>
                              </PeopleListWidget>
                              <PeopleListWidget className="mb-3">
                                <div className="d-flex flex-row mb-4 justify-content-between">
                                  <div className="d-flex flex-row">
                                    <Avatar
                                      src={Faker.image.avatar()}
                                      alt={Faker.name.findName()}
                                      variant="rounded"
                                      className="me-3"
                                    />
                                    <div>
                                      <PersonName>
                                        {Faker.name.findName()}
                                      </PersonName>
                                      <PersonName>
                                        {"Product manager, Bluemeet"}
                                      </PersonName>
                                    </div>
                                  </div>

                                  <UserRoleTag>Host</UserRoleTag>
                                </div>
                                <ViewCompleteProfileBtn>
                                  View complete profile
                                </ViewCompleteProfileBtn>
                              </PeopleListWidget>
                              <PeopleListWidget className="mb-3">
                                <div className="d-flex flex-row mb-4 justify-content-between">
                                  <div className="d-flex flex-row">
                                    <Avatar
                                      src={Faker.image.avatar()}
                                      alt={Faker.name.findName()}
                                      variant="rounded"
                                      className="me-3"
                                    />
                                    <div>
                                      <PersonName>
                                        {Faker.name.findName()}
                                      </PersonName>
                                      <PersonName>
                                        {"Product manager, Bluemeet"}
                                      </PersonName>
                                    </div>
                                  </div>

                                  <UserRoleTag>Host</UserRoleTag>
                                </div>
                                <ViewCompleteProfileBtn>
                                  View complete profile
                                </ViewCompleteProfileBtn>
                              </PeopleListWidget>
                            </div>
                          );

                        default:
                          return (
                            <div>You are viewing people in this event.</div>
                          );
                      }
                    })()}
                  </div>
                </div>
              );
            case "raisedHands":
              return (
                <div>
                  <PeopleListWidget className="mb-3">
                    <div className="d-flex flex-row mb-4 justify-content-between">
                      <div className="d-flex flex-row">
                        <Avatar
                          src={Faker.image.avatar()}
                          alt={Faker.name.findName()}
                          variant="rounded"
                          className="me-3"
                        />
                        <div>
                          <PersonName>{Faker.name.findName()}</PersonName>
                          <PersonName>{"Product manager, Bluemeet"}</PersonName>
                        </div>
                      </div>

                      {/* <UserRoleTag>Host</UserRoleTag> */}
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                      <IconButton className="me-4">
                        <VideocamRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton className="me-4">
                        <MicNoneRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton className="me-4">
                        <ScreenShareRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                    </div>
                    <ViewCompleteProfileBtn>
                      Put on stage
                    </ViewCompleteProfileBtn>
                  </PeopleListWidget>
                  <PeopleListWidget className="mb-3">
                    <div className="d-flex flex-row mb-4 justify-content-between">
                      <div className="d-flex flex-row">
                        <Avatar
                          src={Faker.image.avatar()}
                          alt={Faker.name.findName()}
                          variant="rounded"
                          className="me-3"
                        />
                        <div>
                          <PersonName>{Faker.name.findName()}</PersonName>
                          <PersonName>{"Product manager, Bluemeet"}</PersonName>
                        </div>
                      </div>

                      {/* <UserRoleTag>Host</UserRoleTag> */}
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                      <IconButton className="me-4">
                        <VideocamRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton className="me-4">
                        <MicNoneRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton className="me-4">
                        <ScreenShareRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                    </div>

                    <ViewCompleteProfileBtn>
                      Put on stage
                    </ViewCompleteProfileBtn>
                  </PeopleListWidget>
                  <PeopleListWidget className="mb-3">
                    <div className="d-flex flex-row mb-4 justify-content-between">
                      <div className="d-flex flex-row">
                        <Avatar
                          src={Faker.image.avatar()}
                          alt={Faker.name.findName()}
                          variant="rounded"
                          className="me-3"
                        />
                        <div>
                          <PersonName>{Faker.name.findName()}</PersonName>
                          <PersonName>{"Product manager, Bluemeet"}</PersonName>
                        </div>
                      </div>

                      {/* <UserRoleTag>Host</UserRoleTag> */}
                    </div>
                    <div className="d-flex flex-row align-items-center justify-content-center mb-3">
                      <IconButton className="me-4">
                        <VideocamRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton className="me-4">
                        <MicNoneRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                      <IconButton className="me-4">
                        <ScreenShareRoundedIcon style={{ fontSize: "20px" }} />
                      </IconButton>
                    </div>
                    <ViewCompleteProfileBtn>
                      Put on stage
                    </ViewCompleteProfileBtn>
                  </PeopleListWidget>
                </div>
              );
            case "videos":
              return (
                <div>
                  <SessionVideoContainer className="mb-3">
                    <img
                      src="https://jungletopp.com/wp-content/uploads/2020/11/youtube.jpg"
                      style={{ borderRadius: "5px" }}
                      className="mb-3"
                      alt="video cover"
                    ></img>

                    <BtnOutlined>
                      <PlayArrowRoundedIcon
                        className="me-2"
                        style={{ fontSize: "20px" }}
                      />
                      Play on stage
                    </BtnOutlined>
                  </SessionVideoContainer>
                  <SessionVideoContainer className="mb-3">
                    <img
                      src="https://i.ytimg.com/vi/8YbZuaBP9B8/maxresdefault.jpg"
                      style={{ borderRadius: "5px" }}
                      className="mb-3"
                      alt="video cover"
                    ></img>

                    <div className="d-flex flex-row align-items-center justify-content-between">
                      <BtnOutlined style={{ width: "48%" }}>
                        <PauseRoundedIcon
                          className="me-2"
                          style={{ fontSize: "20px" }}
                        />
                        Pause
                      </BtnOutlined>
                      <BtnOutlined style={{ width: "48%" }}>
                        <StopRoundedIcon
                          className="me-2"
                          style={{ fontSize: "20px" }}
                        />
                        Stop playing
                      </BtnOutlined>
                    </div>
                  </SessionVideoContainer>
                </div>
              );

            default:
              break;
          }
        })()}
      </SessionSideDrawer>
    </>
  );
};

export default StageSideDrawerComponent;
