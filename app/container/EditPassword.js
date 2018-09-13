import React, { PureComponent } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
    ScrollView,
    Alert,
}from 'react-native';

import {connect} from 'react-redux'
import {SimpleNav} from '../component';
import {LocalDataManager,TimeDownBtn,ToastShort,HttpRequest} from '../libs';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';
import {MyAccount} from '../container'
import {LogoutAction,LoadingAction,NOLoadingAction} from '../action/LoginAction.js'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

var surePwdText='',checkCode='',pwdText='';

class EditPassword extends PureComponent {

    state={
        secretPwd:true,
        secretSurePwd:true,
        menuTitle:'',
        menuTitleArr:[],
    }

    componentWillMount() {
        var titleArr=[];
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            if(parseInt(result.bind_tel)){
                titleArr.push('短信验证');
            }
            if(parseInt(result.bind_mail)){
                titleArr.push('邮箱验证');
            }
            if(parseInt(result.bind_secret)){
                titleArr.push('谷歌验证');
            }
            this.setState({menuTitleArr:titleArr});
         });
    }

    render(){
        console.log('render')
        const {navigator} = this.props;
        const {secretPwd,secretSurePwd,menuTitle} = this.state;
        pwdImg = secretPwd ? require('../imgs/Login/changepassword_closeeye.png') : require('../imgs/Login/changepassword_eye.png');
        surePwdImg = secretSurePwd ? require('../imgs/Login/changepassword_closeeye.png') : require('../imgs/Login/changepassword_eye.png');
        return (
            <MenuContext style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    <SimpleNav navigator={navigator} title={'修改密码'} />
                    {/* 容器背景图 */}
                    <Image style={{position:'absolute',width:k_Screen_Width,height:k_Screen_Height,zIndex:-1}} source={require('../imgs/Login/changepassword_background.png')} />
                    <View style={styles.bgView}>
                        {this._renderMenuView()}
                        <Image style={{width:10,height:15}} source={require('../imgs/Login/list_next.png')}/>
                    </View>
                    <View style={styles.bgView}>
                        <TextInput 
                            style={[styles.input,{width:k_Screen_Width-104}]}
                            placeholder={'填写验证码'} 
                            placeholderTextColor={'#969696'}
                            onChangeText={(text)=>{checkCode=text}}
                        />
                        <TimeDownBtn
                            onClick={(shouldStartCountDown)=>{
                                this.getCheckCode(shouldStartCountDown)
                            }}
                        />
                    </View>
                    <View style={styles.bgView}>
                        <TextInput 
                            style={styles.input}
                            placeholder={'输入您的新密码'} 
                            placeholderTextColor={'#969696'}
                            secureTextEntry={this.state.secretPwd}
                            onChangeText={(text)=>{pwdText=text}}
                        />
                        <TouchableHighlight onPress={()=>this.sureInputSecretAction(0)}>
                            <Image style={styles.secret} source={pwdImg}/>
                        </TouchableHighlight>
                    </View>
                    <View style={styles.bgView}>
                        <TextInput 
                            style={styles.input}
                            placeholder={'确认您的新密码'} 
                            placeholderTextColor={'#969696'}
                            secureTextEntry={this.state.secretSurePwd}
                            onChangeText={(text)=>{surePwdText=text}}
                        />
                        <TouchableHighlight onPress={()=>this.sureInputSecretAction(1)}>
                            <Image style={styles.secret} source={surePwdImg}/>
                        </TouchableHighlight>
                    </View>
                    <View style={{marginTop:30}}>
                        <TouchableHighlight onPress={()=>this.submitBtnAction()}>
                            <View style={styles.btnStyle}>
                                <Text style={{fontSize:16}}>确认修改</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </MenuContext>
            )
    }

    //menuView
    _renderMenuView(){

        const {menuTitleArr,menuTitle}=this.state;
        let title=menuTitle.length?menuTitle:'请选择一种验证方式';
        if(menuTitleArr.length){
            return <View style={styles.menuView}>
                        <Menu onSelect={(value) => this.menuAction(value)}>
                            <MenuTrigger>
                                <Text style={{fontSize:14,color:'white' }}>{title}</Text>
                            </MenuTrigger>
                            <MenuOptions>
                                {this._renderMenuItem()}
                            </MenuOptions>
                        </Menu>
                    </View>
        }else{
            return <TouchableHighlight onPress={()=>this.alertAction()}>
                <View style={styles.menuView}>
                    <Text style={{fontSize:14,color:'white' }}>{title}</Text>
                </View>
            </TouchableHighlight>
        }

    }
    //菜单视图
    _renderMenuItem(){
        var views=[];
        const {menuTitleArr}=this.state;
        menuTitleArr.map((title,index)=>{
            views.push(
                <MenuOption key={index} value={title}>
                    <Text>{title}</Text>
                </MenuOption>
            )
        })
        return views;
    }

    alertAction(){
        const {navigator} = this.props;
        Alert.alert(
            '提示',
            '您还未绑定手机或邮箱，去我的账户进行绑定？',
            [{text: '取消', onPress: () => console.log('Cancel Pressed!')},
             {text: '确定', onPress: () => {
               navigator.push({component:MyAccount})
             }},
            ],
        )
    }

    //选择修改方式
    menuAction(value){
        this.setState({menuTitle:value})
    }

    //获取验证码
    getCheckCode(shouldStartCountDown){
        const{dispatch}=this.props;
        const{menuTitle}=this.state;
        let type=menuTitle==='邮箱验证'?'1':'2';
        var opt={'code_type':type}
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/user/update_pwd_code.do',
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                shouldStartCountDown(1);
                ToastShort.show('验证码已发送成功');
            },
            (error)=>{
                dispatch(NOLoadingAction());
                ToastShort.show(error);
            },
        )
        
    }

    //显示or隐藏密码
    sureInputSecretAction(index){
        if(index){this.setState({secretSurePwd:!this.state.secretSurePwd})}
        else{this.setState({secretPwd:!this.state.secretPwd})}
    }
    
    //确定修改密码
    submitBtnAction(){
        console.log('pwdText=',pwdText,surePwdText);
        const {menuTitle}=this.state;
        if(!menuTitle.length){
            ToastShort.show('请先选择验证方式!');
            return;
        }
        if(!checkCode.length){
            ToastShort.show('请填写验证码');
            return;
        }
        if(!(pwdText.length&&surePwdText.length)){
            ToastShort.show('请输入您的新密码并确认');
            return;
        }
        if(!(pwdText.length>7&&surePwdText.length>7)){
            ToastShort.show('密码长度需8位或8位以上');
            return;
        }
        
        if(pwdText!==surePwdText){
            ToastShort.show('新密码两次不一致，请重新输入');
            return;
        }
        this.submitNetworkRequestAction();

    }
    submitNetworkRequestAction(){
        const{dispatch,navigator}=this.props;
        const{menuTitle}=this.state;
        let type=menuTitle==='邮箱验证'?'1':'2';
        var opt={'code_type':type,'code_value':checkCode,'pwd_new':pwdText,'pwd_sure':surePwdText}
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/user/update_pwd_update.do',
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                dispatch(LogoutAction());
                navigator.pop();
            },
            (error)=>{
                dispatch(NOLoadingAction());
                ToastShort.show(error);
            },
        )
    }
}



var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height>616?k_Screen_Height:616,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    bgView:{
        height:40,width:k_Screen_Width-20,marginLeft:10,marginBottom:15,backgroundColor:'rgba(43,40,38,0.6)',borderWidth:1,borderColor:'rgba(109,109,109,0.6)',flexDirection:'row',alignItems:'center',
    },
    btnStyle:{
        width:k_Screen_Width-40,height:30,backgroundColor:'#d3a14a',marginLeft:20,justifyContent:'center',alignItems:'center',borderRadius:3,
    },
    input:{
        height:30,width:k_Screen_Width-70,marginLeft:12,fontSize:14,color:'white',
    },
    secretImg:{
        height:24,width:24,marginLeft:2,
    },
    menuView:{
        width:k_Screen_Width-54,height:20,justifyContent:'center',marginLeft:10,
    }
})


export default connect()(EditPassword);