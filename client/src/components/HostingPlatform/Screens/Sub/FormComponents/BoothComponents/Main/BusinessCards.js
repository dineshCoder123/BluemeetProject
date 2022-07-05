import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NoContentFound from "../../../../../../NoContent";
import Divider from "@material-ui/core/Divider";
import BusinessCardListFields from "../GridComponents/BusinessCards/ListFields";
import BusinessCardDetailsCard from "./../GridComponents/BusinessCards/DetailsCard";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import NoBusinessCard from "./../../../../../../../assets/images/NoBusinessCard.png";
import { useParams } from "react-router-dom";
import {
  fetchBusinessCards,
  showSnackbar,
} from "./../../../../../../../actions";

import SendViaMail from "./../Helper/SendViaMail";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderBusinessCards = (businessCards) => {
  if (!businessCards) return;
  return businessCards.map((businessCard) => {
    if (!businessCard) return <></>;
    return (
      <BusinessCardDetailsCard
        id={businessCard._id}
        key={businessCard._id}
        name={`${businessCard.userId.firstName} ${businessCard.userId.lastName}`}
        email={businessCard.userId.email}
        image={
          businessCard.userId.image
            ? businessCard.userId.image.startsWith("https://")
              ? businessCard.userId.image
              : `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${businessCard.userId.image}`
            : "#"
        }
        contact={businessCard.userId.phoneNumber}
        timestamp={businessCard.timestamp}
      />
    );
  });
};

const Forms = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const eventId = params.eventId;

  const { businessCards, currentBoothId } = useSelector((state) => state.booth);

  const [openSendMail, setOpenSendMail] = useState(false);

  const handleCloseSendMail = () => {
    setOpenSendMail(false);
  };

  useEffect(() => {
    dispatch(fetchBusinessCards(currentBoothId, eventId));
  }, []);

  const processBusinessCardData = () => {
    const processedArray = [];

    businessCards.map((cards) => {
      const array = Object.entries(cards.userId);

      const filtered = array.filter(
        ([key, value]) =>
          key === "firstName" ||
          key === "lastName" ||
          key === "email" ||
          key === "phoneNumber"
      );

      const asObject = Object.fromEntries(filtered);

      processedArray.push(asObject);
    });

    const finalArray = processedArray.map((obj) => Object.values(obj));

    return finalArray;
  };

  const CreateAndDownloadCSV = (data) => {
    var csv = "First name, Last name,Email,Contact Number, \n";
    data.forEach(function (row) {
      csv += row.join(",");
      csv += "\n";
    });

    console.log(csv);
    var hiddenElement = document.createElement("a");
    hiddenElement.href = "data:text/csv;charset=utf-8," + encodeURI(csv);
    hiddenElement.target = "_blank";
    hiddenElement.download = "business_cards.csv";
    hiddenElement.click();
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Shared Business Cards</SectionHeading>
          <div className="d-flex flex-row align-items-center">
            <button
              onClick={() => {
                if (
                  typeof businessCards !== "undefined" &&
                  businessCards.length > 0
                ) {
                  CreateAndDownloadCSV(processBusinessCardData());
                } else {
                  dispatch(
                    showSnackbar(
                      "info",
                      "Ther are no business cards to export right now"
                    )
                  );
                }
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <FileDownloadRoundedIcon style={{ fontSize: "18px" }} />
              <span className="ms-2">Export</span>
            </button>
          </div>
        </div>

        {typeof businessCards !== "undefined" && businessCards.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <BusinessCardListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderBusinessCards(businessCards)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "83vh", width: "100%" }}
          >
            {" "}
            <NoContentFound
              msgText="No Business card shared yet"
              img={NoBusinessCard}
            />{" "}
          </div>
        )}
      </div>
      <SendViaMail
        open={openSendMail}
        handleClose={handleCloseSendMail}
        boothId={currentBoothId}
      />
    </>
  );
};

export default Forms;
