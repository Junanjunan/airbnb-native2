import axios from "axios";

const callApi = async (method, path, data, jwt) => {
    const headers = {
        Authorization: jwt,
        "Content-Type": "application/json"
    };
    const baseUrl = "http://425df9497410.ngrok.io/api/v1";
    const fullUrl = `${baseUrl}${path}`;
    if(method === "get" || method === "delete"){
        return axios[method](fullUrl, {headers});
    } else{                                             // axios.get() 이나, axios.put() 등으로 하고 괄호 안에 무엇이 들어가야 하는지 참조사항을 보면, put등에는 get에는 없어도 되는 data 등이 필요함
        return axios[method](fullUrl, data, {headers});
    }
};

export default {
    createAccount: form => callApi("post", "/users/", form),
    login: form => callApi("post", "/users/login/", form),
}