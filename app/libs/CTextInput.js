import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Text,
    TextInput,
}from 'react-native';

export var inputText;

class CTextInput extends TextInput {

    render(){
        return (
            <TextInput
                {...this.props}
                onChangeText={(value)=>{inputText=value; console.log('inputText',inputText)}}
            />
        )
    }
}

export default CTextInput;