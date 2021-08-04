import React from "react";
import { ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import RoomCard from "../../../components/RoomCard";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

const FakeBar = styled.View`
height: 40px;
width: 100%;
background-color: white;
margin: 40px 0px 10px 0px;
box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.5);
border-radius: 10px;
justify-content: center;
padding-left: 10px;
`; 

const FakeText = styled.Text`
font-size: 16px;
`;

const LoadMore = styled.View`
width: 100%;
padding: 10px 10px;
align-items: center;
background-color: #006a70;
border-radius: 5px;
margin-bottom: 30px;
`;

const LoadMoreText = styled.Text`
color: white;
font-size: 16px;
font-weight: 500;
`;

export default ({rooms, increasePage}) => {
    return(
        <Container>
            {rooms.length === 0 ? (
                <ActivityIndicator color="black" />
            )
            :
            (
                <>
                <FakeBar>
                    <FakeText>Search..</FakeText>
                </FakeBar>
                <ScrollView
                    showsVerticalScrollIndicator={false} 
                    style={{ width: "100%", marginTop:120 }} 
                    contentContainerStyle={{ paddingHorizontal: 15 }}>
                    {
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
                    }
                    <TouchableOpacity onPress={increasePage}>
                    <LoadMore>
                            <LoadMoreText>Load More</LoadMoreText>
                        </LoadMore>
                    </TouchableOpacity>
                </ScrollView>
                </>
            )}
        </Container>
    );
};