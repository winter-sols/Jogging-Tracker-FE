import React from "react";
import "../../css/header.css";
import { Breadcrumb, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLogout } from "../../redux/api/user";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const values=useSelector(state=>state.auth.data);
  const info=values;
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
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/dashboard" }}>Dashboard</Breadcrumb.Item>
                {info.info.role==='admin' ? <Breadcrumb.Item linkAs={Link} linkProps={{to:"/users"}}>Users</Breadcrumb.Item> : <></>}
                
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/records" }}>Records</Breadcrumb.Item>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/profile" }}>Profile</Breadcrumb.Item>
                <Breadcrumb.Item onClick={handleLogout}>Logout</Breadcrumb.Item>
              </>
            ) : (
              undefined
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
