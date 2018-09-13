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
import {SubmitBindPersonInfo} from './';
import {LocalDataManager,HttpRequest} from '../libs';
import {LoadingAction,NOLoadingAction} from '../action/LoginAction.js'
import {UserInfoRequestAction} from '../action/UserAction.js'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class BindPersonInfo extends Component {
    
    state={
        defaultTel:'',
        defaultEmail:'',
        tel:'',
        email:'',
        trueName:'',
    }

    componentWillMount() {
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            this.setState({
                defaultTel:result.telephone,
                defaultEmail:result.email,
            })
        })
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
        switch(title){
            case '绑定真实姓名':
                return this.renderTrueNameView()
            break;
            case '绑定手机':
                return this.renderPhoneOrEmailView()
            case '绑定邮箱':
                return this.renderPhoneOrEmailView()
            break;
        }
    }

    renderTrueNameView(){
        return <View style={{flex:1}}>
                <View style={styles.bgView}>
                    <TextInput style={styles.textInputStyle}
                            placeholder={'请输入您要绑定的信息'}
                            placeholderTextColor={'#969696'}
                            onChangeText={(value)=>{this.setState({trueName:value})}}/>
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

    renderPhoneOrEmailView(){
        const{defaultTel,defaultEmail,tel,email}=this.state;
        const{type}=this.props;
        let value=(type==='phone'?defaultTel:defaultEmail);
        return <View style={{flex:1}}>
                <View style={styles.bgView}>
                    <TextInput style={[styles.textInputStyle]}
                            placeholder={'请输入您要绑定的信息'}
                            defaultValue={value}
                            placeholderTextColor={'#969696'}
                            onChangeText={(value)=>this.setBindText(value)}/>
                </View>
                <View style={{marginTop:35}}>
                    <TouchableHighlight onPress={()=>this.nextBtnAction()}>
                        <View style={styles.btnStyle}>
                            <Text style={{fontSize:16}}>下一步</Text>
                        </View>
                    </TouchableHighlight>
                </View>
        </View>
    }
    setBindText(value){
        const{type}=this.props;
        type==='phone'?this.setState({tel:value}):this.setState({email:value})
    }

    bindBtnAction(){
        const{trueName}=this.state;
        const{navigator}=this.props;
        if(trueName.length){
            var opt={'real':trueName}
            dispatch(LoadingAction());
            HttpRequest.requestDataWithParams(
                '/user/real_name.do',
                opt,
                (responseData)=>{
                    dispatch(NOLoadingAction());
                    dispatch(UserInfoRequestAction());
                    navigator.pop()
                },
                (error)=>{
                    dispatch(NOLoadingAction());
                    ToastShort.show(error);
                },
            )
        }
    }

    nextBtnAction(){
        const{type,navigator}=this.props;
        const{defaultTel,defaultEmail,tel,email}=this.state;
        if(type==='phone'){
            let isRight = tel.length>0?this.vertifyPhoneFormat():true;
            let content = tel===defaultTel?'':tel;
            navigator.push({component:SubmitBindPersonInfo,passProps:{'title':'绑定手机验证','type':type,'content':content}})
            
        }else{
            let isRight = email.length>0?this.vertifyEmailFormat():true;
            let content = email===defaultEmail?'':email;
            navigator.push({component:SubmitBindPersonInfo,passProps:{'title':'绑定邮箱验证','type':type,'content':content}})
        }
    }

    vertifyPhoneFormat(){
        const{defaultTel,tel}=this.state;
        if(defaultTel===tel){this.setState({tel:''}); return true}
        var reg = new RegExp('^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$');
        let result = reg.test(tel);
        return result;
    }

    vertifyEmailFormat(){
        const{defaultEmail,email}=this.state;
        if(defaultEmail===email){this.setState({email:''}); return true}
        var reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$');
        let result = reg.test(email);
        return result;
    }
    
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    bgView:{
        height:40,width:k_Screen_Width,marginBottom:15,marginTop:20,backgroundColor:'#191919',flexDirection:'row',alignItems:'center',
    },
    textInputStyle:{
        width:k_Screen_Width-24,height:30,marginLeft:12,color:'white',fontSize:14,
    },
    btnStyle:{
        width:k_Screen_Width-40,height:30,backgroundColor:'#d3a14a',marginLeft:20,justifyContent:'center',alignItems:'center',borderRadius:3,
    }
})


export default connect()(BindPersonInfo);