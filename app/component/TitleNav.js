import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableHighlight,
}from 'react-native';
var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class TitleNav extends Component {

    
    state={
        title:'',
    }

    render() {
        return (
            <View style={styles.navStyle}>
                <Text style={styles.navTitleStyle}>{this.props.title}</Text>
                <View style={styles.lineStyle}></View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    navStyle:{
        height:64,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    navTitleStyle:{
        marginTop:32,
        height:20,
        width:k_Screen_Width,
        textAlign:'center',
        color:'white',
        fontSize:16,
    },
    lineStyle:{
        marginTop:11.5,
        height:0.5,
        width:k_Screen_Width,
        backgroundColor:'#1c1c1c',
    },
});
export default TitleNav;