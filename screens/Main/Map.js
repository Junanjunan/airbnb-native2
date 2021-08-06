import React from "react";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";

const {width, height} = Dimensions.get("window");

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const ScrollView = styled.ScrollView`
position:absolute;
bottom: 50px;
`;

const RoomContainer = styled.View`
background-color: transparent;
width: ${width}px;
align-items: center;
`;

const RoomCard = styled.View`
background-color: white;
width: ${width-40}px;
height: 120px;
margin-right: 10px;
margin-left: 10px;
border-radius: 10px;
padding: 0px 20px;
flex-direction: row;
align-items: center;
`;

const RoomPhoto = styled.Image`
width: 80px;
height: 80px;
border-radius: 5px;
margin-right: 10px;
`;

const Column = styled.View`
    width: 70%;
`;

const RoomName = styled.Text`
font-size: 17px;
`;

const RoomPrice = styled.Text`
margin-top: 5px;
font-size: 15px;
`;

const Map = ({ rooms }) => {
    console.log(rooms);
    return(
        <Container>
            <MapView 
                style={StyleSheet.absoluteFill} 
                camera={{
                    center:{
                        latitude: parseFloat(rooms[0].lat),
                        longitude: parseFloat(rooms[0].lng)
                    },
                    altitude: 700,
                    pitch: 0,
                    heading: 0,
                    zoom: 15
                }}    
            />
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                >
                {rooms?.map(room => (
                    <RoomContainer key={room.id}>
                        <RoomCard>
                            <RoomPhoto 
                                source={
                                    room.photos[0]?.file 
                                    ? {uri: room.photos[0].file} 
                                    : require("../../assets/roomDefault.jpg")
                                    } 
                            />
                            <Column>
                                <RoomName>{room.name}</RoomName>
                                <RoomPrice>${room.price}</RoomPrice>
                            </Column>
                        </RoomCard>
                    </RoomContainer>
                ))}
            </ScrollView>
        </Container>
    );
}

function mapStateToProps(state){
    return {rooms: state.roomsReducer.explore.rooms};
}

export default connect(mapStateToProps)(Map);