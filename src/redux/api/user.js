import axios from "axios";
import { AUTH_USER, LOG_OUT } from "../reducers/auth";
import {
  GET_USERS,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../reducers/usersReducer";
import { GET_USER } from "../reducers/userReducer";
import { SET_PAGINATION } from "../reducers/paginationReducer";
import { GET_USER_REPORT } from "../reducers/userReportReducer";

const base_url = "http://localhost:8000";
axios.defaults.baseURL = base_url + "/";
const auth = localStorage.getItem("jogging_tracker_auth");
if (auth) {
  const token = JSON.parse(auth).token;
  // console.log(token)
  axios.defaults.headers.common["Authorization"] = "JWT " + token;
}

export const signin =
  ({ email, password }, navigate) =>
  (dispatch) => {
    axios
      .post("auth/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        const { data } = response;
        if (data) {
          const payload = {
            data: data,
            isAuthenticated: true,
          };
          console.log(payload);
          dispatch(AUTH_USER(payload));
          console.log(2);
          localStorage.setItem("jogging_tracker_auth", JSON.stringify(data));
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        return console.error("Fetching user data failed", error);
      });
  };

export const signup = ({ firstName, lastName, email, password }, navigate) => {
  axios
    .post("auth/register", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })
    .then((response) => {
      navigate("/");
    })
    .catch((error) => console.error("Fetching user data failed", error));
};

export const saveProfile = (data) => (dispatch) => {
  const { firstName, lastName, email, password } = data;
  axios
    .put("users/profile/", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })
    .then((response) => {
      const { data } = response;
      const newData = { info: data, token: auth };
      const payload = {
        data: newData,
        isAuthenticated: true,
      };
      dispatch(AUTH_USER(payload));
    })
    .catch((error) => console.error("Fetching user data failed", error));
};

export const doLogout = (navigate) => (dispatch) => {
  const data = {
    data: {},
    isAuthenticated: false,
  };

  dispatch(LOG_OUT(data));
  navigate("/");
};

export const getuserslist =
  ({ count, page_size, page }) =>
  (dispatch) => {
    axios
      .get("/users/", {
        params: {
          count,
          page_size,
          page,
        },
      })
      .then((response) => {
        const { count, next, previous, results } = response.data;
        const payload = results;
        const data = { count, next, previous, page };
        dispatch(GET_USERS(payload));
        dispatch(SET_PAGINATION(data));
      })
      .catch((error) => {
        console.error("Error occured", error);
      });
  };

export const getuser = (id) => (dispatch) => {
  console.log(id);
  axios
    .get(`/users/${id}`)
    .then((response) => {
      const data = response.data;
      dispatch(GET_USER(data));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const updateuser = (data, navigate) => (dispatch) => {
  console.log(data)
  const { email, role, first_name, last_name, id, password } = data;
  axios
    .put(`/users/${id}/`, {
      email,
      role,
      first_name,
      last_name,
      id,
      password,
    })
    .then((response) => {
      const payload = response.data;
      dispatch(UPDATE_USER(payload));
      navigate(-1);
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const createuser = (data, navigate) => (dispatch) => {
  const { email, role, first_name, last_name, id, password } = data;
  axios
    .post(`/users/`, {
      email,
      role,
      first_name,
      last_name,
      id,
      password,
    })
    .then((response) => {
      const payload = response.data;
      dispatch(CREATE_USER(payload));
      navigate(-1);
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const deleteuser = (id) => (dispatch) => {
  axios
    .delete(`/users/${id}`)
    .then((response) => {
      const payload = id;
      dispatch(DELETE_USER(payload));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const getuserreport = (id) => (dispatch) => {
  axios
    .get(`/users/${id}/report`)
    .then((response) => {
      const payload = response.data;
      dispatch(GET_USER_REPORT(payload));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};
