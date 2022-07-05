import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {fetchBoothForm} from "./../../../../../../../../actions";
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import DeleteForm from "./../../FormComponents/Forms/DeleteForm";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import EditForm from "./../../FormComponents/Forms/EditForm";

import { PopupButton } from "@typeform/embed-react";

const FormsDetailsCard = ({ id, name, formId, clicks }) => {
  const dispatch = useDispatch();
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  const [openEditForm, setOpenEditForm] = useState(false);

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  const handleCloseDeleteForm = () => {
    setOpenDeleteForm(false);
  };
  return (
    <>
      <div
        className="team-members-list-fields-container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr 0.5fr",
        }}
      >
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">{name}</div>
        </div>
        <div className="registrations-name-field">
          <div className="registrations-field-label">{formId}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">{clicks}</div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">
            <PopupButton
              className="btn btn-outline-text btn-dark me-3"
              id={formId}
              // style={{ padding: 8, fontSize: 16 }}
              size={80}
            >
              Preview
            </PopupButton>
          </div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <IconButton
              onClick={() => {
                setOpenEditForm(true);
                dispatch(fetchBoothForm(id));
              }}
              color="primary"
              aria-label="edit form"
            >
              <EditRoundedIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                setOpenDeleteForm(true);
              }}
              color="secondary"
              aria-label="delete form"
            >
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>
      <EditForm open={openEditForm} handleClose={handleCloseEditForm} id={id} />

      <DeleteForm
        open={openDeleteForm}
        handleClose={handleCloseDeleteForm}
        id={id}
      />
    </>
  );
};

export default FormsDetailsCard;
