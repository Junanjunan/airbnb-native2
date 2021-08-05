import React from "react";
import Pt from "prop-types"
import styled from "styled-components/native";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import utils from "../utils";
import { useDispatch } from "react-redux";
import { toggleFav } from "../redux/usersSlice";

const {width, height} = Dimensions.get("screen");

const Container = styled.View`
width: 100%;
margin-bottom: 50px;
align-items: flex-start;
position: relative;
`;

const Name = styled.Text`
font-size: 18px;
font-weight: 300;
margin-bottom: 7px;
`;

const PriceContainer = styled.View`
flex-direction: row;
`;

const PriceText = styled.Text`
font-size: 16px;
`;

const PriceNumber = styled.Text`
font-weight: 600;
font-size: 16px;
`;

const Superhost = styled.View`
padding: 3px 5px;
border: 1px solid black;
border-radius: 5px;
margin-bottom: 5px;
`;

const SuperHostText = styled.Text`
text-transform: uppercase;
font-weight: 500;
font-size: 10px;
`;

const PhotosContainer = styled.View`
margin-bottom: 10px;
overflow: hidden;
background-color: red;
width: 100%;
height: ${height/4}px;
`;

const SlideImage = styled.Image`
width: 100%;
height: 100%;
`;

const FavButton = styled.View`
background-color: white;
width: 30px;
height: 30px;
border-radius: 15px;
justify-content: center;
align-items: center;
`;

const TOpacity = styled.TouchableOpacity`
position: absolute;
right: 10px;
top: 10px;
z-index: 10;
`;

const RoomCard = ({id, isFav, isSuperHost, photos, name, price}) => {
    const dispatch = useDispatch();
    return (
        <Container>
            <TOpacity onPress={() => dispatch(toggleFav(id))}>
                <FavButton>
                    <Ionicons size={15} name={utils.isAndroid() ? "md-heart-outline" : "ios-hear-empty"} />
                </FavButton>
            </TOpacity>
            <PhotosContainer>
                {photos.length === 0 ? 
                <SlideImage resizeMode="repeat" source={require("../assets/roomDefault.jpg")} />
                :
                <Swiper>
                    {photos.map(photo => (
                        <SlideImage key={photo.id} source={{ uri: photo.file }} />
                    ))}
                </Swiper> 
                }
            </PhotosContainer>
            {isSuperHost ? (<Superhost><SuperHostText>Superhost</SuperHostText></Superhost>) : null}
            <Name>{name}</Name>
            <PriceContainer><PriceNumber>{price}</PriceNumber><PriceText>/night</PriceText></PriceContainer>
        </Container>
    );
}

RoomCard.protoTypes = {
    id: Pt.number.isRequired,
    isFav: Pt.bool.isRequired,
    isSuperHost: Pt.bool.isRequired,
    photos: Pt.arrayOf(
        Pt.shape({
            file: Pt.string
        })
    ),
    name: Pt.string.isRequired,
    price: Pt.number.isRequired
};

export default RoomCard;