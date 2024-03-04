import axios from "axios";
import { useDispatch } from "react-redux";
import { AUTH_USER } from "../reducers/auth";
import auth from "../reducers/auth";
import { error } from "highcharts";
import { Alert } from "react-bootstrap";
import { store } from "../store";
const base_url = 'http://localhost:8000';
axios.defaults.baseURL = base_url+'/';
axios.defaults.headers.common['Authorization'] = 'JWT'+localStorage.getItem('jogging_tracker_auth');


export const signin = ({email, password}) => dispatch => {
    
    axios.post('auth/login', {
        email:email, 
        password:password
    })
    .then(response => {
        const { data } = response
        const { info, token } = data
        const payload = info;
        dispatch(AUTH_USER(payload));
        localStorage.setItem('jogging_tracker_auth', JSON.stringify(token));
        
        
        
    }).catch(error => {
        return console.error('Fetching user data failed', error);
    })
}

export const signup = ({firstName, lastName, email, password}) => {
    console.log(firstName, lastName, email, password);
        axios.post('auth/register', {
            first_name: firstName,
            last_name:lastName,
            email,
            password
        })
        .then(response=> {
        console.log(response.data)
    }).catch(error => console.error('Fetching user data failed', error)
    )
}

