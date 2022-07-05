import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import NoContentFound from "../../../../../../NoContent";
import Divider from "@material-ui/core/Divider";
import PromoCodesListFields from "../GridComponents/PromoCodes/ListFields";
import PromoCodesDetailsCard from "./../GridComponents/PromoCodes/DetailsCard";
import NoPromoCode from "./../../../../../../../assets/images/NoPromoCode.png";
import AddPromoCode from "../FormComponents/PromoCodes/AddPromoCode";
import { fetchPromoCodes } from "./../../../../../../../actions";
import { useParams } from "react-router-dom";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderPromoCodes = (PromoCodes) => {
  if (!PromoCodes) return;
  return PromoCodes.map((promoCode) => {
    if (!promoCode) return <></>;
    return (
      <PromoCodesDetailsCard
        id={promoCode._id}
        key={promoCode._id}
        name={promoCode.name}
        discount={promoCode.discount}
        instruction={promoCode.instruction}
        code={promoCode.code}
        clicks={promoCode.clicks}
      />
    );
  });
};

const PromoCodes = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const eventId = params.eventId;

  const { offers, currentBoothId } = useSelector((state) => state.booth);

  const [openAddPromoCode, setOpenAddPromoCode] = useState(false);

  const handleCloseAddPromoCode = () => {
    setOpenAddPromoCode(false);
  };

  useEffect(() => {
    dispatch(fetchPromoCodes(currentBoothId, eventId));
  }, []);

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Promo Codes</SectionHeading>
          <div>
            <button
              onClick={() => {
                setOpenAddPromoCode(true);
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <span className="">Add Promo Codes</span>
            </button>
          </div>
        </div>

        {typeof offers !== "undefined" && offers.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <PromoCodesListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderPromoCodes(offers)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "83vh", width: "100%" }}
          >
            {" "}
            <NoContentFound
              msgText="No Promo Codes Found"
              img={NoPromoCode}
            />{" "}
          </div>
        )}
      </div>
      <AddPromoCode
        open={openAddPromoCode}
        handleClose={handleCloseAddPromoCode}
      />
    </>
  );
};

export default PromoCodes;
