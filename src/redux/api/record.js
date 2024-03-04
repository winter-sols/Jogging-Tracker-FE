import axios from "axios";

const base_url = 'http://localhost:8000';
axios.defaults.baseURL = base_url+'/';
const auth = localStorage.getItem('jogging_tracker_auth')
const token = JSON.parse(auth);
axios.defaults.headers.common['Authorization'] = 'JWT '+token;

export const getrecords = ({count, previous, next, page_size, page}) => {
    axios.get('/records/', {
        params: {
            count:0,
            previous: null,
            next: null,
            page_size: 10,
            page: 1
        }
    })
    .then(response=>{
        const {results} = response.data;
        console.log(results);
    })
    .catch(error=>{
        console.error("Error occured", error);
    })
}

export const getrecord=()=>{

}

