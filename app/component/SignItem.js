import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
}from 'react-native';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

var SignItem = React.createClass({

    getInitialState(){

        return{
            
            id:'',
            state:'',
            bigBGImageSource:'',
            typeImageSource:'',
            title:'',
            dayTitle:'',
            signed:'',//已经签到标示
            onPressCallback:null,
        }
    },

    clickAction(){

        if(this.props.onPressCallback== null||this.props.state== false) return;
        this.props.onPressCallback(this.props.id);
    
    },

    render(){
        var containerStyle = this.props.signed ? styles.containerSigned : styles.container;
        return(
            <TouchableHighlight 
                onPress={this.clickAction} activeOpacity={0.5}>
                <View style={containerStyle}>
                    {/* 大背景 */}
                    <Image style={{width:53*k_Scale_Size,height:60*k_Scale_Size,position:'absolute'}} source={this.props.bigBGImageSource}/>
                    {/* 类型：奖金，返水图片 */}
                    <Image style={styles.typeImageStyle} source={this.props.typeImageSource}/>
                    {/* 天数标识图片 */}
                    <Image style={styles.dayImageStyle} source={require('../imgs/Sign/signin_png_label.png')}/>
                    {/* 天数文本 */}
                    <Text style={styles.dayTextStyle}>{this.props.dayTitle}</Text>
                    {/* 标题 */}
                    <Text style={styles.titleStyle}>{this.props.title}</Text>
                </View>
            </TouchableHighlight>
        );
    }
});

var styles = StyleSheet.create({

    container:{

        width:53*k_Scale_Size,
        height:60*k_Scale_Size,
        marginLeft:(k_Screen_Width-53*5*k_Scale_Size)/6,
        marginTop:15,
    },
    containerSigned:{
        opacity:0.5,
        width:53*k_Scale_Size,
        height:60*k_Scale_Size,
        marginLeft:(k_Screen_Width-53*5*k_Scale_Size)/6,
        marginTop:15,
    },
    typeImageStyle:{
        marginTop:5*k_Scale_Size,
        marginLeft:6.5*k_Scale_Size,
        width:40*k_Scale_Size,
        height:40*k_Scale_Size,
		resizeMode:'contain',		
    },
    dayImageStyle:{
        
        position:'absolute',
        marginTop:0*k_Scale_Size,
        marginLeft:33*k_Scale_Size,
        width:20*k_Scale_Size,
        height:20*k_Scale_Size,
		resizeMode:'contain',		
    },
    dayTextStyle:{
        position:'absolute',
        marginTop:1*k_Scale_Size,
        marginLeft:30*k_Scale_Size,
        width:25*k_Scale_Size,
        height:20*k_Scale_Size,
        textAlign:'center',
        fontSize:8*k_Scale_Size,
        transform:[{rotateZ:'45deg'}],
        color:'white',
        backgroundColor:'transparent',
    },
    titleStyle:{
        marginTop:2*k_Scale_Size,
        marginLeft:0*k_Scale_Size,
        width:53*k_Scale_Size,
        height:15*k_Scale_Size,
        textAlign:'center',
        fontSize:10*k_Scale_Size,
        color:'white',
    }

});

module.exports = SignItem;