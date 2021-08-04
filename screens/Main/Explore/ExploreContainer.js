import React, { useEffect } from "react";
import ExplorePresenter from "./ExplorePresenter";

export default ({ getRooms, rooms, page }) => {  // { getRooms }: 넘어온 object data 중에서 getRooms에 할당되어 있는 값을 의미
    useEffect(() => {
        getRooms();                 // useEffect가 실행해야 할 값을 첫 인자로 받는다(대표적으로 function)고 아는데 {} 묶여서 getRooms()를 받는가...? 그냥 getRooms는 mapDispatchToProps를 통해 넘어온 getRooms: ()=> dispatch(getRooms) 일텐데, getRooms()가 무엇을 가르키는지, 또는 return 하는지 정확히 파악 필요
    }, []);                         // , [] 없어도 똑같지 않나...?
    // console.log(getRooms);      // getRooms가 무엇인지 출력: getRooms가 함수라는 것이 출력 [Function getRooms]
    // console.log(getRooms());    // getRooms 함수를 실행한 값 출력 Promise {"_U": 0, "_V": 0, "_W": null, "_X": null} 출력
    return <ExplorePresenter rooms={rooms} />;
}