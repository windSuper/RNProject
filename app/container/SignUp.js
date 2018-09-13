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
var k_Scale_Size = Dimensions.get('screen').width/320;

import { _hiddenSuccessViewAction,_signAction,_signUpDaysOfTheMonth } from '../action/SignAction.js';

import { connect } from 'react-redux';
import SignItem from '../component/SignItem.js';
import SignSuccessView from '../component/SignSuccessView.js';
import TitleNav from '../component/TitleNav.js';

var SignUp = React.createClass({
    
    getInitialState(){
        
        return{
            //已经签到天数
            loading:false,
            selectedindex:0,
            showSuccessView:false,
            items:["8元奖金", "0.05%返水", "18元奖金", "0.1%返水", "38元现金", 
                        "28元奖金", "0.15%返水", "38元奖金", "0.2%返水", "投注额5%", 
                        "48元奖金", "0.25%返水", "58元奖金", "0.3%返水", "88元现金", 
                        "68元奖金", "0.35%返水", "78元奖金", "0.4%返水", "投注额10%", 
                        "88元奖金", "0.45%返水", "98元奖金", "0.5%返水", "188元现金",],
        }
    },

    signBtnAction(){
        this.props.dispatch(_signAction());
    },

    componentWillMount() {
      
        this.props.dispatch(_signUpDaysOfTheMonth());
    },

    itemAction(data){
        this.props.dispatch(_signAction());
    },
    hiddenSuccessView(){
        this.props.dispatch(_hiddenSuccessViewAction());
    },
    render() {

        var {selectedindex,showSuccessView}=this.props;

        var  typeImageArr = [require("../imgs/Sign/signin_png_bonus.png"), require("../imgs/Sign/signin_png_fanshui.png"), 
                             require("../imgs/Sign/signin_png_bonus2.png"), require("../imgs/Sign/signin_png_fanshui2.png"),
                             require("../imgs/Sign/signin_png_vipdouble.png")];
         var gifArr = [require("../imgs/Sign/signin_gif_bonus.gif"), require("../imgs/Sign/signin_gif_fanshui.gif"),
                       require("../imgs/Sign/signin_gif_bonus2.gif"), require("../imgs/Sign/signin_gif_fanshui2.gif"), 
                       require("../imgs/Sign/signin_gif_vipdouble.gif")];

        var _this = this;
        var subViews = _this.state.items.map(function(title,i){
            let dayStr = (i+1)+'天';
            if(i<selectedindex){

                return <SignItem
                    key = {i}
                    id  = {i}
                    state = {false}
                    signed = {true}
                    onPressCallback = {(data)=>{_this.itemAction(data)}}
                    bigBGImageSource = {require('../imgs/Sign/signin_background.png')}
                    typeImageSource = {typeImageArr[i%5]}
                    title = {'已签'}
                    dayTitle = {dayStr}
                />
            }
            else if(i===selectedindex){

                return <SignItem
                    key = {i}
                    id  = {i}
                    state = {true}
                    signed = {false}
                    onPressCallback = {(data)=>{_this.itemAction(data)}}
                    bigBGImageSource = {require('../imgs/Sign/signin_backgroundhover.png')}
                    typeImageSource = {gifArr[i%5]}
                    title = {title}
                    dayTitle = {dayStr}
                />
            }else{
                return <SignItem
                    key = {i}
                    id  = {i}
                    state = {false}
                    signed = {false}
                    onPressCallback = {(data)=>{_this.itemAction(data)}}
                    bigBGImageSource = {require('../imgs/Sign/signin_background.png')}
                    typeImageSource = {typeImageArr[i%5]}
                    title = {title}
                    dayTitle = {dayStr}
                />
            }

        });
        var successView = showSuccessView ? 
        <SignSuccessView title={this.state.items[selectedindex-1]}
        hiddenSuccessView = {()=>this.hiddenSuccessView()}/> : null
        return (
            <View style = {{flex:1,backgroundColor:'black'}}>
                {successView}
                <TitleNav title={'签到'}/>
                <ScrollView
                automaticallyAdjustContentInsets={false}
                style={styles.container} 
                contentContainerStyle = {styles.contentStyle}>
                    {subViews}
                    <TouchableHighlight
                        style={styles.signBtnStyle}
                        onPress={this.signBtnAction}
                        activeOpacity={0.5}>
                        <Image source={require('../imgs/Sign/signin_but.png')} style={{flex:1,resizeMode:'contain',}}/>
                    </TouchableHighlight>
                </ScrollView>
            </View>
        );
    }
});

function select(store){
    return{
        selectedindex:store.SignReduce.selectedindex,
        showSuccessView:store.SignReduce.showSuccessView,
    }
}

var styles = StyleSheet.create({

    container: {
        position:'absolute',
        marginTop:64,
        marginBottom:49,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height-64-49,
        backgroundColor:'black',
    },
    contentStyle:{
        height:475*k_Scale_Size,
        width:k_Screen_Width,
        flexDirection:'row',
        flexWrap:'wrap',//内容自动换行
        backgroundColor:'black',
    },

    signBtnStyle:{

        marginTop:40,
        marginLeft:(k_Screen_Width-200)/2,
        width:200,
        height:55,
        marginBottom:40,

    }
});

export default connect(select)(SignUp);
