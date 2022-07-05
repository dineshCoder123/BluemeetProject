import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { fetchBoothProducts } from "../../../../actions";

import "./../../../../index.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const ProductsContainer = styled.div`
  height: 260px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
`;

const ProductCard = styled.div`
  border-radius: 20px;
  height: 230px;
  padding: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  border: 1px solid transparent;
  &:hover {
    cursor: pointer;
    border: 1px solid #b9b9b9;
  }
`;

const ProductImage = styled.img`
  border-radius: 20px;
  max-height: 150px;
  object-fit: contain;
  justify-self: center;
  /* border: 1px solid #212121; */
`;

const ProductName = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  color: #152d35;
`;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const renderProducts = (products) => {
  return products.map((product) => {
    return (
      <ProductCard>
        <ProductImage
          className="mb-3"
          src={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${product.image}`}
        />
        <ProductName>{product.name}</ProductName>
      </ProductCard>
    );
  });
};

const BoothProducts = () => {
  const params = useParams();
  const eventId = params.eventId;
  const dispatch = useDispatch();

  const { currentBoothId, products } = useSelector((state) => state.booth);

  useEffect(() => {
    dispatch(fetchBoothProducts(currentBoothId, eventId));
    
  }, []);

  return (
    <>
      
      <ProductsContainer className="d-flex flex-column justify-content-center">
        {products && <Carousel
          containerClass="carousel-container-products"
          itemClass="carousel-item-products"
          responsive={responsive}
        >
        {renderProducts(products)}
        </Carousel>}
      
      </ProductsContainer>
    </>
  );
};

export default BoothProducts;