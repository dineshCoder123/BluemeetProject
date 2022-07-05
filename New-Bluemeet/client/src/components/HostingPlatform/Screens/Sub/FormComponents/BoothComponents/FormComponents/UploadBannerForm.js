import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import {
  uploadBoothPosterImage,
  showSnackbar,
} from "./../../../../../../../actions";

const Container = styled.div`
  height: auto;
  width: 100%;
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
  background-color: #fbfbfb;
  border-radius: 10px;
  border: 1px dashed #cacaca;

  font-weight: 500;
  font-size: 1rem;
  color: #212121;

  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PreviewContainer = styled.img`
  height: 380px;
  width: 100%;
  background-color: #dfdfdf;
  border-radius: 10px;
  border: none;
  object-fit: cover;
`;

const UploadBannerForm = () => {
  const dispatch = useDispatch();

  const { uploadBannerPercent, currentBoothId, boothDetails } = useSelector(
    (state) => state.booth
  );

  const [file, setFile] = useState(null);
  const [fileToPreview, setFileToPreview] = useState(
    boothDetails
      ? `https://bluemeet-inc.s3.us-west-1.amazonaws.com/${boothDetails.boothPoster}`
      : "#"
  );

  const onFileChange = (event) => {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
    setFileToPreview(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Container className="">
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

          {uploadBannerPercent * 1 === 0 ? (
            <div
              className="d-flex flex-row align-items-center justify-content-center"
              style={{ width: "100%" }}
            >
              <button
                onClick={() => {
                  if (file) {
                    dispatch(uploadBoothPosterImage(file, currentBoothId));
                  } else {
                    dispatch(
                      showSnackbar(
                        "warning",
                        "Please select an image to update Banner"
                      )
                    );
                  }
                }}
                className="btn btn-outline-text btn-primary me-3"
              >
                Upload Banner
              </button>
            </div>
          ) : (
            <ProgressContainer>
              <ProgressFill
                style={{
                  width: `${
                    uploadBannerPercent ? `${uploadBannerPercent}%` : "0%"
                  }`,
                }}
                className="d-flex flex-row align-items-center py-2"
              >
                <ProgressText>
                  {uploadBannerPercent && uploadBannerPercent * 1 > 1.2 ? (
                    `${(uploadBannerPercent * 1).toFixed(2)}%`
                  ) : (
                    <div className="py-2">
                      <div class="spinner-border text-dark" role="status"></div>
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
    </>
  );
};

export default UploadBannerForm;
