import React from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getrecord, updaterecord, createrecord } from "../../redux/api/record";
import { useSelector } from "react-redux";
import getDuration from "../../helpers/Calc";
import { useNavigate } from "react-router-dom";
import { getuserslist } from "../../redux/api/user";

const getUserOptions = (userList) => {
  const userOptions = (userList ? userList.map((user, index) => ({
    label: user.first_name + ' ' + user.last_name,
    value: user.id
  })) : [])
  userOptions.unshift({
    label: '- Select User -',
    value: ''
  })
  return userOptions
}

function RecordEdit() {
  const dispatch = useDispatch();
  const record = useSelector((state) => state.record.record);
  const navigate = useNavigate();
  const { date_recorded, duration, distance, id, user } = record;
  console.log(record, "XXXXX??????");
  const params = useParams();
  const { hour, min, sec } = getDuration(duration);
  // console.log(params)
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      date_recorded: "",
      durationHour: "",
      durationMin: "",
      durationSec: "",
      distance: "",
      user_fullname: "",
    },
  });
  useEffect(() => {
    dispatch(getuserslist({ count: 0, page_size: 100, page: 1 }));
    if (params.id) {
      dispatch(getrecord(params.id));
      setValue("date_recorded", date_recorded);
      setValue("durationHour", hour);
      setValue("durationMin", min);
      setValue("durationSec", sec);
      setValue("distance", distance);
      setValue("user_fullname", user);
    }
  }, [
    dispatch,
    params.id,
    date_recorded,
    hour,
    min,
    sec,
    distance,
    user,
    setValue,
  ]);

  const userList=useSelector(state=>state.users.userslist);
  const users=getUserOptions(userList);

  const handleEdit = (values) => {
    // console.log({ values }, "Valuueeeeeeeee");
    const {
      date_recorded,
      durationHour,
      durationMin,
      durationSec,
      distance,
      user_fullname,
    } = values;
    const duration = 3600 * durationHour + 60 * durationMin + durationSec;
    params.id
      ? dispatch(
          updaterecord(
            { date_recorded, distance, duration, id, user, user_fullname },
            navigate
          )
        )
      : dispatch(
          createrecord(
            { date_recorded, distance, duration, user_fullname },
            navigate
          )
        );
  };

  const handleCancel = () => {
    navigate("/records/");
  };

  return (
    <div>
      <Row>
        <Col md={{ span: 4, offset: 4 }}>
          <h2 style={{ marginTop: "5em" }}>Edit Jogging Record</h2>
        </Col>
        <Col md={{ span: 4, offset: 4 }}>
          <Form onSubmit={handleSubmit(handleEdit)}>
            <Form.Group>
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                {...register("date_recorded")}
                aria-invalid={errors.date ? "true" : "false"}
              />
            </Form.Group>
            {errors.date ? (
              <p role="alert" style={{ color: "red" }}>
                {errors.date.message}
              </p>
            ) : undefined}
            <Row>
              <Col>
                <Form.Group>
                  <Row>
                    <Form.Label>Duration</Form.Label>
                  </Row>
                  <Form.Control
                    type="number"
                    {...register("durationHour")}
                    aria-invalid={errors.durationHour ? "true" : "false"}
                  />
                </Form.Group>
                {errors.durationHour ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.durationHour.message}
                  </p>
                ) : undefined}
              </Col>

              <Col style={{ marginTop: "2em" }}>
                <Form.Group>
                  <Form.Control
                    type="number"
                    {...register("durationMin")}
                    aria-invalid={errors.durationMin ? "true" : "false"}
                  />
                </Form.Group>
                {errors.durationMin ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.durationMin.message}
                  </p>
                ) : undefined}
              </Col>

              <Col style={{ marginTop: "2em" }}>
                <Form.Group>
                  <Form.Control
                    type="number"
                    {...register("durationSec")}
                    aria-invalid={errors.durationSec ? "true" : "false"}
                  />
                </Form.Group>
                {errors.durationSec ? (
                  <p role="alert" style={{ color: "red" }}>
                    {errors.durationSec.message}
                  </p>
                ) : undefined}
              </Col>
            </Row>
            <Form.Label>Distance</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="number"
                {...register("distance")}
                aria-invalid={errors.distance ? "true" : "false"}
              />
              {errors.distance ? (
                <p role="alert" style={{ color: "red" }}>
                  {errors.distance.message}
                </p>
              ) : undefined}
              <InputGroup.Text id="basic-addon2">meters</InputGroup.Text>
            </InputGroup>
            <Form.Group style={{ marginBottom: "3vh" }}>
              <Form.Label>User</Form.Label>
              <Form.Select
                aria-label="Default select example"
                {...register("user_fullname")}
              >
                {
                  users.map(user=><option value={user.value}>{user.label}</option>)
                }
                
                
              </Form.Select>
            </Form.Group>
            <Row style={{ margin: "1em" }}>
              <Col>
                <Button variant="secondary" onClick={handleCancel}>
                  Cancel
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  style={{ float: "right" }}
                  type="submit"
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default RecordEdit;
