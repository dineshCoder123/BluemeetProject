/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import LastPageRoundedIcon from "@material-ui/icons/LastPageRounded";
import FirstPageRoundedIcon from "@material-ui/icons/FirstPageRounded";
import styled from "styled-components";
import VideoCall from "./../../../../assets/images/video-call.svg";
import Paused from "./../../../../assets/images/paused.svg";
import Ended from "./../../../../assets/images/ended.svg";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";

import { useSelector } from "react-redux";
import VideoPlayer from "./VideoPlayer";
import ScreenTrackPlayer from "./ScreenTrackPlayer";

const NotYetStarted = styled.div`
  min-height: 80vh;
  height: 90%;
  padding: 8vh 3vw;
  border-radius: 10px;
  margin-left: 70px;
  margin-right: 70px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #0f2027; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #2c5364,
    #203a43,
    #0f2027
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

const ButtonStyled = styled.button`
  font-family: "Ubuntu" !important;
  font-weight: 600 !important;
  color: #ffffff !important;
  font-size: 1.1rem !important;
  padding: 12px 20px !important;
  border-radius: 25px !important;
`;

const Text = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #ffffff;
  font-family: "Ubuntu";
  text-align: center;
`;

const StreamBody = ({
  screenTracks,
  handleOpenSideDrawer,
  sideDrawerOpen,
  galleryViewInput,
  canPublishStream,
  runningStatus,
}) => {
  let view = "gallery";

  console.log(screenTracks);

  let uniqueScreenUid = [];
  let processedScreenTracks = [];

  for (let element of screenTracks) {
    if (!uniqueScreenUid.includes(element.uid)) {
      processedScreenTracks.push(element);
      uniqueScreenUid.push(element.uid);
    }
  }

  console.log(processedScreenTracks);

  const { sessionDetails } = useSelector((state) => state.session);

  // Decide which view we will render (There can be three views gallery, presentation mode and video mode)

  typeof processedScreenTracks !== "undefined" &&
  processedScreenTracks.length > 0
    ? (view = "presentation")
    : (view = "gallery");

  // if view is gallery => render all streams in grid
  // if view is presentation => render allStreams in stack and screen tracks in grid

  const status = sessionDetails.runningStatus;

  let rows = "1fr 1fr";
  let columns = "1fr 1fr 1fr";

  let screenRows = "1fr";
  let screenColumns = "1fr";

  switch (processedScreenTracks.length * 1) {
    case 0:
      screenRows = "1fr";
      screenColumns = "1fr";

      break;

    case 1:
      screenRows = "1fr";
      screenColumns = "1fr";

      break;

    case 2:
      screenRows = "1fr";
      screenColumns = "1fr 1fr";

      break;

    case 3:
      screenRows = "1fr 1fr";
      screenColumns = "1fr 1fr";

      break;

    default:
      break;
  }

  switch (galleryViewInput.length * 1) {
    case 1:
      rows = "1fr";
      columns = "1fr";
      break;

    case 2:
      rows = "1fr";
      columns = "1fr 1fr";
      break;

    default:
      break;
  }

  return (
    <>
      <div>
        <a
          onClick={handleOpenSideDrawer}
          className=""
          style={{
            padding: "8px",
            backgroundColor: "#DDDDDD",
            borderRadius: "5px",
            maxWidth: "fit-content",
            position: "absolute",
            top: "10px",
            right: "20px",
            zIndex: "1",
          }}
        >
          {sideDrawerOpen ? <LastPageRoundedIcon /> : <FirstPageRoundedIcon />}
        </a>

        {
          (() => {
            // NOTE: They will be automatically taken to live or backstage based on channel they join sessionId-live or sessionId-back => Take care of this in stage nav and controls component
            switch (runningStatus) {
              case "In Progress":
                if (view === "gallery") {
                  return (
                    <>
                      <div
                        style={{
                          height: "72vh",
                          display: "grid",
                          gridTemplateColumns: columns,
                          gridTemplateRows: rows,
                          gridGap: "24px",
                          margin: "50px 65px",
                        }}
                      >
                        {galleryViewInput.map((el) => {
                          return (
                            <VideoPlayer
                              name={el.name}
                              image={el.image}
                              userId={el.userId}
                              camera={el.camera}
                              mic={el.mic}
                            />
                          );
                        })}
                      </div>
                    </>
                  );
                }
                if (view === "presentation") {
                  // Here we will make presentation mode grid
                  return (
                    <>
                      <div
                        style={{
                          height: "72vh",
                          display: "grid",
                          gridTemplateColumns: "4fr 1fr",
                          gridGap: "24px",
                          margin: "50px 65px",
                        }}
                      >
                        {/* Here we will have screen tracks and main video tracks in stacked format */}

                        <div
                          style={{
                            display: "grid",
                            gridTemplateColumns: screenColumns,
                            gridTemplateRows: screenRows,
                            gridGap: "24px",
                          }}
                        >
                          {processedScreenTracks.map((el) => {
                            return <ScreenTrackPlayer userId={el.uid} />;
                          })}
                        </div>
                        <div style={{ height: "72vh", overflow: "auto" }}>
                          {galleryViewInput.map((el) => {
                            return (
                              <VideoPlayer
                                height={"23vh"}
                                name={el.name}
                                image={el.image}
                                userId={el.userId}
                                camera={el.camera}
                                mic={el.mic}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                }
                if (view === "video") {
                  // here we will make video mode grid
                }

                break;

              case "Ended":
                // Show Ended screen
                return (
                  <NotYetStarted>
                    <img
                      src={Ended}
                      style={{ height: "300px" }}
                      className="mb-4"
                      alt={"No video"}
                    />
                    <Text className="mb-4">
                      Oops, this session has already ended. But we can still
                      watch together.
                    </Text>
                    <ButtonStyled className="btn btn-danger btn-outline-text">
                      {" "}
                      <PlayCircleRoundedIcon className="me-2" />{" "}
                      <span>Let's watch </span>
                    </ButtonStyled>
                  </NotYetStarted>
                );

              default:
                break;
            }
          })()

          // if cannot publish stream and session has ended then show session ended screen
          // if cannot publish stream and session has not ended then take to live stage => if (Started || Resumed) show videos || if(Paused or Not Yet Started) show illustration
          // if can publish and session is not live than backstage
          // if can publish and session live than livestage
          // if can publish and session has ended then show ended screen
        }
      </div>
    </>
  );
};

export default StreamBody;
