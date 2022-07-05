import React from "react";
import styled from "styled-components";

import { SwipeableDrawer } from "@material-ui/core";
import DragIndicatorRoundedIcon from "@mui/icons-material/DragIndicatorRounded";
import PanoramaRoundedIcon from "@mui/icons-material/PanoramaRounded";
import CardGiftcardRoundedIcon from "@mui/icons-material/CardGiftcardRounded"; // Gift / Promo offer
import QuizRoundedIcon from "@mui/icons-material/QuizRounded"; // Quiz/survey
import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded"; // Link
import LinkedCameraRoundedIcon from "@mui/icons-material/LinkedCameraRounded"; // Photo booth
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded"; // Video
import MonetizationOnRoundedIcon from "@mui/icons-material/MonetizationOnRounded"; // Money
import CameraEnhanceRounded from "@mui/icons-material/CameraEnhanceRounded";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReceptionStatic from "./../../../../assets/images/reception.svg";

const Paper = styled.div`
  width: 90vw;
  background-color: #ffffff;
`;
const MainHeading = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.25rem;
  color: #212121;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 5fr 1.5fr;
  grid-gap: 10px;
`;

const SubHeading = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;

const TextSmall = styled.div`
  font-weight: 400;
  font-family: "Ubuntu";
  font-size: 0.72rem;
  color: #212121;
`;

const ElementsPaper = styled.div`
  height: 100%;
  background-color: #f6f6f6;
  height: 88.7vh;
  overflow: auto;
`;

const ElementOuterBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const ElementInnerBox = styled.div`
  width: 100%;
  border: 1px solid #959595;
  border-radius: 10px;

  &:hover {
    border: 1px solid #538bf7;
    cursor: pointer;
    background-color: #eef1f8;
  }
`;

const ElementName = styled.div`
  font-size: 1rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #2f2f2f;
`;

const ElementBrief = styled.div`
  font-weight: 500;
  font-size: 0.7rem;
  font-family: "Ubuntu";
  color: #5a5a5a;
`;

class List extends React.Component {
  render() {
    const { provided, innerRef, children } = this.props;
    return (
      <div {...provided.droppableProps} ref={innerRef}>
        {children}
      </div>
    );
  }
}

class ReceptionBackdropElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox>
          <ElementInnerBox className="p-4 mb-3">
            <div className="d-flex flex-row ">
              <PanoramaRoundedIcon className="me-3" />
              <div>
                <ElementName className="mb-2">Reception Backdrop</ElementName>
                <ElementBrief>
                  Add a background photo for your reception and then you can
                  place various other elements over it as per your needs.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}

class ReceptionVideosElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox className="mb-3">
          <ElementInnerBox className="p-4">
            <div className="d-flex flex-row ">
              <VideocamRoundedIcon className="me-3" />
              <div>
                <ElementName className="mb-2">Videos</ElementName>
                <ElementBrief>
                  You can add intro videos to welcome attendees like product
                  showcase, services, etc.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}
class ReceptionLinksElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox className="mb-3">
          <ElementInnerBox className="p-4">
            <div className="d-flex flex-row ">
              <InsertLinkRoundedIcon className="me-3" />
              <div>
                <ElementName className="mb-2">Links</ElementName>
                <ElementBrief>
                  You can add links to various areas of the event or any
                  external URLs.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}
class ReceptionPhotoElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox className="mb-3">
          <ElementInnerBox className="p-4">
            <div className="d-flex flex-row ">
              <CameraEnhanceRounded className="me-3" />
              <div>
                <ElementName className="mb-2">Photo booth</ElementName>
                <ElementBrief>
                  Add interactive photo booth with stickers, sharing and collage
                  capibilities. Its sure shot way to boost participation and
                  increase reach of your event.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}

class ReceptionPromoOffersElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox className="mb-3">
          <ElementInnerBox className="p-4">
            <div className="d-flex flex-row ">
              <CardGiftcardRoundedIcon className="me-3" />
              <div>
                <ElementName className="mb-2">Promo offers</ElementName>
                <ElementBrief>
                  You can add exciting promo offers to boost engagement and
                  sales in order to drive ROI for yourself, your sponsors and
                  your exhibitors.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}

class ReceptionSponsorsElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox className="mb-3">
          <ElementInnerBox className="p-4">
            <div className="d-flex flex-row ">
              <MonetizationOnRoundedIcon className="me-3" />
              <div>
                <ElementName className="mb-2">Sponsors</ElementName>
                <ElementBrief>
                  You can put limelight on upto 6 sponsors from top 3 tiers in
                  your event at reception.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}

class ReceptionQuizElement extends React.Component {
  render() {
    const { provided, innerRef } = this.props;
    return (
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={innerRef}
      >
        <ElementOuterBox className="mb-3">
          <ElementInnerBox className="p-4">
            <div className="d-flex flex-row ">
              <QuizRoundedIcon className="me-3" />
              <div>
                <ElementName className="mb-2">Quiz / Survey</ElementName>
                <ElementBrief>
                  You can embedd interactive quiz or survey forms to your
                  reception with Typeform integration.
                </ElementBrief>
              </div>
            </div>
          </ElementInnerBox>
        </ElementOuterBox>
      </div>
    );
  }
}

const ReceptionCustomization = ({ open, handleClose }) => {
  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <Paper className="p-4 pb-0">
            <div className="p-1 pb-1">
              <div
                className="d-flex flex-row align-items-center justify-content-between pb-3"
                style={{ borderBottom: "1px solid #959595" }}
              >
                <MainHeading>Customize reception</MainHeading>
                <div className="d-flex flex-row align-items-center">
                  <button
                    onClick={() => {
                      handleClose();
                    }}
                    className="btn btn-outline-text btn-outline-dark me-3"
                  >
                    Cancel
                  </button>
                  <button className="btn btn-outline-text btn-primary">
                    Save
                  </button>
                </div>
              </div>
              <DragDropContext
                onDragEnd={(event) => {
                  console.log(event);
                }}
              >
                <Grid style={{ overflow: "auto" }}>
                  <div className="d-flex flex-row align-items-center justify-content-center">
                    <img src={ReceptionStatic} alt="reception" />
                  </div>
                  <ElementsPaper
                    style={{ minWidth: "360px", overflow: "auto" }}
                  >
                    <div className="p-4">
                      <SubHeading className="mb-2">
                        Reception Elements
                      </SubHeading>
                      <TextSmall className="mb-4">
                        Drag and drop elements to place on the Reception. You
                        can then format them to your needs and expectations.
                      </TextSmall>
                      <Droppable droppableId="droppable">
                        {(provided) => (
                          <List
                            provided={provided}
                            innerRef={provided.innerRef}
                          >
                            <Draggable draggableId="0" index={0}>
                              {(provided) => (
                                <ReceptionBackdropElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>
                            <Draggable draggableId="1" index={1}>
                              {(provided) => (
                                <ReceptionVideosElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>
                            <Draggable draggableId="2" index={2}>
                              {(provided) => (
                                <ReceptionLinksElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>
                            <Draggable draggableId="3" index={3}>
                              {(provided) => (
                                <ReceptionPhotoElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>
                            <Draggable draggableId="4" index={4}>
                              {(provided) => (
                                <ReceptionPromoOffersElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>
                            <Draggable draggableId="5" index={5}>
                              {(provided) => (
                                <ReceptionSponsorsElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>
                            <Draggable draggableId="6" index={6}>
                              {(provided) => (
                                <ReceptionQuizElement
                                  provided={provided}
                                  innerRef={provided.innerRef}
                                />
                              )}
                            </Draggable>

                            {provided.placeholder}
                          </List>
                        )}
                      </Droppable>
                    </div>
                  </ElementsPaper>
                </Grid>
              </DragDropContext>
            </div>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default ReceptionCustomization;
