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
import { saveProfile } from "../../redux/api/user";
import { compose } from "redux";

const schema = yup
  .object({
    firstName: yup
      .string()
      .required("Please enter a first name")
      .matches(/^[a-zA-Z]+$/i, "You shouldn't include number"),
    lastName: yup
      .string()
      .required("Please enter a last name")
      .matches(/^[a-zA-Z]+$/i, "You shouldn't include number"),
    email: yup.string().email().required("Please enter an email"),
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

function Profile() {
  const dispatch = useDispatch();
  const values = useSelector((state) => state.auth.data);
  const { info } = values;
  const { email, first_name, last_name } = info;
  const navigate = useNavigate();

  useEffect(() => {
    setValue("firstName", first_name);
    setValue("lastName", last_name);
    setValue("email", email);
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    compose(dispatch(saveProfile(data)), navigate("/dashboard"));
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <div className="form">
          <h2 className="title">Edit Profile</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col>
                <Form.Group style={{ marginBottom: "3vh" }}>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("firstName")}
                    aria-invalid={errors.firstname ? "true" : "false"}
                  />
                </Form.Group>
                {errors.firstname ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.firstname.message}
                  </p>
                ) : undefined}
              </Col>

              <Col>
                <Form.Group style={{ marginBottom: "3vh" }}>
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    {...register("lastName")}
                    aria-invalid={errors.text ? "true" : "false"}
                  />
                </Form.Group>
                {errors.lastname ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.lastname.message}
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

export default Profile;
