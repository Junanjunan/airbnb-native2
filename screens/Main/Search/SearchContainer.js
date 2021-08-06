import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Keyboard } from "react-native";
import SearchPresenter from "./SearchPresenter";
import api from "../../../api";


export default ({token}) => {
    const navigation = useNavigation();
    const [searching, setSearching] = useState(false);
    const [beds, setBeds] = useState();
    const [bedrooms, setBedrooms] = useState();
    const [bathrooms, setBathrooms] = useState();
    const [maxPrice, setMaxPrice] = useState();
    const [results, setResults] = useState();
    const triggerSearch = async () =>{
        //call the api
        setSearching(true);
        const form = {
            ...(beds && {beds} ),     // (bedts && {beds}) beds가 true이면 {beds} object를 return 한다는 조건부 properties를 추가하는 방법이라 함. ...을 붙였으니 return된 object를 모두 풀어서 나타낸다? {beds}는 {beds:beds}를 줄인 표현인듯 
            ...(bedrooms && {bedrooms}),     // conditional object. ES6 기능
            ...(bathrooms && {bathrooms}),
            ...(maxPrice && {max_price: maxPrice})  // airbnb-api를 보면 우리는 max_price라고 명명해줬기 때문
        };
        try {
            const {data} = await api.search(form, token);    // token은 그냥 아무거나 주었음
            setResults(data);
        } catch(e) {
            console.warn(e);
        } finally {
            Keyboard.dismiss();
            setSearching(false);
        }
    };
    return <SearchPresenter 
    navigation={navigation}
    beds={beds}
    setBeds={setBeds}
    bedrooms={bedrooms}
    setBedrooms={setBedrooms}
    bathrooms={bathrooms}
    setBathrooms={setBathrooms}
    maxPrice={maxPrice}
    setMaxPrice={setMaxPrice}
    searching={searching}
    triggerSearch={triggerSearch}
    results={results}
    />;
}