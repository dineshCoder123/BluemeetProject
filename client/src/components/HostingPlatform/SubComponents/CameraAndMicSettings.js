import React from "react";
import Select from "react-select";

const styles = {
  control: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
  menu: (base) => ({
    ...base,
    fontFamily: "Inter",
    fontWeight: "600",
    color: "#757575",
  }),
};

const cameraOptions = [
  { value: "USD", label: "US Dollars" },
  { value: "AED", label: "United Arab Emirates Dirham" },
  { value: "INR", label: "Indian Rupees" },
  { value: "BMD", label: "Bermudan Dollar equals" },
  { value: "CAD", label: "Canadian Dollar" },
];

const microphoneOptions = [
  { value: "USD", label: "US Dollars" },
  { value: "AED", label: "United Arab Emirates Dirham" },
  { value: "INR", label: "Indian Rupees" },
  { value: "BMD", label: "Bermudan Dollar equals" },
  { value: "CAD", label: "Canadian Dollar" },
];

const CameraAndMicSettings = () => {
  return (
    <>
      <form>
        <div className="mb-4 overlay-form-input-row">
          <label
            Forhtml="selectCamera"
            className="form-label form-label-customized"
          >
            Camera
          </label>
          <Select
            name="selectCamera"
            styles={styles}
            menuPlacement="auto"
            options={cameraOptions}
            //   defaultValue={cameraOptions[0]}
            id="selectCamera"
          />
        </div>

        <div className="mb-4 overlay-form-input-row">
          <label
            Forhtml="selectMicrophone"
            className="form-label form-label-customized"
          >
            Microphone
          </label>
          <Select
            name="selectMicrophone"
            styles={styles}
            menuPlacement="top"
            options={microphoneOptions}
            //   defaultValue={microphoneOptions[0]}
            id="selectMicrophone"
          />
        </div>

        <div
          style={{ fontWeight: "600", fontFamily: "Inter" }}
          className="mb-4"
        >
          Video Profile Settings{" "}
          {/* <span style={{ fontWeight: "500", fontSize: "14px" }}>
              (for offline events)
            </span> */}
        </div>

        <div
          className="mb-4 overlay-form-input-row form-row-2-in-1 row edit-profile-form-row"
          style={{ marginLeft: "0", marginRight: "0", padding: "0" }}
        >
          <div style={{ padding: "0" }}>
            <label
              Forhtml="eventStartDate"
              className="form-label form-label-customized"
            >
              Min Bitrate
            </label>
            <input
              name="city"
              type="text"
              className="form-control"
              id="eventStartDate"
            />
          </div>
          <div style={{ padding: "0" }}>
            <label
              Forhtml="eventStartTime"
              className="form-label form-label-customized"
            >
              Max Bitrate
            </label>
            <input
              name="state"
              type="text"
              className="form-control"
              id="eventStartTime"
            />
          </div>
        </div>

        <div
          className="row edit-profile-form-row mb-3"
          style={{ marginLeft: "0", marginRight: "0" }}
        >
          <div className="form-group" style={{ padding: "0" }}>
            <label
              for="communityHeadline"
              className="form-label form-label-customized"
            >
              Framerate
            </label>
            <Select
              name="selectCamera"
              styles={styles}
              menuPlacement="auto"
              options={cameraOptions}
              //   defaultValue={cameraOptions[0]}
              id="selectCamera"
            />
          </div>
        </div>

        <div
          className="row edit-profile-form-row mb-3"
          style={{ marginLeft: "0", marginRight: "0" }}
        >
          <div className="form-group" style={{ padding: "0" }}>
            <label
              for="communityHeadline"
              className="form-label form-label-customized"
            >
              Resolution
            </label>
            <Select
              name="selectCamera"
              styles={styles}
              menuPlacement="auto"
              options={cameraOptions}
              //   defaultValue={cameraOptions[0]}
              id="selectCamera"
            />
          </div>
        </div>

        <div
          className="row edit-profile-form-row mb-3 mt-4 d-flex flex-row justify-content-end"
          style={{
            marginRight: "0",
            marginLeft: "0",
            paddingLeft: "0",
            paddingRight: "0",
          }}
        >
          <button
            type="submit"
            // disabled={editProfileClicked && !error}
            // disabled={pristine}
            className="col-3 btn btn-primary btn-outline-text me-3"
            style={{ textAlign: "center" }}
          >
            Save
          </button>
          <button
            type="button"
            // disabled={pristine || submitting}
            // onClick={reset}
            className="col-3 btn btn-outline-primary btn-outline-text"
            style={{ textAlign: "center" }}
          >
            Discard
          </button>
        </div>
      </form>
    </>
  );
};

export default CameraAndMicSettings;
