import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/native";
import { userLogin } from "../../../redux/usersSlice";
import utils from "../../../utils";
import SignInPresenter from "./SignInPresenter";

const Container = styled.View`
    flex:1 ;
    justify-content: center;
    align-items: center;
`;

const InputContainer = styled.View`
    margin-bottom: 30px;
`;

export default ({ route: { params }}) => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState(params?.email || "jjj1305@hanmail.net");
    const [password, setPassword] = useState(params?.password || "123");    
    const isFormValid = () => {
        if (email === "" || password === ""){
            alert("All fields are required.");
            return false;
        }
        if(!utils.isEmail(email)){
            alert("Email is invalid");
            return false;
        }
        return true
    };
    const handleSubmit = () => {
        if (!isFormValid()){
            return;
        }
        dispatch(userLogin({
            username: email,
            password
        }));
    };
    return <SignInPresenter email={email} setEmail={setEmail} password={password} setPassword={setPassword} handleSubmit={handleSubmit} />
};