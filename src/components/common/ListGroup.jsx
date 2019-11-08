import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const ListGroup = props => {
  let {
    items,
    textProperty,
    valueProperty,
    onItemSelect,
    itemSelected
  } = props;

  //  APPEND ALL GENRES HERE - MAKE THIS PART REUSABLE
  // items = [{ _id: "1", name: "All Genres" }, ...items];

  const genresMenu = items.map(singleItem => {
    console.log("itemSelected==>", itemSelected);
    console.log("singleItem[textProperty]==>", singleItem[textProperty]);
    return (
      <li
        className={
          itemSelected == singleItem[textProperty]
            ? "list-group-item active"
            : "list-group-item"
        }
        key={singleItem[valueProperty]}
        onClick={() => onItemSelect(singleItem)}
      >
        {singleItem[textProperty]}
      </li>
    );
  });

  return <ul class="list-group">{genresMenu}</ul>;
};

ListGroup.propTypes = {
  genres: PropTypes.array.isRequired,
  handleFilterClick: PropTypes.func.isRequired

  // pageSize: PropTypes.number.isRequired,
  // totalItemCount: PropTypes.number.isRequired,
  // onPageChange: PropTypes.func.isRequired
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
