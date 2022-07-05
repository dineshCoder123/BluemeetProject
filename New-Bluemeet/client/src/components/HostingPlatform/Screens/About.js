import React, { useEffect } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Faker from "faker";
import Chip from "@mui/material/Chip";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import LanguageIcon from "@mui/icons-material/Language";
import AvatarGroup from "@mui/material/AvatarGroup";
import { useDispatch, useSelector } from "react-redux";
import NoContent from "../NoContent";
import NoSession from "./../../../assets/images/NoSession.svg";
import NoSposnors from "./../../../assets/images/NoSponsor.svg";
import {
  fetchSessionsForUser,
  navigationIndexForHostingPlatform,
} from "../../../actions";
import { useParams } from "react-router";
import history from "./../../../history";

const HostedByCard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  align-items: center;

  /* border: 1px solid #152d35; */
`;

const HostedByLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const HostedByRight = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: end;
`;

const CommunityLogo = styled.div`
  background-color: #ffffff;
  border-radius: 10px;
  align-self: center;
  justify-self: center;
  text-align: center;
`;

const SocialIconWrapper = styled.div`
  background-color: #ffffff;
  border-radius: 5px;
  padding: 5px;
  border: 1px solid transparent;

  align-self: center;
  justify-self: center;
  text-align: center;

  &:hover {
    border: 1px solid #fff;
    background-color: transparent;
    cursor: pointer;
  }
`;
const HostedByText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.95rem;
  color: #152d35;
`;
const HostedByCommunityName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #ffffff;
`;

const ButtonFilledDark = styled.div`
  padding: 6px 10px;
  text-align: center;

  font-weight: 500;
  font-size: 0.8rem;
  color: #ffffff;
  font-family: "Ubuntu";

  background-color: #152d35;

  border: 1px solid #152d35;
  border-radius: 5px;

  &:hover {
    color: #152d35;
    background-color: transparent;
    cursor: pointer;
  }
`;

const WhatsHappeningAndSponsorGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 32px;
`;

const WhatsHappeningHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #152d35;
`;

const WhatsHappeningBody = styled.div`
  border-radius: 5px;
  height: 400px;
  margin-bottom: 40px;
`;

const SessionPlaybackPreview = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px;
  height: 420px;
  background-color: #cecfcf;
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 3fr 1.5fr;
  border-radius: 15px;

  img {
    border-radius: 10px;
    width: 100%;
    max-height: 400px;
  }
`;

const SessionName = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #212121;
`;

const SessionDescription = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.82rem;
  color: #5c5c5c;
`;

const SubHeading = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #152d35;
`;

const SponsorTitle = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #152d35;
`;

const SponsorCard = styled.img`
  padding: 10px 20px;
  object-fit: contain;
  border-radius: 10px;
  border: 3px solid #152d35;
  background-color: #e6e6e6;
  height: 120px;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);

    cursor: pointer;
  }
`;

const TierOneGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;

const TierTwoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;

const TierThreeGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;
const TierFourGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;
const TierFiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;
const TierSixGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;
const TierSevenGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;
const TierEightGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 24px;
  min-height: 130px;
`;

const renderSpeakers = (speakers) => {
  speakers.map((speaker) => {
    return (
      <Avatar
        alt={speaker.name}
        src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${speaker.image}`}
      />
    );
  });
};

const renderAttendees = (attendees) => {
  return attendees.map((attendee) => {
    if (attendee.status !== "Active") return;
    return (
      <Avatar
        alt={attendee.userName}
        src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${attendee.userImage}`}
      />
    );
  });
};

// Diamond || Platinum || Gold || Bronze

const PlatinumSponsors = (sponsors) => {
  return sponsors.map((sponsor) => {
    if (sponsor.status !== "Platinum") return;
    return (
      <a href={`//${sponsor.website}`} target="_blank" rel="noreferrer">
        <SponsorCard
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
        />
      </a>
    );
  });
};
const DiamondSponsors = (sponsors) => {
  return sponsors.map((sponsor) => {
    if (sponsor.status !== "Diamond") return;
    return (
      <a href={`//${sponsor.website}`} target="_blank" rel="noreferrer">
        <SponsorCard
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
        />
      </a>
    );
  });
};
const GoldSponsors = (sponsors) => {
  return sponsors.map((sponsor) => {
    if (sponsor.status !== "Gold") return;
    return (
      <a href={`//${sponsor.website}`} target="_blank" rel="noreferrer">
        <SponsorCard
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
        />
      </a>
    );
  });
};
const BronzeSponsors = (sponsors) => {
  return sponsors.map((sponsor) => {
    if (sponsor.status !== "Bronze") return;
    return (
      <a href={`//${sponsor.website}`} target="_blank" rel="noreferrer">
        <SponsorCard
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${sponsor.image}`}
        />
      </a>
    );
  });
};

const About = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.eventId;
  const communityId = params.communityId;

  const { communityDetails } = useSelector((state) => state.community);
  const { eventDetails } = useSelector((state) => state.event);
  const { sessions } = useSelector((state) => state.session);
  const { sponsors } = useSelector((state) => state.sponsor);

  // fetch all sessions on this page

  useEffect(() => {
    dispatch(fetchSessionsForUser(eventId));
  }, [dispatch, eventId]);

  let highlightedSessionId;

  if (eventDetails.highlightedSession) {
    highlightedSessionId = eventDetails.highlightedSession;
  } else {
    if (sessions[0]) {
      highlightedSessionId = sessions[0]._id;
    }
  }

  // Now get the document of session that is to be highlighted.

  const requiredSession = sessions.find(
    (session) => session._id === highlightedSessionId
  );

  if (!communityDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <HostedByCard className="mb-5">
        <HostedByLeft>
          <CommunityLogo className="me-3">
            <Avatar
              src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${communityDetails.image}`}
              variant="rounded"
              style={{ height: "3rem", width: "3rem" }}
            />
          </CommunityLogo>
          <div>
            <HostedByText className="mb-2">Hosted by</HostedByText>
            <HostedByCommunityName>
              {communityDetails.name}
            </HostedByCommunityName>
          </div>
        </HostedByLeft>
        {communityDetails.socialMediaHandles ? (
          <HostedByRight>
            <div className="d-flex flex-row align-items-center justify-content-center">
              {communityDetails.socialMediaHandles.facebook ? (
                <a
                  href={`//${communityDetails.socialMediaHandles.facebook}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIconWrapper className="me-3">
                    <FacebookIcon
                      style={{ fontSize: "24px", color: "#4267B2" }}
                    />
                  </SocialIconWrapper>
                </a>
              ) : (
                <></>
              )}

              {communityDetails.socialMediaHandles.linkedin ? (
                <a
                  href={`//${communityDetails.socialMediaHandles.linkedin}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIconWrapper className="me-3">
                    <LinkedInIcon
                      style={{ fontSize: "24px", color: "#0077b5" }}
                    />
                  </SocialIconWrapper>
                </a>
              ) : (
                <></>
              )}

              {communityDetails.socialMediaHandles.twitter ? (
                <a
                  href={`//${communityDetails.socialMediaHandles.twitter}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIconWrapper className="me-3">
                    <TwitterIcon
                      style={{ fontSize: "24px", color: "#1DA1F2" }}
                    />
                  </SocialIconWrapper>
                </a>
              ) : (
                <></>
              )}

              {communityDetails.socialMediaHandles.website ? (
                <a
                  href={`//${communityDetails.socialMediaHandles.website}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <SocialIconWrapper>
                    <LanguageIcon
                      style={{ fontSize: "24px", color: "#152d35" }}
                    />
                  </SocialIconWrapper>
                </a>
              ) : (
                <></>
              )}
            </div>
          </HostedByRight>
        ) : (
          <></>
        )}
      </HostedByCard>

      <WhatsHappeningAndSponsorGrid>
        <div className="">
          <WhatsHappeningHeading className="mb-4">
            What's happening
          </WhatsHappeningHeading>

          {typeof eventDetails.session !== "undefined" &&
          eventDetails.session.length > 0 &&
          requiredSession ? (
            <WhatsHappeningBody>
              <SessionPlaybackPreview>
                <div>
                  <Chip
                    label={requiredSession.runningStatus}
                    color="error"
                    style={{
                      position: "absolute",
                      top: "20px",
                      left: "20px",
                      zIndex: "10",
                      fontWeight: "500",
                    }}
                  />
                  <img
                    src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${requiredSession.previewImage}`}
                    alt="session-playback-preview"
                  />
                </div>

                <div className="p-3">
                  <SessionName className="mb-3">
                    {requiredSession.name}
                  </SessionName>
                  <SessionDescription className="mb-4">
                    {requiredSession.description}
                  </SessionDescription>

                  <SubHeading className="mb-3">Speakers</SubHeading>

                  <div className="d-flex flex-row align-items-center justify-content-start mb-4">
                    <AvatarGroup max={5}>
                      {typeof requiredSession.speaker !== "undefined" &&
                      requiredSession.speaker.length > 0 ? (
                        renderSpeakers(requiredSession.speaker)
                      ) : (
                        <Chip
                          label="No speaker assigned"
                          color="primary"
                          style={{ fontWeight: "500" }}
                        />
                      )}
                    </AvatarGroup>
                  </div>

                  <SubHeading className="mb-3">Attendees</SubHeading>

                  <div className="d-flex flex-row align-items-center justify-content-start mb-4">
                    <AvatarGroup max={5}>
                      {typeof requiredSession.currentlyInSession !==
                        "undefined" &&
                      requiredSession.currentlyInSession.length > 0 ? (
                        renderAttendees(requiredSession.currentlyInSession)
                      ) : (
                        <Chip
                          label="Be the first to attend"
                          color="primary"
                          style={{ fontWeight: "500" }}
                        />
                      )}
                    </AvatarGroup>
                  </div>
                  <button
                    onClick={() => {
                      dispatch(navigationIndexForHostingPlatform(3));
                      history.push(
                        `/community/${communityId}/event/${eventId}/hosting-platform/Sessions`
                      );
                    }}
                    className="btn btn-outline-text btn-primary"
                    style={{
                      width: "100%",
                    }}
                  >
                    Join
                  </button>
                </div>
              </SessionPlaybackPreview>
            </WhatsHappeningBody>
          ) : (
            <>
              <NoContent
                className="mb-4"
                Image={NoSession}
                Msg={"There is nothing in agenda."}
              />
            </>
          )}
        </div>
      </WhatsHappeningAndSponsorGrid>

      <div className="py-4">
        <WhatsHappeningHeading className="mb-4">
          Our partners
        </WhatsHappeningHeading>

        {typeof eventDetails.sponsors !== "undefined" &&
        eventDetails.sponsors.length > 0 ? (
          <>
            <SponsorTitle className="mb-3">Platinum</SponsorTitle>

            <TierOneGrid className="mb-5">
              {PlatinumSponsors(sponsors)}
            </TierOneGrid>

            <SponsorTitle className="mb-3">Diamond</SponsorTitle>

            <TierTwoGrid className="mb-5">
              {DiamondSponsors(sponsors)}
            </TierTwoGrid>

            <SponsorTitle className="mb-3">Gold</SponsorTitle>

            <TierThreeGrid className="mb-5">
              {GoldSponsors(sponsors)}
            </TierThreeGrid>

            <SponsorTitle className="mb-3">Bronze</SponsorTitle>

            <TierFourGrid className="mb-5">
              {BronzeSponsors(sponsors)}
            </TierFourGrid>
          </>
        ) : (
          <>
            <NoContent
              className="mb-4"
              Image={NoSposnors}
              Msg={"There are no sponsors yet."}
            />
          </>
        )}
      </div>
    </>
  );
};

export default About;
