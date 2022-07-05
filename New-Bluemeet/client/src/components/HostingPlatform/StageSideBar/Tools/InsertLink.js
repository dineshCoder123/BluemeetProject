import React from 'react';
import styled from 'styled-components';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { Dialog, IconButton } from "@material-ui/core";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";

const InsertLinkContainer = styled.div`
  height: auto; // Make it auto
  width: 480px;
  background-color: #ffffff;
`;

const Header = styled.div`
  background-color: #46525c;
`;

const InsertLinkHeading = styled.span`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 1.1rem;
  color: #ebebeb;
`;

const Label = styled.div`
  font-weight: 500;
  font-family: "Ubuntu";
  font-size: 0.85rem;
  color: #152d3f;
`;

const StyledInput = styled.input`
  border: 1px solid #212121;
`;

const StyledTextArea = styled.textarea`
  border: 1px solid #212121;
`;

const SubmitButton = styled.button`
  background-color: #152d35 !important;
  color: #ffffff !important;
  width: 100%;
  border: 1px solid #152d35 !important;
`;

const InsertLink = ({open, handleClose}) => {

    const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <>

<Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <InsertLinkContainer>
          <Header className="d-flex flex-row align-items-center justify-content-between px-4 py-3">
            <InsertLinkHeading>Insert Link</InsertLinkHeading>
            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <CancelRoundedIcon
                style={{ color: "#EBEBEB" }}
              ></CancelRoundedIcon>
            </IconButton>
          </Header>

          <div className="px-4 py-3">
          <div className="form-group mb-4">
              <Label className="mb-2">Title</Label>

              <StyledInput
                className="form-control px-3 py-2"
                type="text"
                placeholder="Title of this link"
              ></StyledInput>
            </div>
            <div className="form-group mb-3">
              <Label className="mb-2">Description (optional)</Label>

              <StyledTextArea
                className="form-control px-3 py-2"
                rows="3"
                placeholder=""
              ></StyledTextArea>
            </div>
            <div className="form-group mb-4">
              <Label className="mb-2">Link </Label>

              <StyledInput
                className="form-control px-3 py-2"
                type="text"
                placeholder=""
              ></StyledInput>
            </div>

            <SubmitButton style={{width: "100%"}} className="btn btn-outline-text btn-primary">Insert link</SubmitButton>
          </div>
        </InsertLinkContainer>
      </Dialog>


        </>
    )
}

export default InsertLink;