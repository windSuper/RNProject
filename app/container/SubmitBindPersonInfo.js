import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux';
import {SubNav} from '../component';
import {LocalDataManager,HttpRequest,TimeDownBtn,ToastShort} from '../libs';
import {LoadingAction,NOLoadingAction} from '../action/LoginAction.js'
import {UserInfoRequestAction} from '../action/UserAction.js'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class SubmitBindPersonInfo extends Component {
    
    state={
        checkCode:''
    }

    render(){
        const {navigator,title} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={title} navigator={navigator}/>
                {this._renderContentView()}
            </View>
            )
    }

    _renderContentView(){
        const{title}=this.props;
        return <View style={{flex:1,marginTop:20}}>
            <View style={styles.bgView}>
                <TextInput style={[styles.textInputStyle,{width:k_Screen_Width-87}]}
                        placeholder={'请输入验证码'}
                        placeholderTextColor={'#969696'}
                        onChangeText={(value)=>{this.setState({checkCode:value})}}/>
                <TimeDownBtn style={{width:70,height:30,borderRadius:0}}
                    timerTitle={'获取验证码'}
                    onClick={(shouldStartCountDown)=>this.getCheckCode(shouldStartCountDown)
                    }
                />
            </View>
            <View style={{marginTop:35}}>
                <TouchableHighlight onPress={()=>this.bindBtnAction()}>
                    <View style={styles.btnStyle}>
                        <Text style={{fontSize:16}}>提交绑定</Text>
                    </View>
                </TouchableHighlight>
            </View>
    </View>
    }

    //获取验证码
    getCheckCode(shouldStartCountDown){
        const{type,dispatch,content}=this.props;
        var opt=(type==='phone'?{'phone':content}:{'email':content}) 
        var url = (type==='phone'?'/user/phone.do':'/user/email.do')
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            url,
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                shouldStartCountDown(1);
                ToastShort.show('验证码已发生成功');
            },
            (error)=>{
                dispatch(NOLoadingAction());
                ToastShort.show(error);
            },
        )
        
    }

    //提交绑定
    bindBtnAction(){
        const{type,dispatch,navigator}=this.props;
        const{checkCode}=this.state;
        if(checkCode.length>0){
            var opt=(type==='phone'?{'phone_code':checkCode}:{'email_code':checkCode}) 
            var url = (type==='phone'?'/user/phone_verify.do':'/user/email_verify.do')
            dispatch(LoadingAction());
            HttpRequest.requestDataWithParams(
                url,
                opt,
                (responseData)=>{
                    dispatch(NOLoadingAction());
                    dispatch(UserInfoRequestAction());
                    shouldStartCountDown(1);
                    ToastShort.show('绑定成功');
                    navigator.popN(2);
                },
                (error)=>{
                    dispatch(NOLoadingAction());
                    ToastShort.show(error);
                },
            )
        }else{
            ToastShort.show('验证码不能为空');
        }    
    }
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    bgView:{
        height:30,width:k_Screen_Width,marginBottom:15,backgroundColor:'#191919',flexDirection:'row',alignItems:'center',
    },
    textInputStyle:{
        width:k_Screen_Width-24,height:30,marginLeft:12,color:'white',fontSize:14,
    },
    btnStyle:{
        width:k_Screen_Width-40,height:30,backgroundColor:'#d3a14a',marginLeft:20,justifyContent:'center',alignItems:'center',borderRadius:3,
    }
})


export default connect()(SubmitBindPersonInfo);