import React from "react";
import { ListGroup, Row, Col } from 'react-bootstrap';
import '../../css/dashboard.css';
import { useNavigate } from "react-router-dom";


function Dashboard() {
  const navigate = useNavigate();

  const onClick = (e)=>{
    console.log("erwerwe", e.target.id);
    const route = e.target.id;
    navigate(route);

  }
  return (
    <div className="dashboard">
      <div className="title">
        <h2>Welcome, Super User!</h2>
        <h4>Thanks for using Jogging Tracker!</h4>
        <h4>Please use the following navigations to use this app.</h4>
      </div>
      <ListGroup style={{marginTop: '3vh', textAlign:'center'}}>
        <Row>
        <Col md = {{span:4, offset:4}}>
            <ListGroup.Item variant="primary" id = "/users" action onClick={e=>onClick(e)}>Manage Users</ListGroup.Item>          
          </Col>
          <Col md = {{span:4, offset:4}}>
            <ListGroup.Item variant="primary" id = "/records" action onClick={e=>onClick(e)}>Manage Jogging Tracking Records</ListGroup.Item>          
          </Col>
        </Row>

        <Row>
          <Col md = {{span:4, offset:4}}>
            <ListGroup.Item variant="success" action onClick={e=>onClick(e)}>View My Report</ListGroup.Item>          
          </Col>
        </Row>

        <Row>
          <Col md = {{span:4, offset:4}}>
            <ListGroup.Item variant="info" id = "/profile" action onClick={e=>onClick(e)}>My Profile</ListGroup.Item>          
          </Col>
        </Row>
        
      </ListGroup>
    </div>
  )
}

export default Dashboard;