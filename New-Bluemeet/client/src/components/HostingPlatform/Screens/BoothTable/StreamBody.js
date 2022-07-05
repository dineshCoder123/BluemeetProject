import React from "react";
import VideoPlayer from "./player/VideoPlayer";
import ScreenTrackPlayer from "./player/ScreenTrackPlayer";

const StreamBody = ({ screenTracks, galleryViewInput }) => {
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

  // Decide which view we will render (There can be three views gallery, presentation mode and video mode)

  typeof processedScreenTracks !== "undefined" &&
  processedScreenTracks.length > 0
    ? (view = "presentation")
    : (view = "gallery");

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
      {view === "gallery" ? (
        <>
          <div
            style={{
              height: "72vh",
              display: "grid",
              gridTemplateColumns: columns,
              gridTemplateRows: rows,
              gridGap: "24px",
              margin: "20px 25px",
            }}
          >
            {galleryViewInput.map((el) => {
              console.log(el);
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
      ) : (
        <>
          <div
            style={{
              height: "65vh",
              display: "grid",
              gridTemplateColumns: "4fr 1fr",
              gridGap: "12px",
              margin: "10px 15px",
            }}
          >
            {/* Here we will have screen tracks and main video tracks in stacked format */}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: screenColumns,
                gridTemplateRows: screenRows,
                gridGap: "12px",
              }}
            >
              {processedScreenTracks.map((el) => {
                return <ScreenTrackPlayer userId={el.uid} />;
              })}
            </div>
            <div style={{ height: "65vh", overflow: "auto" }}>
              {galleryViewInput.map((el) => {
                return (
                  <VideoPlayer
                    hideIdentity={true}
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
      )}
    </>
  );
};

export default StreamBody;
