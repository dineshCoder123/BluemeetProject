import React, { useState } from "react";
import styled from "styled-components";
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import DeleteProduct from "./../../FormComponents/Product/DeleteProduct";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditProduct from "./../../FormComponents/Product/EditProduct";
import { useDispatch } from "react-redux";

const ProductImage = styled.img`
  border-radius: 20px;
  max-height: 100px;
  object-fit: contain;
  width: 100%;border-radius: 10px;
`;

const ProductLibraryDetailsCard = ({ name, image, description, link, id }) => {
  const [openDeleteProduct, setOpenDeleteProduct] = React.useState(false);

  const [openEditProduct, setOpenEditProduct] = useState(false);

  const handleCloseEditProduct = () => {
    setOpenEditProduct(false);
  };

  const handleCloseDeleteProduct = () => {
    setOpenDeleteProduct(false);
  };
  return (
    <>
      <div
        className="team-members-list-fields-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr 1fr 0.5fr",
          gridGap: "20px"
        }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label">
            <ProductImage src={image} />
          </div>
        </div>
        <div className="registrations-name-field">
          <div className="registrations-field-label">{name}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">{description}</div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">
            <a href={`${link}`} target="_blank" rel="noreferrer">
              <button className="btn btn-outline-text btn-outline-primary">
                Link
              </button>
            </a>
          </div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <IconButton
              onClick={() => {
                setOpenEditProduct(true);
              }}
              color="primary"
              aria-label="edit product listing"
            >
              <EditRoundedIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                setOpenDeleteProduct(true);
              }}
              color="secondary"
              aria-label="delete product listing"
            >
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      <EditProduct
        open={openEditProduct}
        handleClose={handleCloseEditProduct}
        id={id}
      />

      <DeleteProduct
        open={openDeleteProduct}
        handleClose={handleCloseDeleteProduct}
        id={id}
      />
    </>
  );
};

export default ProductLibraryDetailsCard;
