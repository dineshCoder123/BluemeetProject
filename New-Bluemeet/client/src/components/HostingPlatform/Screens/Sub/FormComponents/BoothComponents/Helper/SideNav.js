/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./../../../../../Styles/root.scss";
import WidgetsRoundedIcon from "@mui/icons-material/WidgetsRounded"; // Basics Icon
import VideoLibraryRoundedIcon from "@mui/icons-material/VideoLibraryRounded"; // Video Library
import LocalMallIcon from "@mui/icons-material/LocalMall"; // product and service
import InsertLinkIcon from "@mui/icons-material/InsertLink"; // Link
import DescriptionIcon from "@mui/icons-material/Description"; // File
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'; // Offer
import ContactMailRoundedIcon from "@mui/icons-material/ContactMailRounded"; // Business Card
import DynamicFormRoundedIcon from "@mui/icons-material/DynamicFormRounded"; // Typeforms

const SideNav = ({
  activeIndex,
  handleBasicsClick,
  handleVideosClick,
  handleProductAndServiceClick,
  handleFileClick,
  handleLinkClick,
  handleOffersClick,
  handleFormsClick,
  handleBusinessCardsClick,
}) => {
  return (
    <>
      <div
        className="lean-side-nav px-2 pb-4"
        style={{
          backgroundColor: "#ffffff",
          height: "88vh !important",
          overflow: "auto !important",
        }}
      >
        <div className="main-icon-btn-container py-4">
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleBasicsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 0 ? "active-wrapper-h" : "")
              }
            >
              <WidgetsRoundedIcon
                className={
                  "icon-btn-h " + (activeIndex === 0 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 0 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Basics
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleVideosClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 1 ? "active-wrapper-h" : "")
              }
            >
              <VideoLibraryRoundedIcon
                className={
                  "icon-btn-h " + (activeIndex === 1 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 1 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Video Library
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            onClick={() => {
              handleProductAndServiceClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 2 ? "active-wrapper-h" : "")
              }
            >
              <LocalMallIcon
                className={
                  "icon-btn-h " + (activeIndex === 2 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 2 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Product and service
            </div>
          </div>
          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleFileClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 3 ? "active-wrapper-h" : "")
              }
            >
              <DescriptionIcon
                className={
                  "icon-btn-h " + (activeIndex === 3 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 3 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Files
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleLinkClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 4 ? "active-wrapper-h" : "")
              }
            >
              <InsertLinkIcon
                className={
                  "icon-btn-h " + (activeIndex === 4 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 4 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Links
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleOffersClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 5 ? "active-wrapper-h" : "")
              }
            >
              <LocalOfferRoundedIcon
                className={
                  "icon-btn-h " + (activeIndex === 5 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 5 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Promo codes
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleFormsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 6 ? "active-wrapper-h" : "")
              }
            >
              <DynamicFormRoundedIcon
                className={
                  "icon-btn-h " + (activeIndex === 6 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 6 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Forms
            </div>
          </div>

          <div
            className="icon-btn-lobby-wrapper d-flex flex-column align-items-center mb-3"
            style={{ marginBottom: "12px" }}
            onClick={() => {
              handleBusinessCardsClick();
            }}
          >
            <div
              className={
                "icon-wrapper p-3 mb-1 " +
                (activeIndex === 7 ? "active-wrapper-h" : "")
              }
            >
              <ContactMailRoundedIcon
                className={
                  "icon-btn-h " + (activeIndex === 7 ? "icon-btn-active-h" : "")
                }
              />
            </div>
            <div
              className={
                "icon-btn-text " +
                (activeIndex === 7 ? "icon-btn-text-active-h" : "")
              }
              style={{ textAlign: "center" }}
            >
              Business cards
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
