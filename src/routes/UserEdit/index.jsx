import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../css/profile.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ref } from "yup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { createuser, getuser, updateuser } from "../../redux/api/user";
import { useParams } from "react-router-dom";

const schema = yup
  .object({
    first_name: yup
      .string()
      .required("Please enter a first name")
      .matches(/^[a-zA-Z]+$/i, "You shouldn't include number"),
    last_name: yup
      .string()
      .required("Please enter a last name")
      .matches(/^[a-zA-Z]+$/i, "You shouldn't include number"),
    email: yup.string().email().required("Please enter an email"),
    role: yup.string().required(),
    password: yup
      .string()
      .required("Please enter a password")
      .min(8, "Password must be at least 8 characters"),
    confirmPwd: yup
      .string()
      .required("Please re-type your password")
      .oneOf([ref("password")], "Password does not match!"),
  })
  .required();

function UserEdit() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  console.log(user, "]]]]]]]]]]]]]]]");
  const { first_name, last_name, email, role } = user;
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      role: "User",
      password: "",
    },
  });

  useEffect(() => {
    if (params.id) {
      dispatch(getuser(params.id));
      setValue("first_name", first_name);
      setValue("last_name", last_name);
      setValue("email", email);
      setValue("role", role);
    }
  }, [dispatch, params.id, setValue, first_name, last_name, email, role]);

  
  console.log(errors);
  const handleEdit = (values) => {
    console.log({ values }, "AAAAAAAAAAAAAAAAAAAAA");
    const { email, role, first_name, last_name, id, password }=values;
    params.id
      ? dispatch(
          updateuser(
            { email, role, first_name, last_name, id, password },
            navigate
          )
        )
      : dispatch(
          createuser(
            { email, role, first_name, last_name, id, password },
            navigate
          )
        );
    // compose(dispatch(createuser(data)), navigate(-1));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div className="form">
          <h2 className="title">{params.id ? "Edit User" : "Add New User"}</h2>
          <Form onSubmit={handleSubmit(handleEdit)}>
            <Row>
              <Col>
                <Form.Group style={{ marginBottom: "3vh" }}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("first_name")}
                    aria-invalid={errors.first_name ? "true" : "false"}
                  />
                </Form.Group>
                {errors.first_name ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.first_name.message}
                  </p>
                ) : undefined}
              </Col>

              <Col>
                <Form.Group style={{ marginBottom: "3vh" }}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("last_name")}
                    aria-invalid={errors.last_name ? "true" : "false"}
                  />
                </Form.Group>
                {errors.last_name ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.last_name.message}
                  </p>
                ) : undefined}
              </Col>
            </Row>

            <Form.Group style={{ marginBottom: "3vh" }}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                {...register("email")}
                aria-invalid={errors.Email ? "true" : "false"}
              />
            </Form.Group>
            {errors.email?.type === "required" && (
              <p role="alert" style={{ color: "red" }}>
                Email is required!
              </p>
            )}

            <Form.Group style={{ marginBottom: "3vh" }}>
              <Form.Label>Role</Form.Label>
              <Form.Select
                aria-label="Default select example"
                {...register("role")}
              >
                <option value="user">User</option>
                <option value="manager">Manager</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </Form.Group>

            <Form.Group style={{ marginBottom: "3vh" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                {...register("password")}
                aria-invalid={errors.password ? "true" : "false"}
              />
            </Form.Group>
            {errors.password ? (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            ) : undefined}

            <Form.Group style={{ marginBottom: "3vh" }}>
              <Form.Label>Confirm</Form.Label>
              <Form.Control type="password" {...register("confirmPwd")} />
            </Form.Group>
            {errors.confirmPwd ? (
              <p role="alert" style={{ color: "red" }}>
                {errors.confirmPwd.message}
              </p>
            ) : undefined}
            <Button variant="primary" type="submit" className="btn3">
              Save Profile
            </Button>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default UserEdit;
