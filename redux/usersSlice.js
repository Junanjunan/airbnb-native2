import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"users",
    initialState:{
        isLoggedIn: false,
        token: null,
    },
    reducers: {
        logIn(state, action) {              // logIn의 경우도 state를 mutate 하는 것 같은데, redux toolkit의 createSlice를 쓰기 때문에 괜찮은것인가?
            state.isLoggedIn = true;
            state.token = action.payload.token;
        },
        logOut(state, action){
            state.isLoggedIn = false;
            state.token = null;
        }
    }
});

export const {logIn, logOut} = userSlice.actions;

export default userSlice.reducer;