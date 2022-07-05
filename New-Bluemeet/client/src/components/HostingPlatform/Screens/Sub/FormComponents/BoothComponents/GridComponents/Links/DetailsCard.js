import React from "react";
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import DeleteLink from "../../FormComponents/Links/DeleteLink";
import EditLink from "../../FormComponents/Links/EditLink";

const LinkLibraryDetailsCard = ({ name, url, clicks, id }) => {
  const [openDeleteLink, setOpenDeleteLink] = React.useState(false);
  const [openEditLink, setOpenEditLink] = React.useState(false);

  const handleCloseEditLink = () => {
    setOpenEditLink(false);
  };

  const handleCloseDeleteLink = () => {
    setOpenDeleteLink(false);
  };

  return (
    <>
      <div className="team-members-list-fields-container">
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">{name}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">{clicks}</div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">
            <a href={`${url}`} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
              Visit
            </a>
          </div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <IconButton
              onClick={() => {
                setOpenEditLink(true);
              }}
              color="primary"
              aria-label="edit link"
            >
              <EditRoundedIcon />
            </IconButton>

            <IconButton
              onClick={() => {
                setOpenDeleteLink(true);
              }}
              color="secondary"
              aria-label="delete link"
            >
              <DeleteRoundedIcon />
            </IconButton>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <DeleteLink
        open={openDeleteLink}
        handleClose={handleCloseDeleteLink}
        id={id}
      />

      <EditLink open={openEditLink} handleClose={handleCloseEditLink} id={id} />
    </>
  );
};

export default LinkLibraryDetailsCard;
