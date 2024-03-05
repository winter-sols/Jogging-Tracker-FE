import axios from "axios";
import { AUTH_USER, LOG_OUT } from "../reducers/auth";

const base_url = "http://localhost:8000";
axios.defaults.baseURL = base_url + "/";
const auth = localStorage.getItem('jogging_tracker_auth');
if(auth){
  const token = JSON.parse(auth).token;
  // console.log(token)
  axios.defaults.headers.common['Authorization'] = 'JWT '+token;
}


export const signin =
  ({ email, password }) =>
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
            data: info,
            isAuthenticated: true,
          };
          console.log(payload);
          dispatch(AUTH_USER(payload));
          console.log(2);
          localStorage.setItem("jogging_tracker_auth", JSON.stringify(data));
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
      const newData={info:data, token:auth}
      const payload = {
        data: newData,
        isAuthenticated: true,
      };
      dispatch(AUTH_USER(payload));
    })
    .catch((error) => console.error("Fetching user data failed", error));
};

export const doLogout=()=>dispatch=>{
  const data={
    data:{},
    isAuthenticated:false
  }

  dispatch(LOG_OUT(data));
}
