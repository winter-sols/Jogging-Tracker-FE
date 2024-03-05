import React from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import "../../css/signin.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signin } from "../../redux/api/user";
import { useDispatch } from "react-redux";
import Side from "../../containers/Side";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { compose } from "redux";
// import Input from '../../components/Input';

const schema = yup
  .object({
    email: yup.string().email().required("Please enter an email"),
    password: yup
      .string()
      .required("Please enter a password")
      .min(8, "Password must be at least 8 characters"),
  })
  .required();

function Login() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log(isAuthenticated)

  // useEffect(() => {
  //   isAuthenticated ? navigate("/dashboard") : navigate("/");
  //   // console.log(isAuthenticated)
  // },[]);

  const dispatch = useDispatch();
  // const history = useHistory();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // console.log(errors)
  const onSubmit = (data) => {
    console.log(data);
    
      dispatch(signin(data, navigate))
    
  };

  return (
    <Row>
      <Side />

      <Col style={{padding:'0px'}}>
        <div className="form">
          <h2 className="title">Signin</h2>
          <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Form.Control type="password" {...register("password")} />
            </Form.Group>
            {errors.password ? (
              <p role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </p>
            ) : undefined}
            <Button variant="light" type="submit" className="btn3">
              Signin
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

export default Login;
