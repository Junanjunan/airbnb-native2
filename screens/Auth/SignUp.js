import React, { useState } from "react";
import {StatusBar, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import styled from "styled-components/native";
import api from "../../api";
import Btn from "../../components/Auth/Btn";
import Input from "../../components/Auth/Input";
import DismissKeyboard from "../../components/DismissKeyboard";
import { isEmail } from "../../utils";

const Container = styled.View`
    flex:1 ;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View`
    margin-bottom: 30px;
`;

export default ({ navigation: { navigate } }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const isFormValid = () => {
        if (
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            password === ""
        ) {
            alert("All fields are required.");
            return false;
        };
        if (!isEmail(email)) {
            alert("Please add a valid email.");
            return false;
        };
        return true;
    };
    const handleSubmit = async() => {
        if (!isFormValid()){
            return;
        };
        setLoading(true);
        try {
            const { status } = api.createAccount({
                first_name: firstName,
                last_name: lastName,
                email,
                username: email,
                password
            });
            if(status === 201){
                alert("Account created. Sign in please.");
                navigate("SignIn", { email, password });        // SignIn에 email, passwod를 보내자
            }
        } catch(e){
            console.warn(e);
        } finally {
            setLoading(false);
        }
    };
    const dismissKeyboard = () => Keyboard.dismiss();
    return(
        <DismissKeyboard>
            <Container>
                <StatusBar barStyle="light-content" />
                    <KeyboardAvoidingView>
                    <InputContainer>
                        <Input 
                            value={firstName} 
                            placeholder="First name" 
                            autoCapitalize="words" 
                            stateFn={setFirstName}
                        />
                        <Input 
                            value={lastName} 
                            placeholder="Last name" 
                            autoCapitalize="words" 
                            stateFn={setLastName}
                        />
                        <Input
                            keyboardType={"email-address"}
                            value={email} 
                            placeholder="Email" 
                            autoCapitalize="none" 
                            stateFn={setEmail}
                        />
                        <Input 
                            value={password} 
                            placeholder="Password" 
                            stateFn={setPassword}    
                        />
                    </InputContainer>
                    <Btn loading={loading} text={"Sign Up"} accent onPress={handleSubmit} />
                    </KeyboardAvoidingView>
            </Container>
        </DismissKeyboard>
    );
};