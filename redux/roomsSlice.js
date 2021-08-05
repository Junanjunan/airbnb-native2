import { createSlice } from "@reduxjs/toolkit";
import api from "../api";

const roomsSlice = createSlice({
    name: "rooms",
    initialState: {
        explore: {
            page: 1,
            rooms: []
        },
        favs: []
    },
    reducers: {
        setExploreRooms(state, action){
            const { payload } = action;
            if (payload.page === 1){
                state.explore.rooms = payload.rooms;
                state.explore.page =1;
            } else{
                state.explore.rooms = [...state.explore.rooms, ...payload.rooms];
            }
        },
        increasePage(state, action){
            state.explore.page += 1;
        },
        setFavs(state, action){
            state.favs = action.payload;
        },
        setFav(state, action){
            const {
                payload: { roomId }
            } = action;
            const room = state.explore.rooms.find(room => room.id === roomId);
            if(room){
                if(room.is_fav){
                    room.is_fav = false;
                    state.favs = state.favs.filter(room => room.id !== roomId);
                } else {
                    room.is_fav = true;
                    // state.favs.push(room);
                    state.favs = [room, ...state.favs]; // 새로 추가되는 순서대로 위에 오도록 한 것
                }
            }
        }
    }
});

export const { setExploreRooms, increasePage, setFavs, setFav } = roomsSlice.actions;
// setExploreRooms는 actionCreator이다. actionCreator는 payload만 넣어주면 action이 된다고 우선 생각하고, toolkit 이용중이기 때문에 이 action에는 payload가 담긴다. payload는 아무거나, 여러개도 가능 아래에서 payload 담아줄것임
export const getRooms = (page) => async (dispatch, getState) => {
    const {usersReducer: {token}} = getState();
    try{
        const {data: { results } } = await api.rooms(page, token);
        dispatch(setExploreRooms({
            rooms: results,
            page
        }))
    } catch(e){
        console.warn(e);
    }
}

export default roomsSlice.reducer;