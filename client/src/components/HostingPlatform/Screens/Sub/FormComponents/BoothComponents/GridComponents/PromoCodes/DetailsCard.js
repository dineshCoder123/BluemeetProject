import React, { useState } from "react";
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditPromoCode from "../../FormComponents/PromoCodes/EditPromoCode";
import DeletePromoCode from "../../FormComponents/PromoCodes/DeletePromoCode";
import Chip from '@mui/material/Chip';

const PromoCodesDetailsCard = ({
  name,
  discount,
  instruction,
  code,
  clicks,
  id,
}) => {
  const [openDeletePromoCode, setOpenDeletePromoCode] = React.useState(false);

  const [openEditPromoCode, setOpenEditPromoCode] = useState(false);

  const handleCloseEditPromoCode = () => {
    setOpenEditPromoCode(false);
  };

  const handleCloseDeletePromoCode = () => {
    setOpenDeletePromoCode(false);
  };
  return (
    <>
      <div
        className="team-members-list-fields-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.5fr 1fr 1fr 1fr 0.5fr",
        }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">{name}</div>
        </div>
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">{instruction}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">
          <Chip label={code} color="primary" />
  
            </div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label"><Chip label={`${discount}% off`} color="success" /></div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">{clicks}</div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <IconButton
              onClick={() => {
                setOpenEditPromoCode(true);
              }}
              color="primary"
              aria-label="edit promo code"
            >
              <EditRoundedIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                setOpenDeletePromoCode(true);
              }}
              color="secondary"
              aria-label="delete promo code"
            >
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      <EditPromoCode
        open={openEditPromoCode}
        handleClose={handleCloseEditPromoCode}
        id={id}
      />
      <DeletePromoCode
        open={openDeletePromoCode}
        handleClose={handleCloseDeletePromoCode}
        id={id}
      />
    </>
  );
};

export default PromoCodesDetailsCard;
