import axios from "axios";
import { result } from "lodash";
import { GET_RECORDS } from "../reducers/recordsReducer";
import { GET_RECORD } from "../reducers/recordReducer";
import { SET_PAGINATION } from "../reducers/paginationReducer";

const base_url = 'http://localhost:8000';
axios.defaults.baseURL = base_url+'/';
const auth = localStorage.getItem('jogging_tracker_auth');
const token = JSON.parse(auth).token;
console.log(token)
axios.defaults.headers.common['Authorization'] = 'JWT '+token;

export const getrecords = ({count, previous, next, page_size, page}) =>dispatch=> {
    axios.get('/records/', {
        params: {
            count,
            previous,
            next,
            page_size,
            page
        }
    })
    .then(response=>{
        // console.log(response, "response???????????????")
        const {count, next,previous, results}=response.data;
        const payload = results;
        const data = {count, next, previous, page}
        // console.log(page, "@@@@@@@@@@@@@@@@@@@@@@")
        // console.log(data, "--------------????????????????")
        dispatch(GET_RECORDS(payload));
        dispatch(SET_PAGINATION(data))
    })
    .catch(error=>{
        console.error("Error occured", error);
    })
}

export const getrecord=(id)=>dispatch=>{
    console.log(id)
    axios.get(`/records/${id}`)
        .then(response=>{
            const data=response.data;
            console.log(data)
            dispatch(GET_RECORD(data));
        })
        .catch(error=>{
            console.error("Error occured", error);
        })
}

export const updaterecord=(data)=>dispatch=>{
    const {date_recorded, distance, duration, id, user, user_fullname}=data
    axios.put(`/records/${id}`,{
        date_recorded,
        distance,
        duration,
        id,
        user,
        user_fullname
    })
    .then(response=>{
        const data=response.data;
        dispatch(GET_RECORD(data));
    })
    .catch(error=>{
        console.error("Error occured", error)
    })
}

export const deleterecord=(id)=>dispatch=>{
    axios.delete(`/records/${id}`)
    .then(response=>{
        console.log(response)
    })
}

