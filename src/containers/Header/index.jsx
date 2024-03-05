import React from "react";
import "../../css/header.css";
import { Breadcrumb, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { compose } from "redux";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/api/user";

function Header() {
  // const input1=useRef(null);
  // const input2=useRef(null);
  // const input3=useRef(null);
  // const input4=useRef(null);
  // const input5=useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const values=useSelector(state=>state.auth.data);
  // console.log({values});
  const {info}=values;
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated);

  // const handleClick=(ref)=>{
  //   ref.current.active= true
  // }
  const handleLogout = () => {
    localStorage.removeItem("jogging_tracker_auth")
      dispatch(doLogout(navigate));
  };
  return (
    <div className="header">
      <Row className="part">
        <Col className="left"></Col>
        <Col className="right">
          <Breadcrumb>
            {isAuthenticated ? (
              <>
                <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                {info.role=='admin' ? <Breadcrumb.Item href="/users">Users</Breadcrumb.Item> : <></>}
                
                <Breadcrumb.Item href="/records">Records</Breadcrumb.Item>
                <Breadcrumb.Item href="/profile">Profile</Breadcrumb.Item>
                <Breadcrumb.Item onClick={handleLogout}>Logout</Breadcrumb.Item>
              </>
            ) : (
              <></>
            )}
          </Breadcrumb>
        </Col>
      </Row>

      {/* <Button variant = "outline-danger">Logout</Button>
            <Button variant = "link">Profile</Button>
            <Button variant = "link">Records</Button>
            <Button variant = "link">Dashboard</Button> */}
    </div>
  );
}

export default Header;
