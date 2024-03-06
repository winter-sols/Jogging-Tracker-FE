import { left } from "@popperjs/core";
import React, { useCallback } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getrecords, deleterecord } from "../../redux/api/record";
import { Link } from "react-router-dom";
import { distanceUnit, getDateStr, hhmmss } from "../../helpers";
import PaginationFunc from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import "../../css/recordslist.css";
// import confirmModal from "../../containers/Modals";

function RecordsList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recordslist = useSelector((state) => state.records.recordslist);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      from: "",
      to: "",
    },
  });

  useEffect(() => {
    dispatch(
      getrecords({
        count: 0,
        previous: null,
        next: null,
        page_size: 10,
        page: 1,
        from: null,
        to: null,
      })
    );
  }, [dispatch]);

  const pagination = useSelector((state) => state.pagination);
  const size = pagination.page_size;

  // console.log(pagination, "------------------------------")
  const handleFiltered = (values) => {
    // console.log({values},"Filterrrrrrrrrrrrrrrrrrr");
    dispatch(
      getrecords({
        from: getDateStr(values.from),
        to: getDateStr(values.to),
        page: 1,
      })
    );
  };

  const handleDeleteRecord = useCallback(
    (id) => {
      // console.log({id}, "handle delete record----------");
      dispatch(deleterecord(id));
    },
    [dispatch]
  );

  const handlePagination = (pagination) => {
    const { page } = pagination;
    const page_size = size;
    // console.log(page,page_size, "jflasjflasjfljsafjlsaljkdf")
    dispatch(getrecords({ page, page_size }));
  };

  const handleAddRecord = () => {
    navigate("/records/new");
  };

  return (
    <div className="recordslist">
      <h2 style={{ marginBottom: "3vh" }}>Manage Jogging Records</h2>
      <Form
        onSubmit={handleSubmit(handleFiltered)}
        style={{ paddingLeft: "10em" }}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="date"
                {...register("from")}
                aria-invalid={errors.from ? "true" : "false"}
              />
            </Form.Group>
            {errors.from ? (
              <p role="alert" style={{ color: "red" }}>
                {errors.from.message}
              </p>
            ) : undefined}
          </Col>

          <Col>
            <Form.Group>
              <Form.Control
                type="date"
                {...register("to")}
                aria-invalid={errors.from ? "true" : "false"}
              />
            </Form.Group>
            {errors.to ? (
              <p role="alert" style={{ color: "red" }}>
                {errors.to.message}
              </p>
            ) : undefined}
          </Col>
          <Col>
            <Button
              type="onSubmit"
              variant="outline-primary"
              style={{ float: left }}
            >
              Filter
            </Button>
          </Col>
          <Col>
            <Button onClick={handleAddRecord}>Add a new record</Button>
          </Col>
        </Row>
      </Form>
      <div style={{ marginTop: "3em" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>User</th>
              <th>Duration</th>
              <th>Distance</th>
              <th>Avg.Speed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {recordslist &&
              recordslist.map((record, index) => (
                <tr key={index + record}>
                  <th scope="row">{index + 1 + 10 * (pagination.page - 1)}</th>
                  <td>
                    {record.date_recorded} {record.last_name}
                  </td>
                  <td>{record.user_fullname}</td>
                  <td>{hhmmss(record.duration)}</td>
                  <td>{distanceUnit(record.distance)}</td>
                  <td>
                    {distanceUnit(record.distance / record.duration, "/s")}
                  </td>
                  <td>
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/records/edit/${record.id}`}
                    >
                      Edit
                    </Link>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteRecord(record.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <PaginationFunc
        pagination={pagination}
        setPagination={handlePagination}
      />
    </div>
  );
}

export default RecordsList;
