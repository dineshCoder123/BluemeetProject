import React, { useEffect } from "react";
import "./../../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../../assets/Sass/SideNav.scss";
import "./../../../../assets/Sass/TopNav.scss";
import "./../../../../assets/Sass/DataGrid.scss";
import "./../../../../assets/Sass/EditEvent/Basics.scss";
import "./../../../../assets/Sass/EditEvent/About.scss";
import "./../../../../index.css";
import "./../../../../assets/Sass/EditEvent/Networking.scss";
import { useDispatch } from "react-redux";
import { fetchNetworking } from "./../../../../actions";
import { useParams } from "react-router-dom";
import Select from "react-select";

import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";

const MailCampaign = () => {
  const params = useParams();
  const id = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNetworking(id));
  }, [dispatch, id]);

  const options = [
    { value: "All Tickets", label: "All Tickets" },
    { value: "Early Bird", label: "Early Bird" },
    { value: "All Access Pass", label: "All Access Pass" },
    { value: "VIP Ticket", label: "VIP Ticket" },
  ];

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

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">Mail Campaign</div>
          <div className="drop-selector d-flex flex-row justify-content-end">
            {/* <button className="btn btn-outline-primary btn-outline-text">
              Preview Venue
            </button> */}

            {/* <Link
      
              className="btn btn-outline-primary btn-outline-text me-3"
              to={`/event-landing-page/${id}`}
              target="_blank"
            >
              Preview Landing Page
            </Link> */}
          </div>
        </div>
        <div className="networking-content-grid px-3 mb-4">
          <div className="networking-form-left networking-form px-4 py-4" style={{minWidth: "998px"}}>
            <div className="form-label form-label-customized mx-3" style={{}}>
              Select Recipients
            </div>
            <div className="ms-3 me-3 mb-3" style={{ minWidth: "250px" }}>
              <Select
                styles={styles}
                menuPlacement="auto"
                options={options}
                defaultValue={options[0]}
              />
            </div>

            <div className="ms-3 me-3" style={{ minWidth: "250px" }}>
              <div className="mb-4 overlay-form-input-row">
                <label for="eventName" className="form-label form-label-customized">
                  Mail Subject
                </label>
                <input
                  name="mailSubject"
                  type="text"
                  className="form-control"
                  id="eventName"
                  ariadescribedby="eventName"
                />
              </div>
            </div>

            <div className=" pe-4 ">
              <div
                className="rich-text-editor-wrapper p-3"
                style={{ minHeight: "500px", border: "1px solid #B6B6B6" }}
              >
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  name="editior"
                  onEditorStateChange={onEditorStateChange}
                  id={id}
                />
              </div>
              <div
                className="d-flex flex-row justify-content-end mt-3"
                style={{ width: "100%" }}
              >
                {/* <button
            
                  className={`btn btn-outline-primary btn-outline-text me-3 `}
                  disabled={pristine || submitting}
                  onClick={reset}
                >
                  Discard
                </button> */}
                <button
                  type="submit"
                  className={`btn btn-outline-primary btn-outline-text `}
                  //   disabled={pristine || submitting}
                >
                  Send
                </button>
              </div>
            </div>
          </div>

          {/* <div className="networking-form-right networking-form px-4 py-4"></div> */}
        </div>
      </div>
    </>
  );
};

export default MailCampaign;
