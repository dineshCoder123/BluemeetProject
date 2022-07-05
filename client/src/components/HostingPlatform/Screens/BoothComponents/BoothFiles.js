import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchBoothFiles, fetchLinks } from "../../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import "./../../../../index.css";

import InsertLinkRoundedIcon from "@mui/icons-material/InsertLinkRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

const Files = styled.div`
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  width: 100%;
  height: 260px;

  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 24px;
  align-items: center;
`;

const FileTab = styled.div`
  border-radius: 20px;
  border: 1px solid #b9b9b9;
  padding: 12px;
  color: #152d35;

  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    cursor: pointer;
    -webkit-border-radius: 50px;
    border-radius: 50px;
    background: #e5e9f1;
    -webkit-box-shadow: 12px 12px 24px #e5e9f1, -12px -12px 24px #f0f8ff;
    box-shadow: 12px 12px 24px #e5e9f1, -12px -12px 24px #f0f8ff;
  }
`;

const FileName = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  color: #152d35;
`;

const renderFiles = (files) => {
  return files.map((file) => {
    return (
      <div className="px-3">
        <a
          href={`https://bluemeet-inc.s3.us-west-1.amazonaws.com/${file.key}`}
          download={file.name}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <FileTab>
            <DescriptionRoundedIcon />
            <FileName className="ms-2">{file.name}</FileName>
          </FileTab>
        </a>
      </div>
    );
  });
};

const renderLinks = (links) => {
  return links.map((link) => {
    return (
      <div className="px-3">
        <a
          href={`${link.url}`}
          target="_blank"
          rel="noreferrer"
          style={{ textDecoration: "none" }}
        >
          <FileTab>
            <InsertLinkRoundedIcon />
            <FileName className="ms-2">{link.name}</FileName>
          </FileTab>
        </a>
      </div>
    );
  });
};

const BoothFiles = () => {
  const params = useParams();
  const eventId = params.eventId;
  const dispatch = useDispatch();

  const { currentBoothId, links, files } = useSelector((state) => state.booth);

  useEffect(() => {
    dispatch(fetchBoothFiles(currentBoothId, eventId));
    dispatch(fetchLinks(currentBoothId, eventId));
  }, []);

  return (
    <>
      <Files className="py-3">
        <div
          className=""
          style={{
            height: "240px",
            overflow: "auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "32px",
          }}
        >
          { files && renderFiles(files)}
          { links && renderLinks(links)}
        </div>
      </Files>
    </>
  );
};

export default BoothFiles;
