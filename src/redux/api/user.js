import axios from "axios";
import { AUTH_USER } from "../reducers/auth";

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
        const { info } = data
        if(data){
            const payload = {
            data:info,
            isAuthenticated: true
            };
        console.log(payload)
        dispatch(AUTH_USER(payload));
        localStorage.setItem('jogging_tracker_auth', JSON.stringify(data));    
    }
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

