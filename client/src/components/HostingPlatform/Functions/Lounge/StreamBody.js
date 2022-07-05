import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import {
  renderGalleryView,
  renderMainStream,
  renderMiniStreams,
  renderScreenShareStream,
} from "./renderViewFxns";

const GalleryView = styled.div`
  min-height: 65vh;

  height: 90%;
  display: grid;
  grid-template-columns: ${(props) =>
    props.col && props.col ? props.col : "1fr 1fr 1fr 1fr"};
  grid-template-rows: ${(props) =>
    props.row && props.row ? props.row : "1fr 1fr"};
  grid-gap: 24px;
  /* justify-content: center; */

  padding: 8vh 3vw;
`;

const GridView = styled.div`
  min-height: 65vh;
  height: 90%;
  display: grid;
  grid-template-columns: 4fr 1.3fr;
  grid-gap: 24px;

  padding: 8vh 3vw;
`;


const GridViewMini = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 16px;

  /* grid-template-columns: 1fr 1fr 1fr 1fr; */
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
`;

const StreamBody = ({
  col,
  row,
  allStreams,
  screenStream,
  prominentStream,
  mainStream,
  miniStreams,
  view,
  audioStreamStat,
  videoStreamStat,
  // volumeIndicators,
  peopleOnThisTable,
}) => {
  const { volumeIndicators } = useSelector((state) => state.streaming);
  return (
    <>
      <div style={{height: "100%", minHeight: "65vh"}}>
        {typeof allStreams !== "undefined" && allStreams.length > 0 ? (
          <div className="">
            {(() => {
              switch (view) {
                case "gallery":
                  return (
                    <GalleryView
                      col={col}
                      row={row}
                      style={{
                        padding: "0",
                        minHeight: "65vh",
                        height: "100%",
                      }}
                    >
                      {allStreams &&
                        renderGalleryView(
                          allStreams,
                          audioStreamStat,
                          videoStreamStat,
                          volumeIndicators,
                          peopleOnThisTable
                        )}
                    </GalleryView>
                  );
                case "grid":
                  return (
                    <GridView>
                      {/* Render main stream here */}
                      {/* <VideoStreamContainer /> */}
                      {mainStream &&
                        renderMainStream(
                          mainStream,
                          audioStreamStat,
                          videoStreamStat,
                          volumeIndicators,
                          peopleOnThisTable
                        )}
                      <GridViewMini>
                        {/* <VideoStreamContainer /> */}
                        {miniStreams &&
                          renderMiniStreams(
                            miniStreams,
                            audioStreamStat,
                            videoStreamStat,
                            volumeIndicators,
                            peopleOnThisTable
                          )}
                        {/* Render mini views here */}
                      </GridViewMini>
                    </GridView>
                  );

                
                case "screenShare":
                  return (
                    <GridView>
                      {screenStream &&
                        renderScreenShareStream(
                          screenStream,
                          peopleOnThisTable
                        )}
                      <GridViewMini>
                        {allStreams &&
                          renderMiniStreams(
                            allStreams,
                            audioStreamStat,
                            videoStreamStat,
                            volumeIndicators,
                            peopleOnThisTable
                          )}
                      </GridViewMini>
                    </GridView>
                  );
                default:
                  break;
              }
            })()}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default StreamBody;
