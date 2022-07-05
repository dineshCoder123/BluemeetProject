import React, { useState, useEffect } from "react";
import styled from "styled-components";

import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { uploadCommunityCover, resetCoverUploadPercent } from "./../../../actions";

const Container = styled.div`
  height: auto;
  width: 1200px;
`;

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

const IllustrationContainer = styled.div`
  height: 340px;
  width: 100%;
  background-color: #FBFBFB;
  border-radius: 10px;
  border: 1px dashed #CACACA;

  font-weight: 500;
  font-size: 1rem;
  color: #212121;

  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewContainer = styled.img`
  height: 340px;
  width: 100%;
  background-color: #dfdfdf;
  border-radius: 10px;
  border: none;
  object-fit: cover;
`;

const UploadCommunityCover = ({ open, handleClose }) => {
  const params = useParams();

  const communityId = params.communityId;

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch();

  const { community, uploadPercent } = useSelector(
    (state) => state.communityPage
  );

  let key;
  let imgUrl;

  if (community) {
    key = community.cover;
  }

  if (key) {
    imgUrl = `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${key}`;
  }

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(null);

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  useEffect(() => {
    dispatch(resetCoverUploadPercent());
  }, []);

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
        maxWidth={"1200px"}
      >
        <Container className="p-4">
          {fileToPreview ? (
            <PreviewContainer
              style={{ objectFit: "cover" }}
              className="mb-4"
              src={fileToPreview}
            ></PreviewContainer>
          ) : (
            <IllustrationContainer className="mb-4">
              <span>Please select an image to upload</span>
            </IllustrationContainer>
          )}

          <div className="container" style={{ maxWidth: "500px" }}>
            <div className="mb-4">
              <input
                name="imgUpload"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="form-control"
              />
            </div>

            {uploadPercent * 1 === 0 ? (
              <div
                className="d-flex flex-row align-items-center justify-content-center"
                style={{ width: "100%" }}
              >
                <button
                  onClick={() => {
                    dispatch(
                      uploadCommunityCover(file, communityId, handleClose)
                    );
                  }}
                  className="btn btn-outline-text btn-primary me-3"
                >
                  Upload Cover
                </button>
                <button
                  onClick={() => {
                    handleClose();
                  }}
                  className="btn btn-outline-text btn-outline-dark"
                >
                  Close
                </button>
              </div>
            ) : (
              <ProgressContainer>
                <ProgressFill
                  style={{
                    width: `${uploadPercent ? `${uploadPercent}%` : "0%"}`,
                  }}
                  className="d-flex flex-row align-items-center py-2"
                >
                  <ProgressText>
                    {uploadPercent && uploadPercent * 1 > 1.2 ? (
                      `${(uploadPercent * 1).toFixed(2)}%`
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
            )}

            <div class="bp3-progress-bar bp3-intent-primary .modifier">
              <div class="bp3-progress-meter" style={{ width: "50%" }}></div>
            </div>
          </div>
        </Container>
      </Dialog>
    </>
  );
};

export default UploadCommunityCover;
