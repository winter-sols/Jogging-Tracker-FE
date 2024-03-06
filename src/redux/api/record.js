import axios from "axios";
import {
  GET_RECORDS,
  DELETE_RECORD,
  UPDATE_RECORD,
  CREATE_RECORD,
} from "../reducers/recordsReducer";
import { GET_RECORD } from "../reducers/recordReducer";
import { SET_PAGINATION } from "../reducers/paginationReducer";

const base_url = "http://localhost:8000";
axios.defaults.baseURL = base_url + "/";
const auth = localStorage.getItem("jogging_tracker_auth");
const token = JSON.parse(auth).token;
axios.defaults.headers.common["Authorization"] = "JWT " + token;

export const getrecords =
  ({ count, previous, next, page_size, page, from, to }) =>
  (dispatch) => {
    axios
      .get("/records/", {
        params: {
          count,
          previous,
          next,
          page_size,
          page,
          from,
          to,
        },
      })
      .then((response) => {
        const { count, next, previous, results } = response.data;
        const payload = results;
        const data = { count, next, previous, page };

        dispatch(GET_RECORDS(payload));
        dispatch(SET_PAGINATION(data));
      })
      .catch((error) => {
        console.error("Error occured", error);
      });
  };

export const getrecord = (id) => (dispatch) => {
  axios
    .get(`/records/${id}`)
    .then((response) => {
      const data = response.data;
      // console.log(data);
      dispatch(GET_RECORD(data));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const updaterecord = (data, navigate) => (dispatch) => {
  var { date_recorded, distance, duration, id, user, user_fullname, info } = data;
  console.log(info)
  if(info.role!=='Admin')user_fullname=info.first_name+info.last_name;
  axios
    .put(`/records/${id}/`, {
      date_recorded,
      distance,
      duration,
      id,
      user,
      user_fullname,
    })
    .then((response) => {
      const payload = response.data;
      dispatch(UPDATE_RECORD(payload));
      navigate(-1);
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const createrecord = (data, navigate) => (dispatch) => {
  const { date_recorded, distance, duration, user_fullname, userid ,role } = data;
  // console.log({id}, "Rolllllllllllllllll")
  var user=user_fullname;
  if(role!=='Admin')user=userid
  console.log(user)
  // console.log(User)
  axios
    .post(`/records/`, {
      date_recorded,
      distance,
      duration,
      user
    })
    .then((response) => {
      const payload = response.data;
      dispatch(CREATE_RECORD(payload));
      navigate(-1);
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const deleterecord = (id) => (dispatch) => {
  axios
    .delete(`/records/${id}`)
    .then((response) => {
      console.log(response)
      dispatch(
        getrecords({
          count: 0,
          previous: null,
          next: null,
          page_size: 10,
          page: 1,
          from:null,
          to:null
        })
      );
      const payload = id;
      dispatch(DELETE_RECORD(payload));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};
