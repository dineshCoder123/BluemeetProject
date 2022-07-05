import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import NoContentFound from "../../../../../../NoContent";
import Divider from "@material-ui/core/Divider";
import FormsListFields from "../GridComponents/Forms/ListFields";
import FormsDetailsCard from "./../GridComponents/Forms/DetailsCard";
import NoForm from "./../../../../../../../assets/images/NoForm.png";
import AddForm from "../FormComponents/Forms/AddForm";
import { fetchBoothForms } from "./../../../../../../../actions";

const SectionHeading = styled.div`
  font-size: 1.15rem;
  font-weight: 500;
  color: #212121;
  font-family: "Ubuntu";
`;

const renderForms = (forms) => {
  if (!forms) return;
  return forms.map((form) => {
    if (!form) return <></>;
    return (
      <FormsDetailsCard
        id={form._id}
        key={form._id}
        name={form.name}
        formId={form.formId}
        clicks={form.clicks}
      />
    );
  });
};

const Forms = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const eventId = params.eventId;

  const { forms, currentBoothId } = useSelector((state) => state.booth);

  const [openAddForm, setOpenAddForm] = useState(false);

  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  useEffect(() => {
    dispatch(fetchBoothForms(currentBoothId, eventId));
  }, []);

  return (
    <>
      <div style={{ minWidth: "1138px" }}>
        <div className="secondary-heading-row d-flex flex-row align-items-center justify-content-between px-4 py-4">
          <SectionHeading className="">Forms</SectionHeading>
          <div>
            <button
              onClick={() => {
                setOpenAddForm(true);
              }}
              className="btn btn-outline-text btn-outline-primary d-flex flex-row align-items-center"
            >
              <span className="">Add Form</span>
            </button>
          </div>
        </div>

        {typeof forms !== "undefined" && forms.length > 0 ? (
          <div className="event-management-content-grid px-3 mx-3 mb-4 py-4">
            <FormsListFields />
            <div className="divider-wrapper" style={{ margin: "1.2% 0" }}>
              <Divider />
            </div>
            {renderForms(forms)}
          </div>
        ) : (
          <div
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "83vh", width: "100%" }}
          >
            {" "}
            <NoContentFound msgText="No Form Found" img={NoForm} />{" "}
          </div>
        )}
      </div>
      <AddForm open={openAddForm} handleClose={handleCloseAddForm} />
    </>
  );
};

export default Forms;
