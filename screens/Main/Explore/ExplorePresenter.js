import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import RoomCard from "../../../components/Roomcard";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

export default ({rooms}) => {
    return(
        <Container>
            {rooms.length === 0 ? (
                <ActivityIndicator color="black" />
            )
            :
            (
                rooms.map(room => (
                    <RoomCard
                    key={room.id}       // map을 쓸때는 key 값 필수로 있어야 하는 듯
                    name={room.name} 
                    price={room.price}
                    photos={room.photos} 
                    id={room.id} 
                    isFav={room.is_fav}
                    isSuperHost={room.user.superhost}
                    />
                ))
                // rooms.map(room => <Text key={room.id} >{room.name} / {room.price} / {room.id} / {room.is_fav} / {room.user.superhost}</Text>)
            )}
        </Container>
    );
};