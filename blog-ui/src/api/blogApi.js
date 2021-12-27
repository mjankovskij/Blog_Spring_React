import HTTP from "./index";

const token = sessionStorage.getItem('Authorization') ? JSON.parse(sessionStorage.getItem('Authorization')).token : '';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
}

const getBlog = (id) => HTTP.get(`/blog/get/${id}`, {headers: headers});
const getBlogs = () => HTTP.get('/blog/get');
const saveBlog = (data) =>
    data.id ?
        HTTP.post(`/blog/save`, JSON.stringify(data), {headers: headers})
        :
        HTTP.put(`/blog/save`, JSON.stringify(data), {headers: headers})
;
const deleteBlog = (id) => HTTP.delete(`/blog/delete/${id}`, {headers: headers});

export {getBlog, getBlogs, deleteBlog, saveBlog}
