import { Avatar } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Footer from "../Footer";
import PreFooter from "../PreFooter";
import TopNavNew from "../StaticScreens/Helper/TopNavNew";
import KeyboardArrowRightRoundedIcon from "@mui/icons-material/KeyboardArrowRightRounded";
import Faker from "faker";
import StaticBanner from "../StaticScreens/Screens/StaticBanner";

const Body = styled.div`
  background-color: #152d35;
`;

const HeroHeading = styled.div`
  font-weight: 400;
  font-size: 2.5rem;
  color: #ffffff;
  letter-spacing: 2px;
  text-align: center;
`;

const SubHeading = styled.div`
  font-weight: 400;
  font-size: 1rem;
  color: #ffffff;
  letter-spacing: 0.5px;
  text-align: center;
`;

const MainCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 24px;
  height: 360px;

  background-color: #ffffff;
  border: 1px solid #dddddd;

  border-radius: 20px;
`;

const BlogCard = styled.div`
  height: 500px;
  border-radius: 20px;
  border: 1px solid #dddddd;
  background-color: #ffffff;
`;

const ImageCard = styled.img`
  height: 250px;
  width: 100%;
  object-fit: cover;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const ImageCardMain = styled.img`
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  height: 360px;
  width: 100%;
  object-fit: cover;
`;

const BlogHeadingMain = styled.div`
  font-weight: 500;
  font-size: 1.7rem;
  color: #212121;
  letter-spacing: 0.3px;
`;

const BlogHeading = styled.div`
  font-weight: 500;
  font-size: 1.3rem;
  color: #212121;
  letter-spacing: 0.3px;
`;

const BlogOverviewMain = styled.div`
  font-weight: 500;
  font-size: 0.98rem;
  color: #212121;
  letter-spacing: 0.2px;
`;

const BlogOverview = styled.div`
  font-weight: 500;
  font-size: 0.88rem;
  color: #212121;
  letter-spacing: 0.2px;
`;

const AuthorName = styled.span`
  font-weight: 600;
  font-size: 0.85rem;
  color: #212121;
`;
const AuthorPosition = styled.span`
  font-weight: 500;
  font-size: 0.82rem;
  color: #212121;
`;
const PublishedDate = styled.span`
  font-weight: 500;
  font-size: 0.82rem;
  color: #212121;
`;

const MainBlogCard = () => {
  return (
    <>
      <MainCard>
        <ImageCardMain src="https://media.istockphoto.com/vectors/abstract-blue-and-orange-vector-background-vector-id1133320303?k=20&m=1133320303&s=612x612&w=0&h=xXvB7GGm0wBfURII515u14t3ehVPGlDs1F65Vp5ZQdg="></ImageCardMain>
        <div className="d-flex flex-column justify-content-between p-4">
          <div>
            <BlogHeadingMain className="mb-4">
              Dear Event Professionals, It's Ok to be Not Ok
            </BlogHeadingMain>
            <BlogOverviewMain className="mb-5">
              I'm not a vulnarable person, but the mental health of event
              industry is log overdue for discussion. My hope is that you know
              you're not alone.
            </BlogOverviewMain>
          </div>

          <div className="d-flex flex-row ">
            <Avatar
              src={Faker.image.avatar()}
              className="me-2"
              style={{ height: "2.8rem", width: "2.8rem" }}
            />

            <div>
              <AuthorName className="me-2">{Faker.name.findName()}</AuthorName>

              <AuthorPosition>Product Manager</AuthorPosition>

              <div>
                <PublishedDate>November 12 2021</PublishedDate>
              </div>
            </div>
          </div>
        </div>
      </MainCard>
    </>
  );
};

const NormalBlogCard = () => {
  return (
    <>
      <BlogCard>
        <ImageCard src="https://media.istockphoto.com/photos/abstract-3d-art-background-with-curve-shape-holographic-color-picture-id1266776339?b=1&k=20&m=1266776339&s=170667a&w=0&h=EMXVNKMTMfoKMTXBc__MBaKTMszC8XskMbObvghyRBw=" />
        <div className="d-flex flex-column justify-content-between p-4">
          <div>
            <BlogHeading className="mb-4">
              Dear Event Professionals, It's Ok to be Not Ok
            </BlogHeading>
            <BlogOverview className="mb-5">
              I'm not a vulnarable person, but the mental health of event
              industry is log overdue for discussion. My hope is that you know
              you're not alone.
            </BlogOverview>
          </div>

          <div className="d-flex flex-row ">
            <Avatar
              src={Faker.image.avatar()}
              className="me-2"
              style={{ height: "2.8rem", width: "2.8rem" }}
            />

            <div>
              <AuthorName className="me-2">{Faker.name.findName()}</AuthorName>

              <AuthorPosition>Product Manager</AuthorPosition>

              <div>
                <PublishedDate>November 12 2021</PublishedDate>
              </div>
            </div>
          </div>
        </div>
      </BlogCard>
    </>
  );
};

const MainBlogPage = () => {
  return (
    <>
      <StaticBanner />
      <div style={{ height: "80px", backgroundColor: "#152d35" }} className="">
        <TopNavNew />
      </div>
      <Body className="py-3">
        <HeroHeading className="py-3">Blogs from Bluemeet</HeroHeading>
        <SubHeading className="mb-5">
          The latest updates, stories, ideas and guides from the Bluemeet team.
        </SubHeading>

        <div className="container px-4 mb-5 pb-4 pt-3">
          <div className="mb-4">
            <MainBlogCard />
          </div>

          <div className="Blog-grid mb-5">
            {/*  */}
            <NormalBlogCard />
            <NormalBlogCard />
            <NormalBlogCard />
          </div>

          <div className="d-flex flex-row align-items-center justify-content-center">
            <button className="btn btn-outline-text btn-primary">
              {" "}
              <span> Next </span>{" "}
              <KeyboardArrowRightRoundedIcon className="ms-1" />{" "}
            </button>
          </div>
        </div>
      </Body>

      <PreFooter className="pt-5" />
      <Footer />
    </>
  );
};

export default MainBlogPage;
