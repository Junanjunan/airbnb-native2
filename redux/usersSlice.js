import { createSlice } from "@reduxjs/toolkit";
import api from "../api";
import { setFavs } from "./roomsSlice";

const userSlice = createSlice({
    name:"users",
    initialState:{
        isLoggedIn: false,
        token: null,
    },
    reducers: {
        logIn(state, action) {
            state.isLoggedIn = true;
            state.token = action.payload.token;
            state.id = action.payload.id;
        },
        logOut(state, action){
            state.isLoggedIn = false;
            state.token = null;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export const userLogin = (form) => async dispatch => {
    try{
        const { data: {id, token} } = await api.login(form);
        if (id && token) {
            dispatch(logIn({ token, id }));
        }
    } catch(e){
        alert(e);
    }
}

export const getFavs = () => async (dispatch, getState) => {
    const { usersReducer: {id} } = getState();
    try {
        const {data} = await api.favs(id);
        dispatch(setFavs(data));
    } catch(e){
        console.warn(e);
    }
};

export const toggleFav = roomId => async (dispatch, getState) => {     // airbnb-api를 보면 togglefavs()에 permission이 있다. user가 필요하고 따라서 로그인이 되어있어야 한다. 그리고 user의 id를 받아야 한다. getState로부터 id, token을 받아올 것임
    const {usersReducer: {id, token}} = getState();                     // id는 user의 id, 인자로 받는 roomId는 room의 id 의미
    try{
        const { status } = await api.toggleFavs(id, roomId, token);
        console.log(status);
    } catch(e) {
        console.warn(e);
    }
};

export default userSlice.reducer;