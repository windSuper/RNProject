import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    TouchableHighlight,
}from 'react-native';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class SignSuccessView extends Component {

    
    state={

        hiddenSuccessView:null,
        title:'',
    }

    render() {
        return (
            <View style={styles.container} onTouchEnd = {this.props.hiddenSuccessView}>
                <View style={{flex:1,backgroundColor:'black',opacity:0.5,}}>
                </View>
                <TouchableHighlight onPress={this.props.hiddenSuccessView} 
                    activeOpacity={0.5} underlayColor={'transparent'}
                    style={styles.closeBtnStyle}>
                    <Image style={{flex:1}} source={require('../imgs/Sign/signinclose.png')}/>
                </TouchableHighlight>
                <Image style={styles.successViewStyle} source={require('../imgs/Sign/signin.png')}/>
                <Text style={styles.titleStyle}>{'恭喜您获得'+this.props.title}</Text>
                <Text style={styles.promptStyle}>连续签到更多惊喜呦!</Text>
            </View>
        );
    }
}
var styles = StyleSheet.create({

    container:{
        zIndex:100,
        position:'absolute',
        width:k_Screen_Width,
        height:k_Screen_Height,
        backgroundColor:'transparent'
    },

    closeBtnStyle:{
        position:'absolute',
        width:20,
        height:20,
        left:215+(k_Screen_Width-225)/2,
        top:140,
    },
    successViewStyle:{
        position:'absolute',
        width:225,
        height:216,
        left:(k_Screen_Width-225)/2,
        top:150,
    },
    titleStyle:{
        position:'absolute',
        width:205,
        height:30,
        left:(k_Screen_Width-225)/2+10,
        top:366,
        fontSize:14,
        color:'white',
        backgroundColor:'red',
        textAlign:'center',
        paddingTop:5,
        
    },
    promptStyle:{
        position:'absolute',
        width:205,
        height:15,
        left:(k_Screen_Width-225)/2+10,
        top:406,
        fontSize:12,
        color:'red',
        textAlign:'center',
    },

    
    
});

export default SignSuccessView;