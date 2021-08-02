import React, { useState } from "react";
import {View, Text, StatusBar} from "react-native";
import styled from "styled-components/native";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";

const Container = styled.View`
    flex:1 ;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View`
    margin-bottom: 30px;
`;

export default () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = () => alert(`${username}${password}`);
    return(
        <DismissKeyboard>
        <Container>
            <StatusBar barStyle="light-content" />
            <InputContainer>
                <Input 
                    value={username} 
                    placeholder="Username" 
                    autoCapitalize="none" 
                    stateFn={setUsername}
                />
                <Input 
                    value={password} 
                    placeholder="Password" 
                    stateFn={setPassword}    
                />
            </InputContainer>
            <Btn text={"Sign In"} accent onPress={handleSubmit} />
        </Container>
        </DismissKeyboard>
    );
};