import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import Select from "react-select";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  showingText: {
    fontFamily: "Inter",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "0.9rem",
    lineHeight: "1rem",
    color: "#757575",
  },
}));

// const customStyles = {
//   control: (provided, state) => ({
//     ...provided,
//     background: '#fff',
//     borderColor: '#9e9e9e',
//     minHeight: '40px',
//     height: '40px',
//     paddingTop: "5px",
//     boxShadow: state.isFocused ? null : null,
//   }),

//   valueContainer: (provided, state) => ({
//     ...provided,
//     height: '40px',
//     padding: '0 6px',
//   }),

//   input: (provided, state) => ({
//     ...provided,
//     margin: '0px',
//   }),
//   indicatorSeparator: state => ({
//     display: 'none',
//   }),
//   indicatorsContainer: (provided, state) => ({
//     ...provided,
//     height: '30px',
//   }),
// };

// const customStyles = {
//   control: base => ({
//     ...base,
//     height: 35,
//     minHeight: 35
//   })
// };

function BasicPagination({ numOfPages, limit, handlePageChange, page }) {
  console.log(numOfPages, "40");
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* <Pagination count={10} /> */}
      <Pagination
        shape="rounded"
        page={page * 1}
        count={numOfPages}
        color="primary"
        onChange={(event, page) => {
          handlePageChange(page);
        }}
      />
      {/* <Pagination count={10} color="secondary" />
      <Pagination count={10} disabled /> */}
    </div>
  );
}

export default function CustomPagination({
  numOfPages,
  currentPage,
  limit,
  totalResults,
  handleLimitChange,
  handlePageChange,
  page,
  options,
}) {
  const classes = useStyles();
  return (
    <div className="pagination-row px-4 my-3 d-flex justify-content-between align-items-center pb-4">
      <div
        className="showing-n-per-page-wrapper d-flex flex-row align-items-center"
        style={{ minWidth: "245px" }}
      >
        <div className={`${classes.showingText} me-3`}>Showing</div>
        <div style={{ width: "40%" }}>
          <Select
            // styles={customStyles}
            menuPlacement="top"
            options={options}
            defaultValue={{
              value: limit,
              label: limit,
            }}
            onChange={(e) => {
              handleLimitChange(e);
            }}
          />
        </div>
        <div className={`${classes.showingText} ms-3`}>of {totalResults}</div>
      </div>
      <div className="basic-pagination-wrapper d-flex flex-row align-items-center">
        <BasicPagination
          page={page}
          numOfPages={numOfPages}
          limit={limit}
          handlePageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
