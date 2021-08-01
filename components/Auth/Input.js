import React from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import PropTypes from "prop-types"


const { width } = Dimensions.get("screen")      

const Container = styled.TextInput`
    width: ${width/1.5}px;
`;

const Input = ({value, placeholder, isPassword=false, autoCapitalize, stateFn}) => (
    <Container 
        value={value} 
        placeholder={placeholder} 
        secureTextEntry={isPassword ? true: false} 
        autoCapitalize={autoCapitalize}
        onChangeText = {(text) => stateFn(text)}        // 대체 stateFn이 무엇인가... 대체..
    />
);

Input.propTypes = {
    value: PropTypes.string,
    placeholder: PropTypes.string,
    isPassword: PropTypes.bool,
    autoCapitalize: PropTypes.string,
    stateFn: PropTypes.func.isRequired
}

export default Input;