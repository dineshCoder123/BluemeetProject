import React, { useState } from "react";
import "./StaticScreens/Styles/StaticScreenNav.scss";
import validator from "validator";

import LinkedInIcon from "@material-ui/icons/LinkedIn";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import Instagram from "@material-ui/icons/Instagram";
import { useDispatch } from "react-redux";
import { showSnackbar, signupForEmailNewsletter } from "../actions";

import TelegramIcon from "@mui/icons-material/Telegram";

const Footer = (props) => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  return (
    <>
      <footer>
        <div className="container footer-container py-3">
          <div className="brand-logo-and-copyright px-3 py-3">
            <span className="navbar-brand nav-brand-name-home">Bluemeet</span>
            <div
              className="copy-right-symbol mb-4"
              style={{ color: "#ffffff", fontSize: "22px" }}
            >
              &copy; <span className="btn-outline-text pb-3">2021</span>
            </div>
            <div className="btn-outline-text" style={{ color: "#ffffff" }}>
              All Rights Reserved.
            </div>
          </div>
          <div className="use-cases px-3 py-4">
            <div className="footer-section-headline btn-outline-text mb-3">
              Use Cases
            </div>

            <div className="footer-section-link mb-2">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Virtual Events
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Conferences
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Trade shows
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Training workshops
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Product Launch
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Online cohorts
              </a>
            </div>
            <div className="footer-section-link">
              <a
                href="/use-cases"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Happy hours
              </a>
            </div>
          </div>
          <div className="company px-3 py-4">
            <div className="footer-section-headline btn-outline-text mb-3">
              Company
            </div>

            <div className="footer-section-link mb-2">
              <a
                href="/about-us"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                About us
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a href="/#" style={{ color: "#A8A8A8", textDecoration: "none" }}>
                Careers
              </a>
            </div>
            <div className="footer-section-link mb-2">
              <a
                href="/contact-us"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="further-nformation px-3 py-4">
            <div className="footer-section-headline btn-outline-text mb-3">
              Further Information
            </div>

            <div className="footer-section-link mb-2">
              <a
                style={{ color: "#ADADAD", textDecoration: "none" }}
                href="/terms-of-service"
              >
                Terms & Conditions
              </a>
            </div>

            <div className="footer-section-link mb-2">
              <a
                href="/privacy-policy"
                style={{ color: "#A8A8A8", textDecoration: "none" }}
              >
                Privacy Policy
              </a>
            </div>
          </div>
          <div className="follow-us px-3 py-4">
            <div className="footer-section-headline btn-outline-text mb-3">
              Follow us
            </div>

            <div className=" d-flex flex-row align-items-center">
              <div className="shareon-icon p-3 me-3">
                <a
                  href="https://www.facebook.com/pages/?category=your_pages&ref=bookmarks"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FacebookIcon style={{ fontSize: "20", fill: "#1760A8" }} />
                </a>
              </div>
              <div className="shareon-icon p-3 me-3">
                <a
                  href="https://www.linkedin.com/company/bluemeet-in"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon style={{ fontSize: "20", fill: "#2565A5" }} />
                </a>
              </div>

              <div className="shareon-icon p-3 me-3">
                <a
                  href="https://twitter.com/BluemeetOfficial"
                  target="_blank"
                  rel="noreferrer"
                >
                  <TwitterIcon style={{ fontSize: "20", fill: "#539FF7" }} />
                </a>
              </div>

              <div className="shareon-icon p-3 me-3">
                <a
                  href="https://www.instagram.com/bluemeetofficial/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Instagram style={{ fontSize: "20", fill: "#841E8D" }} />
                </a>
              </div>
            </div>

            <div className="footer-section-headline my-3 ">Newsletter</div>

            <div className="ui action input">
              <input
                type="text"
                value={email}
                placeholder="Your email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button
                type="button"
                className="ui blue icon button"
                onClick={() => {
                  if (email) {
                    if (validator.isEmail(email)) {
                      dispatch(signupForEmailNewsletter(email));
                    } else {
                      dispatch(
                        showSnackbar(
                          "error",
                          "Please enter a valid email address."
                        )
                      );
                    }
                  }
                }}
              >
                <TelegramIcon />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
