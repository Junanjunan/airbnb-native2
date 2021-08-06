import React, { useEffect, useState } from "react";
import ExplorePresenter from "./ExplorePresenter";

export default ({ getRooms, rooms, page, increasePage }) => {   // Navigator로 감쌌으므로 navigation prop을 가진다. navigation을 ExplorePresenter로 보낼 수도 있다. 그러나 너무 많은 prop을 보내지 말고, ExplorePresenter.js에서 useNavigation hook을 이용하자
    useEffect(() => {
        getRooms(1);
    }, []);
    useEffect(() => {
        getRooms(page);
    }, [page]);
    return <ExplorePresenter rooms={rooms} increasePage={increasePage} />;
}