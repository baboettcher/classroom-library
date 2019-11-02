import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = props => {
  const { currentPage, pageSize, totalItemCount, onPageChange } = props;
  const totalPages = Math.ceil(totalItemCount / pageSize);
  const pagesCount = _.range(1, totalPages + 1);

  return (
    <nav>
      <ul className="pagination">
        {pagesCount.map(page => {
          return (
            <li
              className={page == currentPage ? "page-item active" : "page-item"}
              key={page}
            >
              <a
                className="page-link"
                active
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalItemCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
