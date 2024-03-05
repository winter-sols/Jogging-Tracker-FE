import axios from "axios";
import { AUTH_USER, LOG_OUT } from "../reducers/auth";
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from "../reducers/usersReducer";
import { GET_USER } from "../reducers/userReducer";
import { SET_PAGINATION } from "../reducers/paginationReducer";

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
        const { info } = data;
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

export const signup = ({ firstName, lastName, email, password }) => {
  console.log(firstName, lastName, email, password);
  axios
    .post("auth/register", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.error("Fetching user data failed", error));
};

export const getProfile = () => {
  axios.get("users/profile").then((response) => {
    console.log(response);
  });
};

export const saveProfile = (data) => (dispatch) => {
  console.log(data);
  const { firstName, lastName, email, password } = data;
  console.log(firstName, lastName, email, password);
  axios
    .put("users/profile/", {
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    })
    .then((response) => {
      // console.log(response.data);
      const { data } = response;
      // console.log(data)
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
        console.log(response, "response???????????????");
        const { count, next, previous, results } = response.data;
        const payload = results;
        console.log({payload});
        const data = { count, next, previous, page };
        // console.log(page, "@@@@@@@@@@@@@@@@@@@@@@")
        // console.log(data, "--------------????????????????")
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
      console.log({data});
      dispatch(GET_USER(data));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};

export const updateuser = (data, navigate) => (dispatch) => {
  const { date_recorded, distance, duration, id, user, user_fullname } = data;
  axios
    .put(`/users/${id}/`, {
      date_recorded,
      distance,
      duration,
      id,
      user,
      user_fullname,
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
  console.log(data);
  const { date_recorded, distance, duration, user } = data;
  axios
    .post(`/users/`, {
      date_recorded,
      distance,
      duration,
      user,
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
    .delete(`/records/${id}`)
    .then((response) => {
      // console.log(response);
      const payload = id;
      dispatch(DELETE_USER(payload));
    })
    .catch((error) => {
      console.error("Error occured", error);
    });
};
