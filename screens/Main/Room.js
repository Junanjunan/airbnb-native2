import React, { useEffect } from "react";
import styled from "styled-components/native";
import RoomPhotos from "../../components/RoomPhotos";

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const Text = styled.Text``;

export default ({ route: { params }, navigation}) => {   // Room.js를 MainNavigator 안에 있는 screen으로 해줬기 때문에 route prop을 그냥 가져올 수 있다.
    useEffect(() => {
        navigation.setOptions({ title: params.name });
    }, []);
    return (
        <Container>
            <RoomPhotos photos={params.photos} />
        </Container>
    );
}