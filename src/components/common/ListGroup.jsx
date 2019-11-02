import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const ListGroup = props => {
  let { items, textProperty, valueProperty, onGenreSelect } = props;

  //  APPEND ALL GENRES HERE - MAKE THIS PART REUSABLE
  items = [{ _id: "1", name: "All Genres" }, ...items];

  const genresMenu = items.map(singleItem => {
    return (
      <li
        class="list-group-singleItem"
        key={singleItem._id}
        onClick={() => onGenreSelect(singleItem)}
      >
        {singleItem.name}
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

export default ListGroup;
