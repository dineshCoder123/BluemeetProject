import React, { useEffect } from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import VibePNG from "./../../../assets/images/Welcome.svg";

import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

import { useDispatch, useSelector } from "react-redux";
import {
  addVibe,
  uploadVideoForCommunity,
  resetEventVibeUploadProgress,
} from "../../../actions";
import { useParams } from "react-router-dom";
import { reduxForm, Field } from "redux-form";

const ProgressContainer = styled.div`
  width: 100%;
  height: 40px;
  background-color: #dadada;
  border-radius: 10px;
`;

const ProgressFill = styled.div`
  height: 40px;
  background-color: #47d188;
  border-radius: 10px;
`;

const ProgressText = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 0.9rem;
  color: #000000;
  padding-left: 32px;
`;

const Heading = styled.div`
  font-weight: 600;
  font-family: "Ubuntu";
  font-size: 1.4rem;
  color: #212121;
`;

const BeforePreviewContainer = styled.div`
  width: 100%;
  height: 320px;
  border-radius: 10px;
  background-color: #ffffff;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 #ececec;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
`;

const IllustrationImg = styled.img`
  height: 280px;
  width: auto;
  object-fit: contain;
`;

const FormLabel = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  color: #212121;
  font-size: 0.8rem;
`;

const VibeContainer = styled.img`
  width: 100%;
  height: 320px;
  border-radius: 10px;
  background-color: #ffffff;

  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 #ececec;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);

  object-fit: contain;
`;

const StyledInput = styled.input`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.8rem;
  color: #4e4e4e;

  &:hover {
    border: #538bf7;
  }
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

const renderInput = ({
  input,
  value,
  meta: { touched, error, warning },
  type,
  ariadescribedby,
  classes,
  placeholder,
}) => {
  const className = `field ${error && touched ? "error" : ""}`;
  return (
    <div className={className}>
      <StyledInput
        type={type}
        {...input}
        aria-describedby={ariadescribedby}
        className={classes}
        placeholder={placeholder}
        required
      />
      {touched &&
        ((error && <FormError className="my-1">{error}</FormError>) ||
          (warning && <FormWarning className="my-1">{warning}</FormWarning>))}
    </div>
  );
};

const UploadStageVibe = ({ open, handleClose, handleSubmit }) => {
  const params = useParams();
  console.log(params);

  const { percent } = useSelector((state) => state.vibe);

  const communityId = params.communityId;
  const eventId = params.id;

  const dispatch = useDispatch();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [file, setFile] = React.useState(null);

  const [fileToPreview, setFileToPreview] = React.useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  const onSubmit = (formValues) => {
    console.log(formValues);
    dispatch(addVibe(file, eventId, formValues.vibeName, handleClose));
  };

  useEffect(() => {
    dispatch(resetEventVibeUploadProgress());
  }, []);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div className="p-4" style={{ height: "auto", width: "580px" }}>
          <div className="d-flex flex-row align-items-center justify-content-between mb-4">
            <Heading>Upload vibe</Heading>

            <IconButton onClick={handleClose}>
              <CancelRoundedIcon />
            </IconButton>
          </div>

          <form className="ui form error" onSubmit={handleSubmit(onSubmit)}>
            {fileToPreview ? (
              <VibeContainer
                controls
                autoplay={true}
                src={fileToPreview}
              ></VibeContainer>
            ) : (
              <BeforePreviewContainer className="d-flex flex-column align-items-center justify-content-center mb-4">
                <IllustrationImg src={VibePNG}></IllustrationImg>
              </BeforePreviewContainer>
            )}
            <div className="mb-4 overlay-form-input-row">
              <FormLabel className="mb-2">Choose vibe image</FormLabel>
              <input
                onChange={(e) => {
                  onFileChange(e);
                }}
                type="file"
                accept="image/*"
                className="form-control"
              ></input>
            </div>

            <div className="mb-4 overlay-form-input-row">
              <FormLabel for="communityName">
                Vibe name<span className="mandatory-field">*</span>
              </FormLabel>
              <Field
                name="vibeName"
                type="text"
                classes="form-control"
                id="exampleFormControlInput1"
                placeholder="Friendly name for vibe"
                component={renderInput}
              />
            </div>

            {percent !== 0 ? (
              <ProgressContainer>
                <ProgressFill
                  style={{
                    width: `${percent ? `${percent}%` : "0%"}`,
                  }}
                  className="d-flex flex-row align-items-center py-2"
                >
                  <ProgressText>
                    {percent && percent * 1 > 1.2 ? (
                      `${(percent * 1).toFixed(2)}%`
                    ) : (
                      <div className="py-2">
                        <div
                          class="spinner-border text-dark"
                          role="status"
                        ></div>
                      </div>
                    )}
                  </ProgressText>
                </ProgressFill>
              </ProgressContainer>
            ) : (
              <button
                type="submit"
                className="btn btn-primary btn-outline-text"
                style={{ width: "100%" }}
              >
                Upload vibe
              </button>
            )}
          </form>
        </div>
      </Dialog>
    </>
  );
};

const validate = (formValues) => {
  const errors = {};

  if (!formValues.vibeName) {
    errors.streamFriendlyName =
      "Vibe friendly name for identification is required";
  }
  return errors;
};

export default reduxForm({
  form: "newStagevibe",
  validate,
})(UploadStageVibe);
