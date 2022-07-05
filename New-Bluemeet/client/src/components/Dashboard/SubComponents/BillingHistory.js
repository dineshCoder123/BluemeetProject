import React from "react";
import { useSelector } from "react-redux";

import { SwipeableDrawer } from "@material-ui/core";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { IconButton } from "@material-ui/core";
import BillingListFields from "./../HelperComponent/BillingComponents/BillingListFields";
import BillingHistoryDetailsCard from "./../HelperComponent/BillingComponents/BillingHistoryDetailsCard";
import NoContentFound from "../../NoContent";
import NoTransaction from "./../../../assets/images/no-transaction.svg";

const renderTransactionsList = (transactions) => {
  return transactions.map((transaction) => {
    return (
      <BillingHistoryDetailsCard
        type={transaction.type}
        planName={transaction.planName}
        price={transaction.price}
        currency={transaction.currency}
        transactionId={transaction.transactionId}
        purchasedBy={transaction.purchasedBy}
        timestamp={transaction.date}
      />
    );
  });
};

const BillingHistory = ({ open, handleClose }) => {
  const { transactions } = useSelector((state) => state.community);

  return (
    <>
      <React.Fragment key="right">
        <SwipeableDrawer
          anchor="right"
          open={open}
        >
          <div
            className="registration-more-details-right-drawer px-4 py-4"
            style={{ width: "1050px" }}
          >
            <div className="side-drawer-heading-and-close-row d-flex flex-row align-items-center justify-content-between">
              <div className="side-drawer-heading">Your Billing History</div>
              <div
                onClick={() => {
                  handleClose();
                }}
              >
                <IconButton aria-label="close-drawer">
                  <CancelOutlinedIcon
                    style={{ fontSize: "26", color: "#4D4D4D" }}
                  />
                </IconButton>
              </div>
            </div>
            <div className="my-3">
              <hr />
            </div>
            <BillingListFields />

            <div className="my-3">
              <hr />
            </div>

            {typeof transactions !== "undefined" && transactions.length > 0 ? (
              renderTransactionsList(transactions)
            ) : (
              <div
                style={{ height: "73vh", width: "100%" }}
                className="d-flex flex-row align-items-center justify-content-center"
              >
                <NoContentFound
                  msgText={"Seems like this there are no transactions yet."}
                  img={NoTransaction}
                />
              </div>
            )}
          </div>
        </SwipeableDrawer>
      </React.Fragment>
    </>
  );
};

export default BillingHistory;
