import React from "react";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Paper = styled.div`
  width: 540px;
  background-color: #ffffff;
`;

const FormError = styled.div`
  font-family: "Ubuntu";
  color: red;
  font-weight: 400;
  font-size: 0.8rem;
`;

const FormWarning = styled.div`
  font-family: "Ubuntu";
  color: orange;
  font-weight: 400;
  font-size: 0.8rem;
`;

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const FormSubHeading = styled.div`
  font-size: 0.87rem;
  font-family: "Ubuntu";
  font-weight: 500;
  color: #424242;
`;

const ListFieldStrip = styled.div`
  border-radius: 10px;
  background-color: #ececec;
  padding: 12px 16px;
  height: 35px;

  display: grid;
  grid-template-columns: 1fr 1fr 0.3fr;
  grid-gap: 16px;
  margin-bottom: 10px;
`;

const ListFieldText = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #6e6e6e;
  font-size: 0.8rem;
`;

const ListFields = () => {
  return (
    <>
      <ListFieldStrip className="px-2 py-2">
        <ListFieldText>Name</ListFieldText>
        <ListFieldText>Link</ListFieldText>
        <ListFieldText>Action</ListFieldText>
      </ListFieldStrip>
    </>
  );
};

const RenderDocumentInputFields = () => {
    
}

const EditInfoDesk = ({ open, handleClose }) => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
          onOpen={() => {
            console.log("Side nav was opended");
          }}
          onClose={() => {
            console.log("Side nav was closed");
          }}
        >
          <Paper>
            <HeaderFooter className="form-heading-and-close-button mb-4 px-4 pt-3">
              <div></div>
              <div className="coupon-overlay-form-headline">Edit Info desk</div>
              <div className="overlay-form-close-button" onClick={handleClose}>
                <IconButton aria-label="delete">
                  <CancelRoundedIcon />
                </IconButton>
              </div>
            </HeaderFooter>

            <div className="px-4 py-4">
              <FormSubHeading className="mb-3">
                Documents & Links
              </FormSubHeading>

              <ListFields />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 0.3fr",
                  gridGap: "16px",
                }}
                className="mb-4"
              >
                <input
                  className="form-control"
                  placeholder="Document or link name"
                />
                <input className="form-control" placeholder="Link" />

                <IconButton style={{ width: "max-content" }}>
                  <DeleteRoundedIcon color="secondary" />
                </IconButton>
              </div>

              <button
                className="btn btn-outline-text btn-outline-dark mb-5"
                style={{ border: "1px dashed #212121", width: "100%" }}
              >
                Add Document/Link
              </button>

              <FormSubHeading className="mb-3">Overview</FormSubHeading>

              {/* // Rich text editor goes here */}

              <Editor
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="overviewWrapperClassName"
                editorClassName="overviewEditor"
                name="editior"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
          </Paper>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default EditInfoDesk;
