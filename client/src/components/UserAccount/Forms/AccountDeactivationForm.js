import React, { useState } from "react";
import styled from "styled-components";
import ConfirmAccountDeactivation from "../Helper/ConfirmAccountDeactivation";

import { DashboardSectionHeading } from "./../Elements";

const AccountDeactivationForm = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="user-account-edit-profile px-2 py-2">
        <div className="mb-5 d-flex flex-row align-items-center justify-content-between">
          <DashboardSectionHeading className=" mb-3">
            Account Deactivation
          </DashboardSectionHeading>
          <button onClick={() => {
              setOpen(true);
          }} className="btn btn-outline-text btn-outline-danger">
            Deactivate my account
          </button>
        </div>
      </div>

      <ConfirmAccountDeactivation open={open} handleClose={handleClose} />
    </>
  );
};

export default AccountDeactivationForm;
