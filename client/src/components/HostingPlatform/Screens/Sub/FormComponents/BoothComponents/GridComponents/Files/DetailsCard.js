import React from "react";
import "./../../../../../../../../assets/Sass/DataGrid.scss";
import "./../../../../../../../../assets/Sass/TeamManagement.scss";
import IconButton from "@material-ui/core/IconButton";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import Divider from "@material-ui/core/Divider";
import DeleteFile from "../../FormComponents/Files/DeleteFile";
import dateFormat from "dateformat";

const FileLibraryDetailsCard = ({ name, url, id, downloads, timestamp }) => {
  const [openDeleteFile, setOpenDeleteFile] = React.useState(false);

  const handleCloseDeleteFile = () => {
    setOpenDeleteFile(false);
  };

  return (
    <>
      <div className="team-members-list-fields-container" style={{display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1.2fr 0.5fr"}}>
        <div className="registrations-name-field">
          <div className="registrations-field-label mx-5">{name}</div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">
            <a href={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${url}`} target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
            <button className="btn btn-outline-text btn-outline-primary">Preview</button>
            </a>
          </div>
        </div>
        <div className="registrations-email-field">
          <div className="registrations-field-label">{downloads}</div>
        </div>
        <div className="registrations-phone-field">
          <div className="registrations-field-label">
            {dateFormat(new Date(timestamp), "ddd, mmm dS, yy, h:MM TT")}
          </div>
        </div>
        <div className="registrations-invoice-field">
          <div className="registrations-field-label">
            <div
              onClick={() => {
                setOpenDeleteFile(true);
              }}
            >
              <IconButton color="secondary" aria-label="add to shopping cart">
                <DeleteRoundedIcon />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
        <Divider />
      </div>

      <DeleteFile
        open={openDeleteFile}
        handleClose={handleCloseDeleteFile}
        id={id}
      />
    </>
  );
};

export default FileLibraryDetailsCard;
