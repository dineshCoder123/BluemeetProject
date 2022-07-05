import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import ExploreDisplayImg from "./../../assets/images/ExploreDisplay@2x.png";
import PreFooterImg from "./../../assets/images/PreFooter@2x.png";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import Faker from "faker";


console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

class ExploreEvents extends React.Component {
  render() {
    return (
      <>
        <CssBaseline />
        <div
          className="container-fluid page-body explore-page"
          style={{ padding: "0" }}
        >
          <div className="explore-header">
            <div
              className="explore-nav max-width-explore-page"
              style={{ margin: "0 auto" }}
            >
              <nav className="navbar navbar-expand-lg navbar-light">
                <div className="container-fluid">
                  
                    <span style={{ color: "#538BF7" }}>Evenz</span>
                  
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                  >
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                      <li className="nav-item">
                        
                          <button type="button" className="btn btn-outline-primary">
                            Login
                          </button>
                        
                      </li>
                      <li className="nav-item">
                        
                          <button type="button" className="btn btn-primary">
                            Get Started
                          </button>
                        
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div
              className="row max-width-explore-page hero-section-explore-events"
              style={{ margin: "0 auto", height: "80vh" }}
            >
              <div
                className="col d-flex flex-column justify-content-center align-items-center"
                style={{ height: "100%" }}
              >
                <div className="row hero-text">
                  Explore Exclusive events.
                  <span className="hidden-hero-text" style={{ padding: "0" }}>
                    Make priceless connections.
                  </span>
                </div>

                <div className="row hero-search">
                  <form className="d-flex" style={{ padding: "0" }}>
                    <input
                      className="form-control me-2"
                      type="search"
                      placeholder="Search events"
                      aria-label="Search"
                    />
                    <button className="btn btn-primary" type="submit">
                      <i className="fa fa-search"></i>
                    </button>
                  </form>
                </div>
              </div>
              <div
                className="col d-flex align-items-center justify-content-end display-image-wrapper"
                style={{ height: "100%" }}
              >
                <img
                  src={ExploreDisplayImg}
                  alt="explore events display pic"
                  className="img-fluid explore-display-image"
                ></img>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingLeft: "2.5%",
              paddingRight: "2.5%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "4%",
            }}
            className="max-width-explore-page"
          >
            <div className="row event-card-row-header d-flex flex-row align-items-center">
              <div className="col-auto event-card-row-header-heading">
                Top Picks
              </div>
              <div className="col-auto event-card-row-header-chip event-card-row-header-chip-active">
                Upcoming
              </div>
              <div className="col-auto event-card-row-header-chip">Ongoing</div>
              <div className="col event-card-row-header-empty"></div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-see-all">
                See all
              </div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-left disabled">
                <KeyboardArrowLeftIcon color="disabled" />
              </div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-right">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>

          <div
            className="row max-width-explore-page event-card-row"
            style={{ height: "auto" }}
          >
            <div className="row event-card-row-content d-flex flex-row justify-content-between flex-container">
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.abstract()}
                    style={{ aspectRatio: 4 / 3, width: "100%" }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.business()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.nature()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.nightlife()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingLeft: "2.5%",
              paddingRight: "2.5%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "4%",
            }}
            className="max-width-explore-page"
          >
            <div className="row event-card-row-header d-flex flex-row align-items-center">
              <div className="col-auto event-card-row-header-heading">
                Trending Events
              </div>
              <div className="col-auto event-card-row-header-chip event-card-row-header-chip-active">
                Free
              </div>
              <div className="col-auto event-card-row-header-chip">Paid</div>
              <div className="col event-card-row-header-empty"></div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-see-all">
                See all
              </div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-left disabled">
                <KeyboardArrowLeftIcon color="disabled" />
              </div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-right">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>

          <div
            className="row max-width-explore-page event-card-row"
            style={{ height: "auto" }}
          >
            <div className="row event-card-row-content d-flex flex-row justify-content-between flex-container">
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.fashion()}
                    style={{ aspectRatio: 4 / 3, width: "100%" }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.city()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.sports()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.transport()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
            </div>
          </div>

          <div
            className="row browse-by-category-section max-width-explore-page"
            style={{ padding: "0 1%" }}
          >
            <div
              style={{
                paddingLeft: "2.5%",
                paddingRight: "2.5%",
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: "3%",
              }}
              className="max-width-explore-page"
            >
              <div className="row event-card-row-header d-flex flex-row align-items-center">
                <div className="col-auto event-card-row-header-heading">
                  Browse by Category
                </div>
                <div className="col event-card-row-header-empty"></div>
                <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-see-all">
                  See all
                </div>
                <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-left disabled">
                  <KeyboardArrowLeftIcon color="disabled" />
                </div>
                <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-right">
                  <KeyboardArrowRightIcon />
                </div>
              </div>
            </div>
            <div
              className="row max-width-explore-page event-card-row category-card-row"
              style={{ height: "auto", marginBottom: "2%" }}
            >
              <div
                className="row event-card-row-content d-flex flex-row justify-content-between flex-container"
                style={{ minWidth: "2700px" }}
              >
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#8D67AB", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Technology
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "fill", borderRadius: "5px" }}
                  >
                    <img
                      src="https://www.investopedia.com/thmb/QvLIdxSBRTqN0PFDFfW0YV9ZA70=/2121x1193/smart/filters:no_upscale()/GettyImages-964033964-ca3290057ccc4024b57e755423572264.jpg"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#FF4632", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Education
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "fill", borderRadius: "5px" }}
                  >
                    <img
                      src="https://www.tableau.com/sites/default/files/solutions/thumbnails/education2x-50.jpg"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#608108", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Career Fair
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "contain", borderRadius: "5px" }}
                  >
                    <img
                      src="https://blog.hackerrank.com/wp-content/uploads/introducing-hackeranks-first-virtual-career-fair.png"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#509BF5", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Professional Development
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "contain", borderRadius: "5px" }}
                  >
                    <img
                      src="https://www.naylor.com/associationadviser/wp-content/uploads/sites/2/2015/09/Professional-Development-Gears.jpg"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#4C6D4B", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Health & Lifestyle
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "fill", borderRadius: "5px" }}
                  >
                    <img
                      src="https://filmdaily.co/wp-content/uploads/2020/11/health-01.jpg"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#97745B", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Enterpreneurship
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "fill", borderRadius: "5px" }}
                  >
                    <img
                      src="https://assets-wp.boundless.com/uploads/2021/05/entre-6.jpg"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#477D95", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Marketing & Advertisement
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "fill", borderRadius: "5px" }}
                  >
                    <img
                      src="https://marketinghog.com/file/2015/09/Small-Business-Marketing-1288x724.jpg"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
                <div
                  className="col-3 event-card category-card flex-item"
                  style={{ backgroundColor: "#F0AF37", paddingBottom: "0" }}
                >
                  <div
                    className="row category-card-category-name"
                    style={{
                      padding: "2% 16px",
                      paddingTop: "0",
                      marginBottom: "2%",
                    }}
                  >
                    Entertainment
                  </div>
                  <div
                    className="row event-card-img"
                    style={{ objectFit: "fill", borderRadius: "5px" }}
                  >
                    <img
                      src="https://jobflare-wordpress-public.s3.amazonaws.com/wp-content/uploads/2020/08/Entertainment-Industry-Header.png"
                      style={{
                        aspectRatio: "4/3",
                        width: "100%",
                        objectFit: "cover",
                        padding: "0",
                        borderRadius: "5px",
                        maxHeight: "180px",
                      }}
                      alt="event-poster"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingLeft: "2.5%",
              paddingRight: "2.5%",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "4%",
            }}
            className="max-width-explore-page"
          >
            <div className="row event-card-row-header d-flex flex-row align-items-center">
              <div className="col-auto event-card-row-header-heading">
                Sponsored Events
              </div>
              <div className="col-auto event-card-row-header-chip event-card-row-header-chip-active">
                Upcoming
              </div>
              <div className="col-auto event-card-row-header-chip">Ongoing</div>
              <div className="col event-card-row-header-empty"></div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-see-all">
                See all
              </div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-left disabled">
                <KeyboardArrowLeftIcon color="disabled" />
              </div>
              <div className="col-auto d-flex flex-row justify-content-end event-card-row-header-arrow-right">
                <KeyboardArrowRightIcon />
              </div>
            </div>
          </div>

          <div
            className="row max-width-explore-page event-card-row"
            style={{ height: "auto" }}
          >
            <div className="row event-card-row-content d-flex flex-row justify-content-between flex-container">
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.abstract()}
                    style={{ aspectRatio: 4 / 3, width: "100%" }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.business()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.nature()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
              <div className="col-3 event-card flex-item">
                <div className="row event-card-img">
                  <img
                    src={Faker.image.nightlife()}
                    style={{ aspectRatio: 4 / 3 }}
                    alt="event-poster"
                  />
                </div>
                <div
                  className="row event-card-event-name"
                  style={{ padding: "0 12px" }}
                >
                  Better Business Expo
                </div>
                <div
                  className="row event-card-data-time"
                  style={{ padding: "0 12px" }}
                >
                  June 20, 10:30PM IST
                </div>
                <div
                  className="row event-card-price"
                  style={{ padding: "0 12px" }}
                >
                  US$0.00~US$50.00
                </div>
              </div>
            </div>
          </div>

          <div className="row pre-footer">
            <div className="row max-width-explore-page">
              <div className="col-12 col-lg-6 d-flex flex-row justify-content-center align-items-center pre-footer-left-wrapper">
                <div className="col-1 col-xl-2"></div>
                <div className="col-10 col-xl-8">
                  <div className="pre-footer-hero-text">
                    Amaze Your Audience with Your Next-Gen Virtual Event.
                  </div>
                  <div className="pre-footer-sub-hero-text">
                    Memorable events don’t just happen. They happen to be our
                    business.
                  </div>
                  <div className="pre-footer-hero-btn d-flex flex-row justify-content-start">
                    <button
                      type="button"
                      className="btn btn-light pre-footer-btn-light"
                    >
                      Host a free event
                    </button>
                  </div>
                </div>
                <div className="col-1 col-xl-2"></div>
              </div>
              <div
                className="col-12 col-lg-6 d-flex justify-content-center pre-footer-img-wrapper"
                style={{ maxHeight: "50vh" }}
              >
                <img
                  src={PreFooterImg}
                  alt="pre footer hero"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default ExploreEvents;
