import React from "react";
import styled from "styled-components";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LanguageRoundedIcon from "@material-ui/icons/LanguageRounded";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";

import α from "color-alpha";

const Card = styled.div`
  border: ${(props) =>
    props.color ? `1px solid ${α(props.color, 0.3)}` : "1px solid #212121"};
`;

const SpeakerName = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;
`;

const SpeakerBrief = styled.div`
  font-weight: 400;
  font-size: 0.8rem;
  color: #212121;
`;

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
    width: theme.spacing(5),
    height: theme.spacing(5),
  },
}));

const SpeakerCard = ({
  firstName,
  lastName,
  bio,
  speakerSocialHandles,
  imgURL,
  organisation,
  headline,
  id,
  color,
}) => {
  const linkedIn = speakerSocialHandles && speakerSocialHandles.linkedIn;
  const twitter = speakerSocialHandles && speakerSocialHandles.twitter;
  const facebook = speakerSocialHandles && speakerSocialHandles.facebook;
  const website = speakerSocialHandles && speakerSocialHandles.website;

  const classes = useStyles();
  return (
    <Card className="speaker-card px-4 py-3" key={id} color={color}>
      <Avatar
        alt={firstName}
        variant="rounded"
        className={classes.large}
        src={imgURL}
      />
      {/* <AvatarComponent variant="rounded" alt={firstName} imgURL={Faker.image.avatar()} /> */}
      <div className="speaker-card-other-details">
        <SpeakerName className="speaker-name mb-2 px-3">
          {firstName + " " + lastName}
        </SpeakerName>
        <SpeakerBrief className="speaker-about mb-2 px-3">
          {organisation}
        </SpeakerBrief>
        {/* <div className="speaker-about mb-2 px-3">{headline}</div> */}
        <div className="speaker-social-media-grid">
          {linkedIn && (
            <a href={`//${linkedIn}`} target="_blank" rel="noreferrer">
              <IconButton>
                <LinkedInIcon style={{ fill: "#2565A5", fontSize: "22px" }} />
              </IconButton>
            </a>
          )}

          {twitter && (
            <a href={`//${twitter}`} target="_blank" rel="noreferrer">
              <IconButton>
                <TwitterIcon style={{ fill: "#539FF7", fontSize: "22px" }} />
              </IconButton>
            </a>
          )}

          {facebook && (
            <a href={`//${facebook}`} target="_blank" rel="noreferrer">
              <IconButton>
                <FacebookIcon style={{ fill: "#1760A8", fontSize: "22px" }} />
              </IconButton>
            </a>
          )}

          {website && (
            <a href={`//${website}`} target="_blank" rel="noreferrer">
              <IconButton>
                <LanguageRoundedIcon
                  style={{ fill: "#A59EA0", fontSize: "22px" }}
                />
              </IconButton>
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default SpeakerCard;
