import React from "react";
import { Pagination } from "react-bootstrap";

const PaginationComponent = ({
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const pageItems = [];
  const maxPageItems = 5; // set the maximum number of page links to display

  // calculate the start and end page numbers to display
  let startPage = Math.max(currentPage - Math.floor(maxPageItems / 2), 1);
  let endPage = startPage + maxPageItems - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxPageItems + 1, 1);
  }

  // add page items to the array
  for (let i = startPage; i <= endPage; i++) {
    pageItems.push(
      <Pagination.Item
        key={i}
        active={i === currentPage}
        onClick={() => handlePageChange(i)}
      >
        {i}
      </Pagination.Item>
    );
  }
console.log('hello')
  return (
    <div className="d-flex justify-content-center">
      <Pagination>
        {currentPage > 1 && (
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
          />
        )}
        {pageItems}
        {currentPage < totalPages && (
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
          />
        )}
      </Pagination>
    </div>
  );
};

export default PaginationComponent;