import HTTP from "./index";
import Cookies from 'js-cookie';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': Cookies.get('XSRF-TOKEN'),
    'org.springframework.web.servlet.i18n.CookieLocaleResolver.LOCALE': 'lt'
}

const getUser = () => HTTP.get(`/user/get`, {headers: headers});
const loginProcess = (data) => HTTP.post(`/user/login`, JSON.stringify(data), {headers: headers});
const registerProcess = (data) => HTTP.post(`/user/register`, JSON.stringify(data), {headers: headers});
const logoutProcess = () => HTTP.post(`/user/logout`, null, {headers: headers});

export {getUser, loginProcess, registerProcess, logoutProcess}
