import { IconButton } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import PreFooter from "../PreFooter";
import TopNavNew from "../StaticScreens/Helper/TopNavNew";
import StaticBanner from "../StaticScreens/Screens/StaticBanner";
import KeyboardArrowLeftRoundedIcon from "@mui/icons-material/KeyboardArrowLeftRounded";
import { Avatar } from "@material-ui/core";
import Faker from "faker";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";

import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

import ArrowRightAltRoundedIcon from "@mui/icons-material/ArrowRightAltRounded";

const Body = styled.div`
  background-color: #152d35;
`;

const HeroHeading = styled.div`
  font-weight: 400;
  font-size: 1.6rem;
  color: #ffffff;
  letter-spacing: 2px;
`;

const Back = styled.span`
  font-weight: 500;
  font-size: 0.9rem;
  color: #ffffff;
`;

const AuthorName = styled.span`
  font-weight: 600;
  font-size: 0.85rem;
  color: #ffffff;
`;
const AuthorPosition = styled.span`
  font-weight: 500;
  font-size: 0.82rem;
  color: #ffffff;
`;
const PublishedDate = styled.span`
  font-weight: 500;
  font-size: 0.82rem;
  color: #ffffff;
`;

const TimeToRead = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #d3d3d3;
`;

const BlogImage = styled.img`
  height: 350px;
  border-radius: 20px;
  width: 100%;
  object-fit: cover;
  border: 1px solid #888888;
`;

const BlogText = styled.div`
  font-size: 1rem;
  font-weight: 400;
  color: #d6d6d6;
  word-spacing: 2px;
  letter-spacing: 0.5px;
`;

const GetStartedWithBluemeet = styled.div`
  border-radius: 10px;
  border: 1px solid #777777;

  font-weight: 600;
  font-size: 1.2rem;
  color: #ffffff;
`;

const RecommendedReading = styled.div`
  background-color: #dbe4f6;
  padding-top: 110px;
  padding-bottom: 110px;
`;

const HeadingMore = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #212121;
  text-align: center;
  margin-bottom: 50px;
`;

const MoreBlogImage = styled.img`
  height: 260px;
  border-radius: 15px;
  width: 100%;
  object-fit: cover;
`;

const MoreBlogTitle = styled.div`
  font-weight: 500;
  font-size: 1.08rem;
  color: #000;
`;

const ReadArticle = styled.div`
  font-size: 1rem;
  color: #3d77ec;
  font-weight: 500;
`;

const IndividualBlog = () => {
  return (
    <>
      <StaticBanner />
      <div style={{ height: "80px", backgroundColor: "#152d35" }} className="">
        <TopNavNew />
      </div>

      <Body className="py-3">
        <div
          className="container my-4 pb-5"
          style={{ display: "grid", gridTemplateColumns: "1fr 6fr 1fr" }}
        >
          <div>
            <IconButton>
              <KeyboardArrowLeftRoundedIcon style={{ color: "#ffffff" }} />
            </IconButton>

            <Back className="ms-2">Back to blogs</Back>
          </div>

          <div
            className="d-flex flex-column pt-5"
            style={{
              maxWidth: "768px",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <HeroHeading className="mb-4">
              Introducing Bluemeet’s New All-in-One Registration Suite
            </HeroHeading>

            <div className="d-flex flex-row mb-4">
              <Avatar
                src={Faker.image.avatar()}
                className="me-2"
                style={{ height: "2.8rem", width: "2.8rem" }}
              />

              <div>
                <AuthorName className="me-2">
                  {Faker.name.findName()}
                </AuthorName>

                <AuthorPosition>Product Manager</AuthorPosition>

                <div>
                  <PublishedDate>November 12 2021</PublishedDate>
                </div>
              </div>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-between mb-5">
              <div className="d-flex flex-row align-items-center">
                <AccessTimeRoundedIcon
                  style={{ color: "#A3A3A3" }}
                  className="me-2"
                />

                <TimeToRead>2 Min Read</TimeToRead>
              </div>

              <div className="d-flex flex-row align-items-center">
                <TwitterIcon
                  className="me-3"
                  style={{ fontSize: "24px", color: "#888888" }}
                />
                <FacebookIcon
                  className="me-3"
                  style={{ fontSize: "24px", color: "#888888" }}
                />
                <LinkedInIcon
                  className="me-3"
                  style={{ fontSize: "24px", color: "#888888" }}
                />
                <EmailIcon
                  className=""
                  style={{ fontSize: "24px", color: "#888888" }}
                />
              </div>
            </div>

            <BlogImage
              src="https://image.freepik.com/free-vector/abstract-background-consisting-colorful-arcs-illustration_456031-149.jpg"
              className="mb-5"
            />

            <BlogText className="mb-5">
              With the new Registration suite, users will see improved
              customization, purchasing features, speed, and sharing
              capabilities. Organizers are empowered to create personalized
              event paths for guests to help generate excitement and drive
              registration. So, what new features have we added in the revamped
              Registration suite? We’re now offering bulk purchasing, custom
              forms, ticket types, ticket groups, promo codes, an embeddable
              widget on your own website, and UTM codes.
            </BlogText>

            {/*  */}
            <GetStartedWithBluemeet className="px-5 py-4 d-flex flex-row align-items-center justify-content-between">
              <span>Get Started With Bluemeet</span>
              <button className="btn btn-outline-text btn-primary">
                Contact Sales
              </button>
            </GetStartedWithBluemeet>
          </div>
        </div>
      </Body>

      <RecommendedReading>
        <HeadingMore>Recommended Reading</HeadingMore>
        <div className="container px-4 more-blog-grid">
          <div>
            <MoreBlogImage
              className="mb-4"
              src="https://image.freepik.com/free-vector/gradient-colorful-background_23-2148993169.jpg"
            />

            <MoreBlogTitle className="mb-3">
              Dear Event Professionals, It's Ok to be not OK
            </MoreBlogTitle>

            <ReadArticle>
              <span className="me-2">Read the article</span>

              <ArrowRightAltRoundedIcon />
            </ReadArticle>
          </div>
          <div>
            <MoreBlogImage
              className="mb-4"
              src="https://image.freepik.com/free-vector/gradient-colorful-background_23-2148993169.jpg"
            />
            <MoreBlogTitle className="mb-3">
              Dear Event Professionals, It's Ok to be not OK
            </MoreBlogTitle>

            <ReadArticle>
              <span className="me-2">Read the article</span>

              <ArrowRightAltRoundedIcon />
            </ReadArticle>
          </div>
          <div>
            <MoreBlogImage
              className="mb-4"
              src="https://image.freepik.com/free-vector/gradient-colorful-background_23-2148993169.jpg"
            />

            <MoreBlogTitle className="mb-3">
              Dear Event Professionals, It's Ok to be not OK
            </MoreBlogTitle>

            <ReadArticle>
              <span className="me-2">Read the article</span>

              <ArrowRightAltRoundedIcon />
            </ReadArticle>
          </div>
        </div>
      </RecommendedReading>

      <PreFooter className="pt-5" />
      <Footer />
    </>
  );
};

export default IndividualBlog;
