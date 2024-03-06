import React, { useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getuserslist, deleteuser } from "../../redux/api/user";
import { ucFirst } from "../../helpers";
import PaginationFunc from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import ReportModal from "../../containers/Modals/reportModal";
import "../../css/recordslist.css";
// import confirmModal from "../../containers/Modals";

function UserList() {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalId, setModalId] = useState(0);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userslist = useSelector((state) => state.users.userslist);

  useEffect(() => {
    dispatch(
      getuserslist({
        count: 0,
        page_size: 10,
        page: 1,
      })
    );
  }, [dispatch]);

  const pagination = useSelector((state) => state.pagination);
  const size = pagination.page_size;

  const handleDeleteUser = useCallback(
    (id) => {
      dispatch(deleteuser(id));
    },
    [dispatch]
  );

  const handlePagination = (pagination) => {
    const { page } = pagination;
    const page_size = size;
    dispatch(getuserslist({ page, page_size }));
  };

  const handleAddUser = () => {
    navigate("/users/new");
  };

  const handleReport = useCallback((user) => {
    const name = user.first_name + " " + user.last_name;
    setModalId(user.id);
    setUserName(name);
    setIsModalShow(true);
  }, []);

  return (
    <div className="recordslist">
      <h2 style={{ marginBottom: "3vh", marginTop: "5vh" }}>Manage Users</h2>
      <div className="btn_new">
        <Button variant="primary" onClick={handleAddUser}>
          Add a New User
        </Button>
      </div>
      <div style={{ marginTop: "3em" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ReportModal
              show={isModalShow}
              onHide={() => setIsModalShow(false)}
              id={modalId}
              name={userName}
            />
            {userslist &&
              userslist.map((user, index) => (
                <tr key={index + user}>
                  <th scope="row">{index + 10*(pagination.page-1)+1}</th>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{ucFirst(user.role)}</td>
                  <td>
                    <Button
                      variant="info"
                      size="sm"
                      onClick={() => handleReport(user)}
                    >
                      Report
                    </Button>{" "}
                    <Link
                      className="btn btn-primary btn-sm"
                      to={`/users/edit/${user.id}`}
                    >
                      Edit
                    </Link>{" "}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDeleteUser(user.id)}
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

export default UserList;
