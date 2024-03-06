import React from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import "../../css/dashboard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useCallback } from "react";
import ReportModal from "../../containers/Modals/reportModal";

function Dashboard() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const profile = useSelector((state) => state.auth.data);
  const { info } = profile;
  const onClick = (e) => {
    console.log("erwerwe", e.target.id);
    const route = e.target.id;
    navigate(route);
  };

  const handleReport = useCallback((user) => {
    const name = user.first_name + " " + user.last_name;
    setModalId(user.id);
    setUserName(name);
    setIsModalShow(true);
  }, []);
  return (
    <div className="dashboard">
      <div className="title">
        <h2>Welcome, {info.first_name} User!</h2>
        <h4>Thanks for using Jogging Tracker!</h4>
        <h4>Please use the following navigations to use this app.</h4>
      </div>
      <ListGroup style={{ marginTop: "3vh", textAlign: "center" }}>
        <Row>
          {info.role === "Admin" && (
            <Col md={{ span: 4, offset: 4 }}>
              <ListGroup.Item
                variant="secondary"
                id="/users"
                action
                onClick={(e) => onClick(e)}
              >
                Manage Users
              </ListGroup.Item>
            </Col>
          )}

          <Col md={{ span: 4, offset: 4 }}>
            <ListGroup.Item
              variant="primary"
              id="/records"
              action
              onClick={(e) => onClick(e)}
            >
              Manage Jogging Tracking Records
            </ListGroup.Item>
            <ReportModal
              show={isModalShow}
              onHide={() => setIsModalShow(false)}
              id={modalId}
              name={userName}
            />
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <ListGroup.Item
              variant="success"
              action
              onClick={() => handleReport(info)}
            >
              View My Report
            </ListGroup.Item>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 4, offset: 4 }}>
            <ListGroup.Item
              variant="info"
              id="/profile"
              action
              onClick={(e) => onClick(e)}
            >
              Edit Your Profile
            </ListGroup.Item>
          </Col>
        </Row>
      </ListGroup>
    </div>
  );
}

export default Dashboard;
