import React, { Component } from 'react';
import{
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    ScrollView,
}from 'react-native';

import { connect } from 'react-redux';
import {HotRecommandRequest} from '../action/HomeAction.js'
import { HiddenLoginModal,NOLoadingAction,LoadingAction,LoginSuccessAction,LoginFailedAction} from '../action/LoginAction.js';

import HttpRequest from '../libs/HttpRequest.js';
import LocalDataManager from '../libs/LocalDataManager.js';
import Loading from '../libs/Loading.js';


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class Login extends Component {
    state={
        loading:false,
        username:'',
        pwd:''
    }    
    //取消登陆
    _cancelAction(){
        const {navigator} = this.props;
        if(navigator){
            navigator.pop();
        }else{
            this.props.dispatch(HiddenLoginModal());
        }
    }

    //进入注册页面
    _registerAction(){

        alert('register');

    }

    //登陆
    _loginAction(username,pwd){
        
        this.props.dispatch(LoadingAction());
        var opt = {'username':username,'password':pwd,'iscaptcha':'1'};
        HttpRequest.requestDataWithParams(
          '/public/login.do',
          opt,
        (responseData)=>{
            LocalDataManager.addLocalData('isLogin','true');
            LocalDataManager.addLocalData('loginDic',opt);
            this._requestUserInfo();
            this.props.dispatch(HotRecommandRequest());
        },(error)=>{
            alert(error);
            this.props.dispatch(NOLoadingAction());
        });
    }
    _requestUserInfo(){
        
        HttpRequest.requestData(
          '/user/info.do',
        (responseData)=>{
            this.props.dispatch(NOLoadingAction());
            LocalDataManager.addLocalData('userInfo',responseData.Data.user_info);
            this.props.dispatch(LoginSuccessAction());
            this._cancelAction();
        },(error)=>{
            this.props.dispatch(NOLoadingAction());
        });
    }

    //找回密码
    _findPwdAction(){

    }
    render() {
        const{loading}=this.props;
        var load = loading ? <Loading/> : null
        return (
            <ScrollView automaticallyAdjustContentInsets={false} style={styles.container} contentContainerStyle={styles.container}>
                {load}
                {/* 容器背景图 */}
                <Image style={{position:'absolute',width:k_Screen_Width,height:k_Screen_Height,zIndex:-1}} source={require('../imgs/Login/changepassword_background.png')} />

                {/* 头部 */}
                <View style={{flex:1}}>
                     {/* 取消登陆按钮 */}
                    <TouchableHighlight style={styles.cancelBtnStyle} activeOpacity={0.8}
                        underlayColor={'transparent'} onPress={this._cancelAction.bind(this)}>
                        <Text style={{color:'#d3a14a',textAlign:'right',fontSize:14,}}>随意查看</Text>
                    </TouchableHighlight>
                    {/* logo图 */}
                    <Image style={styles.logoStyle} source={require('../imgs/Login/login_logo.png')}/>
                    {/* 欢迎语 */}
                    <Text style={styles.welcomeTextStyle}>欢迎来到T博娱乐</Text>
                </View>
                {/* 中部 */}
                <View style={{flex:2,marginTop:40}}>
                    <LoginContent loginBtnAction={(username,pwd)=>this._loginAction(username,pwd)}
                                  registerBtnAction={this._registerAction}
                                  findPwdBtnAction = {this._findPwdAction}/>
                </View>
                
            </ScrollView>
        );
    }
}

export class LoginContent extends Component{
    state={
        username:'',
        pwd:'',
    }
    _usernameValueChange(value){
        this.setState({username:value,})
    }
    _pwdValueChange(value){
        this.setState({pwd:value,})
    }
    render(){
        const{username,pwd}=this.state;
        return(
            <View style={{flexDirection:'column'}}>
            {/* 用户名输入框 */}
                <View style={[styles.textInputContainer,{marginTop:20}]}>
                    <Text style={[styles.textInputPrompt]}>用户名:</Text>
                    <TextInput 
                    style={[styles.textInputStyle]}
                    underlineColorAndroid={'transparent'}
                    placeholder={'请输入您的账户'}
                    placeholderTextColor={'#969696'}
                    blurOnSubmit={true}
                    onChangeText={(value)=>{this._usernameValueChange(value)}}
                    ></TextInput>
                </View>
                <View style={styles.lineStyle}></View>
                {/* 密码输入框 */}
                <View style={[styles.textInputContainer,{marginTop:15}]}>
                    <Text style={styles.textInputPrompt}>登录密码:</Text>
                    <TextInput 
                    style={styles.textInputStyle}
                    underlineColorAndroid={'transparent'}
                    placeholder={'请输入您的登陆密码'} 
                    placeholderTextColor={'#969696'}
                    secureTextEntry={true}
                    blurOnSubmit={true}
                    onChangeText={(value)=>this._pwdValueChange(value)}>
                    </TextInput>
                </View>
                <View style={styles.lineStyle}></View>
                {/* 忘记密码提示 */}
                <TouchableHighlight activeOpacity={0.8}
                    underlayColor={'transparent'} onPress={this.props.findPwdBtnAction}>
                    <Text style={styles.findPwdStyle}>忘记密码？点击找回>>></Text>
                </TouchableHighlight>
                <View style={{flexDirection:'row',marginTop:50,justifyContent:'space-between'}}>
                    {/* 注册按钮 */}
                    <TouchableHighlight activeOpacity={0.5}
                    underlayColor={'transparent'} onPress={this.props.registerBtnAction}>
                        <Text style={styles.registerBtnStyle}>立即注册</Text>
                    </TouchableHighlight>
                    {/* 登陆按钮 */}
                    <TouchableHighlight activeOpacity={0.5}
                    underlayColor={'transparent'} onPress={()=>this.props.loginBtnAction(username,pwd)}>
                        <Text style={styles.loginBtnStyle}>立即登陆</Text>
                    </TouchableHighlight>
                </View>    
            </View>
        )
    }
}


var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black',
        flexDirection:'column',
    },
    cancelBtnStyle:{
        position:'absolute',
        width:70,
        height:30,
        marginTop:30,
        marginLeft:k_Screen_Width-82,
    },
    logoStyle:{
        position:'absolute',
        width:140,
        height:56,
        bottom:30,
        alignSelf:'center',
    },
    welcomeTextStyle:{
        position:'absolute',
        width:200,
        height:20,
        bottom:0,
        alignSelf:'center',
        color:'#d3a14a',textAlign:'center',fontSize:18,
    },
    textInputContainer:{
        padding:0,
        //上面为适配android
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:40,
        width:k_Screen_Width-80,
        height:35,
    },
    textInputStyle:{
        flex:1,
        width:k_Screen_Width-160,
        fontSize:14,
        color:'white',
    },
    textInputPrompt:{
        color:'white',
        width:70,
        fontSize:14,
    },
    lineStyle:{
        marginTop:5,
        marginLeft:40,
        height:0.5,
        backgroundColor:'#d3a14a',
        width:k_Screen_Width-80,
    },
    findPwdStyle:{
        marginTop:15,
        marginLeft:40,
        color:'#d3a14a',
        height:20,
        fontSize:13,
    },
    registerBtnStyle:{
        marginLeft:40,
        height:30,
        width:(k_Screen_Width-120)/2,
        backgroundColor:'transparent',
        color:'#d3a14a',
        fontSize:18,
        paddingTop:5,
        textAlign:'center',
        borderWidth:1,
        borderColor:'#d3a14a',
    },
    loginBtnStyle:{
        marginRight:40,
        height:30,
        width:(k_Screen_Width-120)/2,
        backgroundColor:'#d3a14a',
        color:'black',
        fontSize:18,
        paddingTop:5,
        textAlign:'center',
    }
})
function select(store){

    return{
        loading:store.LoadingReduce.loading,
    }
}

export default connect(select)(Login);