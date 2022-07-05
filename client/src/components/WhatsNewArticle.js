import React from "react";
import styled from "styled-components";
import Chip from "@mui/material/Chip";

import SentimentVerySatisfiedRoundedIcon from "@mui/icons-material/SentimentVerySatisfiedRounded"; //Sentiment Very satisfied
import MoodRoundedIcon from "@mui/icons-material/MoodRounded"; // Sentiment Happy mood
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded"; // Sentiment Disstatisfied mood
import { IconButton } from "@material-ui/core";

const chipStyle = {
  backgroundColor: "#E73636",
  color: "#fff",
  fontFamily: "Ubuntu",
  fontWeight: "500",
  fontSize: "0.7rem",
};

const WhatsNewArticleBody = styled.div`
  height: auto;
  background-color: #ffffff;
  border-radius: 10px;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 0px 3px 0 #152d353f;
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const ArticlePublishedDate = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
`;

const ArticleTitle = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 1rem;
`;

const ArticleGraphicContainer = styled.div`
  height: 210px;
  border-radius: 10px;

  background-color: #212121;
`;

const ArticleIntro = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  color: #212121;
  font-family: "Ubuntu";
`;

const KnowMoreArticleButton = styled.div`
  font-size: 0.9rem;
  font-weight: 500;
  font-family: "Ubuntu";
  text-decoration: underline;
  color: #3d3d3d;
`;

const WhatsNewArticleFeedbackContainer = styled.div`
  position: relative;
  background-color: #eeeeee;
  height: 30px;
`;

const Input = styled.input`
  &:focus {
    border: 1px solid #152d35 !important;
  }
  &:hover {
    border: 1px solid #152d35 !important;
  }
`;

const WhatsNewArticle = () => {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };
  return (
    <>
      <WhatsNewArticleBody className="px-3 py-2">
        <div className="d-flex flex-row align-items-center mb-3">
          <Chip
            label="New"
            onClick={handleClick}
            style={chipStyle}
            className="me-3"
          />

          <ArticlePublishedDate>Sep 21 2021</ArticlePublishedDate>
        </div>
        <ArticleTitle className="mb-3">
          Bringing Swag and Event gamification
        </ArticleTitle>

        <ArticleGraphicContainer
          style={{ objectFit: "cover" }}
          className="mb-3"
        >
          <img
            src={
              "https://www.blueberryink.com/images/blog/blog-1082-best-swag-bags.jpg"
            }
            alt="event swags"
            style={{
              objectFit: "cover",
              height: "210px",
              width: "100%",
              borderRadius: "10px",
            }}
          />
        </ArticleGraphicContainer>

        <ArticleIntro className="mb-3">
          Now never let your attendees miss a moment of action from the event.
          After a session is complete, our system will automatically make it
          available for replay.
        </ArticleIntro>

        <KnowMoreArticleButton className="mb-2">
          Know more
        </KnowMoreArticleButton>

        <div className="d-flex flex-row align-items-center justify-content-center mb-3">
          <IconButton>
            <SentimentDissatisfiedRoundedIcon />
          </IconButton>
          <IconButton>
            <MoodRoundedIcon />
          </IconButton>
          <IconButton>
            <SentimentVerySatisfiedRoundedIcon />
          </IconButton>
        </div>

        <WhatsNewArticleFeedbackContainer className="mb-3">
          <Input
            className="form-control"
            type="text"
            placeholder="Send us your feedback"
          ></Input>
        </WhatsNewArticleFeedbackContainer>
      </WhatsNewArticleBody>
    </>
  );
};

export default WhatsNewArticle;
