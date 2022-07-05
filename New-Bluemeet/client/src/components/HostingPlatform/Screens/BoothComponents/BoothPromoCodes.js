import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchPromoCodes } from "./../../../../actions";

import Chip from "@mui/material/Chip";

import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const BoothPromoCodes = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  padding: 15px;
  width: 100%;
  height: 260px;
`;

const PromoCard = styled.div`
  height: 230px;
  border-radius: 15px;
  background-color: #dcedf3;
`;

const renderoffers = (offers) => {
  return offers.map((offer) => {
    return (
      <PromoCard className="d-flex flex-column align-items-center justify-content-center">
        <LocalOfferRoundedIcon style={{ fontSize: "75px" }} className="mb-4" />
        <Chip
          style={{ fontWeight: "500" }}
          className="mb-4"
          label={offer.code}
          color="primary"
          variant="outlined"
        />
        <button className="btn btn-outline-text btn-primary">{`${offer.discount}% off`}</button>
      </PromoCard>
    );
  });
};

const BoothOffers = () => {
  const params = useParams();
  const eventId = params.eventId;
  const dispatch = useDispatch();

  const { currentBoothId, offers } = useSelector((state) => state.booth);

  useEffect(() => {
    dispatch(fetchPromoCodes(currentBoothId, eventId));
  }, []);

  return (
    <>
      <BoothPromoCodes className="">
        { offers && <Carousel
          containerClass="carousel-container-offers"
          itemClass="carousel-item-offers"
          responsive={responsive}
        >
           { renderoffers(offers)}
        </Carousel> }
        
      </BoothPromoCodes>
    </>
  );
};

export default BoothOffers;
