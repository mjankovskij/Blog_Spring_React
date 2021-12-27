import HTTP from "./index";
import Cookies from 'js-cookie';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const loginProcess = (data) => HTTP.post(`/user/login`, JSON.stringify(data), {headers: headers});
const registerProcess = (data) => HTTP.post(`/user/register`, JSON.stringify(data), {headers: headers});

export {loginProcess, registerProcess}
