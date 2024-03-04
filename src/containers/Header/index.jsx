import React from "react";
import '../../css/header.css';
import { Breadcrumb} from 'react-bootstrap';
import { useSelector } from "react-redux";

function Header() {
  const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
  console.log(isAuthenticated)
  return (
    <div className="header">
      <Breadcrumb>
      {isAuthenticated?
      <>
        <Breadcrumb.Item  active>Dashboard</Breadcrumb.Item>
        <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
        <Breadcrumb.Item href="/records">Records</Breadcrumb.Item>
        <Breadcrumb.Item href="/profile">Profile</Breadcrumb.Item>
        <Breadcrumb.Item href="/signin">Logout</Breadcrumb.Item>
      </>:<></>
        }
      </Breadcrumb>
      
      {/* <Button variant = "outline-danger">Logout</Button>
            <Button variant = "link">Profile</Button>
            <Button variant = "link">Records</Button>
            <Button variant = "link">Dashboard</Button> */}
    </div>
  )
}

export default Header;