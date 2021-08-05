import axios from "axios";

const callApi = async (method, path, data, jwt) => {
    const headers = {
        Authorization: `Bearer ${jwt}`,  
        "Content-Type": "application/json"
    };
    // togleFavs를 하기 위해서, Authorization: jwt를  `Bearer ${jwt}`로 바꿔줘야 함. airbnb-api에서 authentication.py를 보면 token을 x-token asdsasss 이런식으로 x-token뒤에 token을 보내는 것을 확인 가능
    const baseUrl = "http://0b051a6f6017.ngrok.io/api/v1";
    const fullUrl = `${baseUrl}${path}`;
    if(method === "get" || method === "delete"){
        return axios[method](fullUrl, {headers});
    } else{   
        return axios[method](fullUrl, data, {headers});
    }
};

export default {
    createAccount: form => callApi("post", "/users/", form),
    login: form => callApi("post", "/users/login/", form),
    rooms: (page=1) => callApi("get", `/rooms/?page=${page}`),
    favs: (id) => callApi("get", `/users/${id}/favs/`),
    toggleFavs: (userId, roomId, token) => callApi("put", `/users/${userId}/favs/`, { pk: roomId }, token)
};

// airbnb-api에서 users/views.py를 보면, toogle_favs가 put 인것 확인.
// python 코드(airbnb-api)를 보면, 데이터를 입력해야함(usersViewSet의 toggle_favs에서 pk=request.data.get("pk", None) 부분을 가리킴) 즉, request에 data가 있다. data의 이름은 pk로 하자
// token도 필요, airbnb-api에서 authentication.py를 보면 token을 x-token asdsasss 이런식으로 x-token뒤에 token을 보내는 것을 확인 가능
// Authorization: jwt를  `Bearer ${jwt}`로 바꿔줘야 함