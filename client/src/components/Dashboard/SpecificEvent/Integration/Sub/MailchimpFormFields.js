import React, { useState } from "react";
import Select from "react-select";
import SyncAltIcon from "@material-ui/icons/SyncAlt";
import AddCircleOutlineRoundedIcon from "@material-ui/icons/AddCircleOutlineRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import { IconButton } from "@material-ui/core";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontSize: "0.8rem",
    fontWeight: "500",
    color: "#858585",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontSize: "0.8rem",
    color: "#757575",
  }),
};

const fieldNameOptions = [];

const FormFieldMapComponent = ({ add, remove }) => {
  return (
    <>
      <div
        className="mb-3"
        style={{
          display: "grid",
          gridTemplateColumns: "3.5fr 1fr 3.5fr 1fr 1fr",
          gridGap: "16px",
          alignItems: "center",
        }}
      >
        <div className="overlay-form-input-row ">
          <input
            name="name"
            type="text"
            className="form-control"
            ariadescribedby="emailHelp"
            placeholder=""
          />
        </div>

        <SyncAltIcon style={{ fill: "#212121", justifySelf: "center" }} />

        <div>
          <Select
            name="currency"
            placeholder="Select Field Name"
            styles={styles}
            menuPlacement="auto"
            options={fieldNameOptions}
            // defaultValue={eventOptions[0]}
            //  component={renderReactSelect}
          />
        </div>
        <IconButton
          onClick={() => {
            add();
          }}
        >
          <AddCircleOutlineRoundedIcon
            style={{ fill: "#538BF7", justifySelf: "center" }}
          />
        </IconButton>

        <IconButton
          onClick={() => {
            remove();
          }}
        >
          <DeleteOutlineRoundedIcon
            style={{ fill: "#F75853", justifySelf: "center" }}
          />
        </IconButton>
      </div>
    </>
  );
};

const MailchimpFormFields = () => {
  const [num, setNum] = useState(2);

  const AddField = () => {
    setNum((prevNum) => {
      return (prevNum = prevNum + 1);
    });
  };

  const RemoveField = () => {
    if (num <= 1) return;
    setNum((prevNum) => {
      return (prevNum = prevNum - 1);
    });
  };

  return (
    <>
      <div className="mb-4">
        {(() => {
          let FormFieldsArray = [];

          for (let i = 0; i < num; i++) {
            FormFieldsArray.push(
              <FormFieldMapComponent add={AddField} remove={RemoveField} />
            );
          }
          return FormFieldsArray;
        })()}
      </div>

      <div
        className="d-flex flex-row align-items-center justify-content-end mb-4"
        style={{ width: "100%" }}
      >
        <button className="btn btn-primary btn-outline-text">Save</button>
      </div>
    </>
  );
};

export default MailchimpFormFields;
