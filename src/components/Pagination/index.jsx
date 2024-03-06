import React from "react";
// import { ButtonDropdown, Col, DropdownToggle, DropdownItem, DropdownMenu,
//   PaginationLink, PaginationItem, Pagination as BSPagination, Row } from 'reactstrap'
import {
  Pagination as BSPagination,
  Row,
  Col,
  Dropdown,
} from "react-bootstrap";
import { getPageCount } from "../../helpers";
import { useState } from "react";

export default function PaginationFunc(props) {
  // console.log(props);
  const pagination = props.pagination,
    setPagination = props.setPagination;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => {
    setDropdownOpen({ dropdownOpen: !dropdownOpen });
  };

  const handlePageClick = (page) => () => {
    if (page === "prev") {
      page = Math.max(1, pagination.page - 1);
    }
    if (page === "next") {
      page = Math.min(getPageCount(pagination), pagination.page + 1);
    }

    if (page !== pagination.page) {
      setPagination({ page });
    }
  };

  const handlePageSize = (pageSize) => () => {
    if (pageSize !== pagination.page_size) {
      setPagination({
        page_size: pageSize,
        page: 1,
      });
    }
  };

  const pageCount = getPageCount(pagination);
  const pages = new Array(pageCount).fill(0);
  // console.log(pages);

  return (
    <Row style={{ justifyContent: "center" }}>
      <Col xs="auto" className="pr-1 pl-1">
        <Dropdown onClick={toggle}>
          <Dropdown.Toggle>{pagination.page_size}</Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={handlePageSize(2)}>2</Dropdown.Item>
            <Dropdown.Item onClick={handlePageSize(5)}>5</Dropdown.Item>
            <Dropdown.Item onClick={handlePageSize(10)}>10</Dropdown.Item>
            <Dropdown.Item onClick={handlePageSize(20)}>20</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
      <Col xs="auto" className="pr-1 pl-1">
        <BSPagination>
          <BSPagination.Prev
            tag="button"
            onClick={handlePageClick("prev")}
            disabled={pagination.page === 1}
          />
          {pages.map((item, index) => (
            <BSPagination.Item
              key={index + item}
              active={index + 1 === pagination.page}
              onClick={handlePageClick(index + 1)}
            >
              {index + 1}
            </BSPagination.Item>
          ))}
          <BSPagination.Next
            tag="button"
            onClick={handlePageClick("next")}
            disabled={pagination.page === pageCount}
          />
        </BSPagination>
      </Col>
    </Row>
  );
}
