import React from "react";
import '../../css/side.css';
import { Button, Col } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function Side() {
  const navigate = useNavigate();
  
  const onToggle = (e)=>{
    navigate(e.target.id)
  }

  

  return (
    <Col>
      <div className="side">
        <h1>Welcome to Jogging Track!</h1>
        <div>
          <Button variant="light" className="btn1" id = '/' onClick={e=>onToggle(e)}>SignIn</Button>
          <Button variant="secondary" className="btn2" id='signup' onClick={e=>onToggle(e)}>SignUp</Button>
        </div>
      </div>
    </Col>

  )
}

export default Side;