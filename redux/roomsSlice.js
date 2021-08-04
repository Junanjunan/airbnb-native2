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
            const {
                explore
            } = state;
            const { payload } = action;
            payload.rooms.forEach(payloadRoom => {
                const exists = explore.rooms.find(savedRoom => savedRoom.id === payloadRoom.id);
                if (!exists){
                    explore.rooms.push(payloadRoom);
                }
            });
            state.explore.page = payload.page;
        }
    }
});

const { setExploreRooms } = roomsSlice.actions;
// setExploreRooms는 actionCreator이다. actionCreator는 payload만 넣어주면 action이 된다고 우선 생각하고, toolkit 이용중이기 때문에 이 action에는 payload가 담긴다. payload는 아무거나, 여러개도 가능 아래에서 payload 담아줄것임
export const getRooms = () => async dispatch => {
    try{
        const {data: { results } } = await api.rooms();
        dispatch(setExploreRooms({
            rooms: results,
            page:1
        }))
    } catch(e){

    }
}

export default roomsSlice.reducer;