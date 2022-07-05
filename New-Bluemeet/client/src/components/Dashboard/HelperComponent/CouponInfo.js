import React from "react";
import styled from "styled-components";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import IconButton from "@material-ui/core/IconButton";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";

const HeaderFooter = styled.div`
  background-color: #ebf4f6;
`;

const Heading = styled.div`
  font-weight: 500;
  font-size: 0.9rem;
  color: #212121;
`;

const TextSmall = styled.div`
  font-weight: 500;
  font-size: 0.8rem;
  color: #4B4B4B;
`;

const CouponInfo = ({ open, handleClose }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{ width: "520px" }}>
          <HeaderFooter className="form-heading-and-close-button mb-4 px-4 py-3">
            <div></div>
            <div className="coupon-overlay-form-headline">Coupon code</div>
            <div className="overlay-form-close-button" onClick={handleClose}>
              <IconButton aria-label="delete">
                <CancelRoundedIcon />
              </IconButton>
            </div>
          </HeaderFooter>

          <div className="px-4 py-4">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "16px",
                alignItems: "center",
              }}
            >
                <div className="mb-3">
              <Heading className="mb-3">Applicable from date</Heading>

              <TextSmall>
                {dateFormat(Date.now(), "ddd, mmm dS, yy, h:MM TT")}
              </TextSmall>
              </div>
                <div className="mb-3">
              <Heading className="mb-3">Expiry date</Heading>

              <TextSmall>
                {dateFormat(Date.now(), "ddd, mmm dS, yy, h:MM TT")}
              </TextSmall>
              </div>

                <div>
              <Heading className="mb-3">Coupons available</Heading>

              <TextSmall>
                54
              </TextSmall>
              </div>
                <div>
              <Heading className="mb-3">Coupons used</Heading>

              <TextSmall>
               42
              </TextSmall>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default CouponInfo;
