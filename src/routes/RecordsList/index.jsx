import { left } from "@popperjs/core";
import React from "react";
import { Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getrecord, getrecords ,deleterecord} from "../../redux/api/record";
import { Link } from "react-router-dom";
import { distanceUnit, getDateStr, hhmmss } from '../../helpers';
import PaginationFunc from "../../components/Pagination";
import confirmModal from "../../containers/Modals";
import { pick } from "lodash";

import '../../css/recordslist.css';

function RecordsList() {
  // console.log(this.props)
 
  const dispatch = useDispatch();
  const recordslist = useSelector(state=>state.records.recordslist);
  console.log(recordslist);
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
    dispatch(getrecords({
      count:0,
      previous: null,
      next: null,
      page_size: 10,
      page: 1
    }))
  },[])

  const pagination=useSelector(state=> state.pagination)
  const size =pagination.page_size; 
  
  // console.log(pagination, "------------------------------")
  const handleFiltered = (values) => {
  
    console.log(values)
    dispatch(getrecords({
        from: getDateStr(values.from),
        to: getDateStr(values.to),
        page: 1
      
    }))
  }

  const handleDeleteRecord = (id)=>{
    console.log(id, "handle delete record----------");    
        dispatch(deleterecord(id));
  }

  const handlePagination = (pagination) => {
    const {page} = pagination;
    const page_size = size
    // console.log(page,page_size, "jflasjflasjfljsafjlsaljkdf")
    dispatch(getrecords({page, page_size}))
    // const { getRecords, params } = this.props
    // getRecords({
    //   params: {
    //     ...pick(params, ['from', 'to', 'page', 'page_size']),
    //     ...pagination
    //   }
    // })
  }

  return (
    <div className="recordslist">
      <h2 style={{ marginBottom: '3vh' }}>Manage Jogging Records</h2>
      <Form onSubmit={handleSubmit(handleFiltered)} style={{ paddingLeft: '15em' }}>
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
            {recordslist&&recordslist.map((record, index)=>(
              <tr key={index+record}>
                <th scope="row">{index+1}</th>
                <td>{record.date_recorded} {record.last_name}</td>
                <td>{record.user_fullname}</td>
                <td>{hhmmss(record.duration)}</td>
                <td>{distanceUnit(record.distance)}</td>
                <td>{distanceUnit(record.distance / record.duration, '/s')}</td>
                <td>
                  <Link className='btn btn-primary btn-sm' to={`/records/edit/${record.id}`}>
                    Edit
                  </Link>
                  {' '}
                  <Button variant="danger" size='sm' onClick={handleDeleteRecord(record.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
            
           
          </tbody>
        </Table>
      </div>
      <PaginationFunc pagination={pagination} setPagination={handlePagination} />
    </div>
  )
}

export default RecordsList;