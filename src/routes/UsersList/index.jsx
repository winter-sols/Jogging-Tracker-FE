import React from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function UsersList() {
  const handleDeleteRecord = () => {
    console.log("kkkkkkkk");
  };
  return (
    <div className="userslist">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Username</th>
            <th>Username</th>
            <th>Username</th>
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
            <td>
              <Link className="btn btn-primary btn-sm" to={`/records/edit/`}>
                Edit
              </Link>{" "}
              <Button variant="waring" onClidk={handleDeleteRecord}>
                Delete
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default UsersList;
