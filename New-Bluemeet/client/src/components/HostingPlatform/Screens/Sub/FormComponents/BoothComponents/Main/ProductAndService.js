import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useParams} from 'react-router-dom';
import styled from "styled-components";
import NoContentFound from "../../../../../../NoContent";
import Divider from "@material-ui/core/Divider";
import ProductLibraryListFields from "../GridComponents/Product/ListFields";
import ProductLibraryDetailsCard from "./../GridComponents/Product/DetailsCard";
import NoProduct from "./../../../../../../../assets/images/NoFile.png";
import AddProduct from "./../FormComponents/Product/AddProduct";
import {fetchBoothProducts} from "./../../../../../../../actions";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderProducts = (products) => {
  if (!products) return;
  return products.map((product) => {
    if (!product) return <></>;
    return (
      <ProductLibraryDetailsCard
        id={product._id}
        key={product._id}
        image={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${product.image}`}
        name={product.name}
        description={product.description}
        link={product.link}
      />
    );
  });
};

const ProductAndService = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const eventId = params.eventId;
  const { products, currentBoothId } = useSelector((state) => state.booth);

  const [openAddProduct, setOpenAddProduct] = useState(false);

  const handleCloseAddproduct = () => {
    setOpenAddProduct(false);
  };

  useEffect(() => {
    dispatch(fetchBoothProducts(currentBoothId, eventId))
  }, []);

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Products & Services</SectionHeading>
          <div>
            <button
              onClick={() => {
                setOpenAddProduct(true);
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <span className=""> Add product </span>
            </button>
          </div>
        </div>

        {typeof products !== "undefined" && products.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <ProductLibraryListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderProducts(products)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "83vh", width: "100%" }}
          >
            {" "}
            <NoContentFound
              msgText="No product or service found"
              img={NoProduct}
            />{" "}
          </div>
        )}
      </div>
      <AddProduct open={openAddProduct} handleClose={handleCloseAddproduct} />
    </>
  );
};

export default ProductAndService;
