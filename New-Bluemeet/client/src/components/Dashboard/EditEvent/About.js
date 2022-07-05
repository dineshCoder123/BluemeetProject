import React from "react";
import "./../../../assets/Sass/Dashboard_Overview.scss";
import "./../../../assets/Sass/SideNav.scss";
import "./../../../assets/Sass/TopNav.scss";
import "./../../../assets/Sass/DataGrid.scss";
import "./../../../assets/Sass/EditEvent/Basics.scss";
import "./../../../assets/Sass/EditEvent/About.scss";
import "./../../../index.css";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TipsToWriteAbout from "./HelperComponents/TipsToWriteAbout";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { editEventDescription, errorTrackerForEditEventDiscription, errorTrackerForFetchEvent } from "../../../actions";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const About = (props) => {
  const { handleSubmit, pristine, submitting } = props;



  const { error } = useSelector((state) => state.event);

  const aboutText = useSelector(
    (state) => state.event.eventDetails.editingComment
  );

  const [editorState, setEditorState] = React.useState(
   aboutText ? EditorState.createWithContent(convertFromRaw(JSON.parse(aboutText))) : EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };
  const dispatch = useDispatch();
  const params = useParams();
  const id = params.id;

  const communityId = params.communityId;

  const onSubmit = () => {
    const JSONData = {
      editingComment: convertToRaw(editorState.getCurrentContent()),
    };
    dispatch(editEventDescription(JSONData, id));
  };

  const renderEditor = ({ input, id }) => {
    return (
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        name="editior"
        onEditorStateChange={onEditorStateChange}
        {...input}
        id={id}
      />
    );
  };

  if(error) {
    

    dispatch(errorTrackerForFetchEvent())
   return dispatch(errorTrackerForEditEventDiscription());
  }

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row justify-content-between px-4 py-4">
          <div className="sec-heading-text">About</div>
          <div className="drop-selector d-flex flex-row justify-content-end">
            <Link
        
              className="btn btn-outline-primary btn-outline-text me-3"
              to={`/event-landing-page/${id}/${communityId}`}
              target="_blank"
            >
              Preview Landing Page
            </Link>
          </div>
        </div>
        <div className="basic-content-grid px-3 mb-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className=" pe-4 ">
              <div
                className="rich-text-editor-wrapper p-3"
                style={{ minHeight: "500px", border: "1px solid #CACACA" }}
              >
                <Field component={renderEditor} id={id} />
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
                  className={`btn btn-primary btn-outline-text `}
                  disabled={pristine || submitting}
                >
                  Save changes
                </button>
              </div>
            </div>
          </form>
          <div className="basic-form-right px-4 py-2">
            <TipsToWriteAbout />
          </div>
        </div>
      </div>
    </>
  );
};

export default reduxForm({
  form: "editorForm",
  destroyOnUnmount: false,
})(About);
