import { left } from "@popperjs/core";
import React from "react";
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getrecords } from "../../redux/api/record";
import '../../css/recordslist.css';

function RecordsList() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    defaultValues: {
      from: "",
      to: "",

    }
  });

  useEffect(()=>{
    getrecords({count:0,
      previous: null,
      next: null,
      page_size: 10,
      page: 1});
  },[])

  const onSubmit = (data) => {
    console.log(data)
  }
  return (
    <div className="recordslist">
      <h2 style={{ marginBottom: '3vh' }}>Manage Jogging Records</h2>
      <Form onSubmit={handleSubmit(onSubmit)} style={{ paddingLeft: '15em' }}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type='date'
                {...register("from")}
                aria-invalid={errors.from ? "true" : "false"}
              />
            </Form.Group>
            {
              errors.from ?
                <p role="alert" style={{ color: 'red' }}>{errors.from.message}</p> : undefined
            }
          </Col>

          <Col>
            <Form.Group>
              <Form.Control
                type='date'
                {...register("to")}
                aria-invalid={errors.from ? "true" : "false"}
              />
            </Form.Group>
            {
              errors.to ?
                <p role="alert" style={{ color: 'red' }}>{errors.to.message}</p> : undefined
            }
          </Col>
          <Col>
            <Button type="onSubmit" variant="outline-primary" style={{ float: left }}>Filter</Button>
          </Col>
        </Row>
      </Form>
      <div style={{marginTop: '3em'}}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>User</th>
              <th >Duration</th>
              <th >Distance</th>
              <th>Avg.Speed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
           
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default RecordsList;