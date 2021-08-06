import React from "react";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";

const Container = styled.View`
margin-top: 10px;
padding: 0px 30px;
`;

const SV = styled.ScrollView``;

const Title = styled.Text`
font-size: 25px;
margin-bottom: 10px;
`;

const NoFavs = styled.Text``;

export default ({rooms}) => (
    <Container>
        <Title>Favourites ({rooms.length}) </Title>
        <SV 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom:5}}
            >{rooms.length !== 0 ? (
                rooms.map(room => (
                    <RoomCard
                        key={room.id}
                        name={room.name} 
                        price={room.price}
                        photos={room.photos} 
                        id={room.id} 
                        isFav={room.is_fav}
                        isSuperHost={room.user.superhost}
                        roomObj={room}
                    />
                )) 
            ) : (
            <NoFavs>You don't have any favourites</NoFavs>
            )}
        </SV>
    </Container>
);