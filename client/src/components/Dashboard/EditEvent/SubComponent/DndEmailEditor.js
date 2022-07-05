import React, { useRef, useState } from "react";
import template from "./../../../../design.json";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Slide from "@mui/material/Slide";
import EmailEditor from "react-email-editor";
import { useDispatch } from "react-redux";
import "./../../../../index.css";

import { updateMail, showSnackbar } from "./../../../../actions";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DndEmailEditor = ({
  open,
  handleClose,
  mailId,
  name,
  subject,
  design,
  html,
}) => {
  const emailEditorRef = useRef(null);

  const [templateName, setTemplateName] = useState(name);
  const [templateSubject, setTemplateSubject] = useState(subject);

  const dispatch = useDispatch();

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log("exportHtml", html);

      if (!templateName || !templateSubject) {
        dispatch(
          showSnackbar("warning", "Template Name and Subject are required.")
        );
        return;
      }

      let formValues = {
        name: templateName,
        subject: templateSubject,
        design: design,
        html: html,
      };

      dispatch(updateMail(formValues, mailId, handleClose));
    });
  };

  const onLoad = () => {
    // editor instance is created
    // you can load your template here;
    const templateJson = template;
    if (design) {
      emailEditorRef.current.editor.loadDesign(design);
    } else {
      emailEditorRef.current.editor.loadDesign(templateJson);
    }
  };

  const onReady = () => {
    // editor is ready
    console.log("onReady");
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#538BF7" }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Mail
            </Typography>
            <input
              type="text"
              onChange={(e) => {
                setTemplateName(e.target.value);
              }}
              value={templateName}
              className="form-control mx-3"
              style={{ width: "250px" }}
            />
            <input
              type="text"
              onChange={(e) => {
                setTemplateSubject(e.target.value);
              }}
              value={templateSubject}
              className="form-control mx-3"
              style={{ width: "300px" }}
            />
            <button
              onClick={() => {
                exportHtml();
              }}
              className="btn btn-light btn-outline-text me-3"
            >
              <span> Save & close </span>
            </button>
          </Toolbar>
        </AppBar>

        <div style={{ height: "80vh" }}>
          <EmailEditor
            projectId="47137"
            style={{ height: "93.2vh" }}
            ref={emailEditorRef}
            onLoad={onLoad}
            onReady={onReady}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default DndEmailEditor;
