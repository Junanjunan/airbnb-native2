import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useState } from "react";
import { ActivityIndicator, TextInput } from "react-native";
import styled from "styled-components/native";
import api from "../../../api";
import colors from "../../../colors";
import DismissKeyboard from "../../../components/DismissKeyboard";

const Container = styled.View`
`;

const SearchContainer = styled.View`
margin-top: 50px;
flex-direction: row;
padding: 10px 20px;
justify-content: space-between;
align-items: center;
`;

const CancelContainer = styled.TouchableOpacity``;

const CancelText = styled.Text``;

const SearchBar = styled.TextInput`
height: 40px;
width: 85%;
border-radius: 7px;
background-color: white;
border: 1px solid rgba(0, 0, 0, 0.5);
`;

const FiltersContainer = styled.ScrollView`
flex-direction: row;
margin-top: 10px;
`;

const FilterContainer = styled.View`
align-items: center;
margin-right: 15px;
`;

const FilterLabel = styled.Text`
text-transform: uppercase;
font-size: 12px;
margin-bottom: 5px;
font-weight: 500;
`;

const Filter = styled.TextInput`
padding: 10px;
background-color: white;
border-radius: 20px;
box-shadow: 1px 2.5px 2.5px rgba(200, 200, 200, 0.5);
width: 80px;
`;

const SearchBtn = styled.TouchableOpacity`
background-color: ${colors.red};
padding: 10px;
margin: 10px 30px;
border-radius: 10px;
align-items: center;
`;

const SearchText = styled.Text`
color: white;
font-weight: 600;
font-size: 16px;
`;

const ResultsText = styled.Text``;

export default () => {
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
            const {data} = await api.search(form, "nn");    // token은 그냥 아무거나 주었음
            setResults(data);
        } catch(e) {
            console.warn(e);
        } finally {
            setSearching(false);
        }
    };
    return (                // React.Children.only expected to receive a single React element child. 라고 뜨면 <Fragment></Fragment> 안 넣어줘서 생기는 오류라고 보면 될 듯
        <DismissKeyboard>
            <>              
            <Container>
                <SearchContainer>
                    <SearchBar autoFocus={true} placeholder="Search by city..." />
                    <CancelContainer onPress={() => navigation.goBack()}>
                        <CancelText>Cancel</CancelText>
                    </CancelContainer>
                </SearchContainer>
                <FiltersContainer
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 20 }}
        >
            <FilterContainer>
                <FilterLabel>Beds</FilterLabel>
                <Filter
                    onChangeText={text => setBeds(text)} 
                    value={beds} 
                    placeholder="0" 
                    keyboardType={"number-pad"} />
            </FilterContainer>
            <FilterContainer>
                <FilterLabel>Bedrooms</FilterLabel>
                <Filter
                    onChangeText={text => setBedrooms(text)} 
                    value={bedrooms} 
                    placeholder="0" 
                    keyboardType={"number-pad"} />
            </FilterContainer>
            <FilterContainer>
                <FilterLabel>Bathrooms</FilterLabel>
                <Filter
                    onChangeText={text => setBathrooms(text)} 
                    value={bathrooms} 
                    placeholder="0" 
                    keyboardType={"number-pad"} />
            </FilterContainer>
            <FilterContainer>
                <FilterLabel>Max. price</FilterLabel>
                <Filter 
                    onChangeText={text => setMaxPrice(text)}
                    value={maxPrice} 
                    placeholder="$0" 
                    keyboardType={"number-pad"} />
            </FilterContainer>
            </FiltersContainer>
            </Container>
            <SearchBtn onPress={searching ? null: triggerSearch}>
                {searching ? <ActivityIndicator color="white"/> : <SearchText>Search</SearchText>}
            </SearchBtn>
            {results ? <ResultsText>We found {results.count} rooms</ResultsText> : null}
            </>
        </DismissKeyboard>
    );
}

// 왜 난 autoFocus가 안되지.. DismissKeyboard도 안먹는다..