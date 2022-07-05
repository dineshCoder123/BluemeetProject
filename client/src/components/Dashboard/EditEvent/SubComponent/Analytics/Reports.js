import React, { useState } from "react";
import styled from "styled-components";

// Report Icons
import VideoCameraBackRoundedIcon from "@mui/icons-material/VideoCameraBackRounded"; // Event Summary Report No. 1
import PersonOutlineRoundedIcon from "@mui/icons-material/PersonOutlineRounded"; // Attendee report No. 2
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded"; // Schedule Report No. 3
import PollRoundedIcon from "@mui/icons-material/PollRounded"; // poll Report No. 4
import HelpRoundedIcon from "@mui/icons-material/HelpRounded"; // Question and answer Report No. 5
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded"; // Connections Report No. 6
import ChatBubbleRoundedIcon from "@mui/icons-material/ChatBubbleRounded"; // Event Chat Report No. 7
import AppRegistrationRoundedIcon from "@mui/icons-material/AppRegistrationRounded"; // Registered user Report No. 8
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded"; // Referral Report No. 9
import AllOutRoundedIcon from "@mui/icons-material/AllOutRounded"; // All reports bundle Report No. 10
import CallMergeRoundedIcon from "@mui/icons-material/CallMergeRounded"; // Attendee activity Report No. 11
import PreviewRoundedIcon from "@mui/icons-material/PreviewRounded"; // Viewership counts Report No. 12
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded"; // Attendee score Report No. 13
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded"; // Post Event Survey Report No. 14
import EventNoteRoundedIcon from "@mui/icons-material/EventNoteRounded"; // Scheduled meetings Report No. 15
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded"; // Networking Meetings Report No. 16
import AvTimerRoundedIcon from "@mui/icons-material/AvTimerRounded"; // Participation Duration Report No. 17
import StoreMallDirectoryRoundedIcon from "@mui/icons-material/StoreMallDirectoryRounded"; // Booth Engagement Report No. 18
import TagFacesRoundedIcon from "@mui/icons-material/TagFacesRounded"; // Booth Interaction Report No. 19
import CalendarTodayRoundedIcon from "@mui/icons-material/CalendarTodayRounded"; // Participation by Schedule Report No. 20
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded"; // Photo Booth Report No. 21
import AddAlertRoundedIcon from "@mui/icons-material/AddAlertRounded"; // Event Alerts Report No. 22
import MailRoundedIcon from "@mui/icons-material/MailRounded"; // Mail campaign Report No. 23
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded"; // Sponsor shoutouts Report No. 24
import FlagRoundedIcon from "@mui/icons-material/FlagRounded"; // Moderation Audit Report No. 25
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded"; // Leaderboard Report No. 26
import PublicRoundedIcon from "@mui/icons-material/PublicRounded"; // Demographic Report No. 27
import TopicRoundedIcon from "@mui/icons-material/TopicRounded"; // Interests Report No. 28
import StorageRoundedIcon from "@mui/icons-material/StorageRounded"; // Registration form data report No. 29
import DownloadHistory from "./DownloadHistory";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
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

const TextBrief = styled.div`
  font-family: "Ubuntu";
  font-weight: 500;
  font-size: 0.8rem;
  color: #212121;
`;

const EventReportGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;

  overflow: auto;
  height: 98vh;
`;

const EventReportCard = styled.div`
  border: 1px solid #b3b3b3;
  border-radius: 10px;
  padding: 24px;
  background-color: #ffffff;

  button {
    visibility: hidden;
  }

  &:hover {
    border: 1px solid #a1a9ee;
    button {
      visibility: visible !important;
    }
  }
`;

const EventReportTitle = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1rem;
  color: #212121;
`;

const EventReportBrief = styled.div`
  font-family: "Ubuntu";
  font-weight: 400;
  font-size: 0.785rem;
  letter-spacing: 0.3px;
  color: #535353;
`;

const EventReportIconBox = styled.div`
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props && props.color ? props.color : "#538BF7"};
  color: #ffffff;
`;

const Reports = () => {
  const [activeTab, setActiveTab] = useState("reports");

  return (
    <>
      {/* <div
        className="d-flex flex-row align-items-center mb-4"
        style={{ borderBottom: "1px solid #D1D1D1" }}
      >
        <SwitchTab
          active={activeTab === "reports" ? true : false}
          className=" me-5"
          onClick={() => {
            setActiveTab("reports");
          }}
        >
          Reports
        </SwitchTab>
        <SwitchTab
          active={activeTab === "downloadshistory" ? true : false}
          onClick={() => {
            setActiveTab("downloadshistory");
          }}
        >
          Downloads History
        </SwitchTab>
      </div> */}

      <SectionHeading className="mb-3">Analytics</SectionHeading>

      <TextBrief className="mb-4">
        Here you can query various reports from your event.
      </TextBrief>

      {(() => {
        switch (activeTab) {
          case "reports":
            return (
              <EventReportGrid className="mb-5 pb-3">
                <EventReportCard>
                  <EventReportIconBox
                    color={"#2E70F3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <VideoCameraBackRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Event Summary Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    High-level summary metrics about your event, including
                    attendee information, ticket sales and survey scores.
                    Options include a general event summary, or a summary report
                    of a particular area of your event like a stage, session or
                    expo booth.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#16D860"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <PersonOutlineRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Attendees Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Details of all the attendees at your event, including name,
                    email, ticket type and participation record.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#ACB80C"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <ScheduleRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Schedule Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Details of your event’s schedule, including item names and
                    descriptions, start and end times and details of speakers.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F3762E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <PollRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Poll Results Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Answers to poll questions provided by attendees at your
                    event.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F32E2E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <HelpRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Questions and Answers Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all questions asked during your event using the Q&A
                    feature, including their responses, number of upvotes and
                    who asked and answered each question.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#C52EF3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <GroupsRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Connections Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all attendees at your event and their participation
                    in networking, including how many connection requests they
                    sent and received and how many connections they made.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#0CB164"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <ChatBubbleRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Event chat Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Detailed logs of every message sent in your event’s chat
                    areas. This can be from the general event chat or for
                    specific areas of your event, like a stage, session or expo
                    booth.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#D88D14"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <AppRegistrationRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Registered users Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Details of all the attendees at your event, including name,
                    email, ticket type and participation record. Also includes
                    payment and promotion information.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#15B6D3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <ConnectWithoutContactRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Refferal Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Details of all the attendees at your event who joined via a
                    referral code.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#2E70F3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <AllOutRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    All Reports Bundle
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    A ZIP file containing all the reports listed on this page as
                    individual CSV files.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#13D66E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <CallMergeRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Attendee Activities Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Detailed logs of the movements of attendees at your event,
                    including each area they visited and how long they visited
                    for.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F32E2E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <PreviewRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Viewership counts Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Counts of the number of attendees in each area of your
                    event, sampled at intervals throughout the event’s duration.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F3972E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <RateReviewRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Attendee scores Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Scores given to your event by your attendees.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#B0B310"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <ContentPasteRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Post Event Survey Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Scores and post-event feedback from attendees at your event.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#792EF3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <EventNoteRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Scheduled meetings Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all scheduled meetings during your event, including
                    who participated and how long the meeting lasted.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#0FB32A"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <CategoryRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Networking Meetings Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all networking meetings during your event, including
                    which attendees were matched and whether or not they decided
                    to connect.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F32EC2"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <AvTimerRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Participation Duration Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all attendees at your event and how long they spent
                    in various areas. Can be limited to networking or a
                    particular stage, session or expo booth.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F3C52E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <StoreMallDirectoryRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Booth Engagement Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all attendees who visited a particular expo booth.
                    Includes engagement metrics such as time spent, CTA clicks,
                    and comments made.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F3662E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <TagFacesRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Booth interactions Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all attendees who interacted with a particular expo
                    booth by clicking a link or registering their interest.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#2E70F3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <CalendarTodayRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Participation report by Schedule
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all attendees at your event and how long they spent
                    in various areas. Can be limited to a particular schedule.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#374646"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <PhotoCameraRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Photo Booth Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all activities that happened in various segments at
                    photo booth along with a direct access link to photos.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#4E8D07"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <AddAlertRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Event alerts Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Logs of all alerts that were published during event. It can
                    be requested based on schedule or complete.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#2E70F3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <MailRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Mailing campaign Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all mail camapigns that were published during the
                    lifecycle of event.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F32E8A"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <CampaignRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Sponsors shoutout Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all sponsor shoutouts that were given during event
                    in various sessions and how attendees reacted to that.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#C2A60A"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <FlagRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Moderation Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of all reported activities during the event lifecycle
                    and actions taken by team moderators on them.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#F32E2E"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <EmojiEventsRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Leaderboard Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Logs of how attendees competed to get up on leaderboard list
                    along with their scores and activities based on which they
                    were awareded points.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#832EF3"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <PublicRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Demographic report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of attendees, exhibits, speakers based on thier
                    demographics to provide an insight on division of audience
                    globally.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#072A70"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <TopicRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Interests Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    List of attendees, exhibitors and speakers classified based
                    on thier interests.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
                <EventReportCard>
                  <EventReportIconBox
                    color={"#0BC26D"}
                    className="mb-3"
                    style={{ width: "fit-content" }}
                  >
                    <StorageRoundedIcon />
                  </EventReportIconBox>

                  <EventReportTitle className="mb-4">
                    Registration Data Report
                  </EventReportTitle>

                  <EventReportBrief className="mb-4">
                    Registration data that was collected during the registration
                    process in CSV format.
                  </EventReportBrief>

                  <button className="btn btn-outline-text btn-primary mb-2">
                    Generate
                  </button>
                </EventReportCard>
              </EventReportGrid>
            );

          case "downloadshistory":
            return <DownloadHistory />;

          default:
            break;
        }
      })()}
    </>
  );
};

export default Reports;
