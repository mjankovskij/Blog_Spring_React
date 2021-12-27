import HTTP from "./index";
import Cookies from 'js-cookie';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const saveComment = (data, blogId) =>
    data.id ?
        HTTP.post(`/comment/save`, JSON.stringify(data), {headers: headers})
        :
        HTTP.put(`/comment/save/${blogId}`, JSON.stringify(data), {headers: headers})
;
const deleteComment = (id) => HTTP.delete(`/comment/delete/${id}`, {headers: headers});

export {saveComment, deleteComment}
