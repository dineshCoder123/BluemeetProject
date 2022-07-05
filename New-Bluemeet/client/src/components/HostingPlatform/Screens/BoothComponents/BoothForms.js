import React, { useEffect } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { PopupButton } from "@typeform/embed-react";
import { fetchBoothForms } from "./../../../../actions";

import "./../../../../index.css";

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

const BoothFormsContainer = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
  height: 260px;
`;

const FormCard = styled.div`
  height: 230px;
  border-radius: 15px;
  background-color: #dcedf3;
`;

const renderForms = (forms) => {
  return forms.map((form) => {
    return (
      <FormCard className="d-flex flex-column align-items-center justify-content-center">
        <PopupButton
          className="btn btn-outline-text btn-dark"
          id={form.formId}
          size={80}
        >
          {form.name}
        </PopupButton>
      </FormCard>
    );
  });
};

const BoothForms = () => {
  const params = useParams();
  const eventId = params.eventId;
  const dispatch = useDispatch();

  const { currentBoothId, forms } = useSelector((state) => state.booth);

  useEffect(() => {
    dispatch(fetchBoothForms(currentBoothId, eventId));
  }, []);

  return (
    <>
      <BoothFormsContainer className="">
        {forms && (
          <Carousel
            containerClass="carousel-container-forms"
            itemClass="carousel-item-forms"
            responsive={responsive}
          >
            {renderForms(forms)}
          </Carousel>
        )}
      </BoothFormsContainer>
    </>
  );
};

export default BoothForms;
