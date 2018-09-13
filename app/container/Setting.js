import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
    ScrollView,
    Linking,
    NativeModules,
    Alert,
}from 'react-native';


import {SubNav} from '../component';
import {LocalDataManager,HttpRequest} from '../libs';
import {StaticHtml} from './';
import {connect} from 'react-redux'
import {NotifySwitchAction,LogoutAction,LoadingAction,NOLoadingAction} from '../action/LoginAction.js'


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class Setting extends Component {

    state={
        cacheSize:'0M',
    }

    loginOutAction(){
        const{dispatch,navigator}=this.props;
        dispatch(LoadingAction());
        HttpRequest.requestData(
            '/user/logout.do',
          (responseData)=>{
            dispatch(NOLoadingAction());
            dispatch(LogoutAction())
            navigator.pop();
          },(error)=>{
            dispatch(NOLoadingAction());
          });
        
    }

    componentWillMount() {
        NativeModules.NativeEvent.getCacheSize().then((size)=>{
            this.setState({cacheSize:size});
        })
    }

    render(){
        const {navigator,notifSwitch} = this.props;
        const {cacheSize} = this.state;
        var notifImg=notifSwitch ? require('../imgs/Set/Setup_icon_on.png') : require('../imgs/Set/Setup_icon_off.png');
        var contentHeight = k_Screen_Height >600 ? k_Screen_Height-64 : 540
        return (
            <View style={styles.container}>
                <SubNav title={'设置'} navigator={navigator}/>
                <ScrollView automaticallyAdjustContentInsets={false} contentContainerStyle={{width:k_Screen_Width,height:contentHeight}}>
                    <View style={styles.listItem}>
                        <Image style={styles.introImg} source={require('../imgs/Set/Setup_icon_remind.png')}/>
                        <View style={styles.moreTitle}>
                            <Text style={styles.textStyle}>消息提示</Text>
                        </View>
                        <TouchableHighlight onPress={()=>{this.switchAction()}}>
                            <Image source={notifImg} style={{width:40,height:25,marginLeft:k_Screen_Width-52-144,resizeMode:'contain',}}/>
                        </TouchableHighlight>
                    </View>
                    <View>
                        <TouchableHighlight onPress={()=>{this.clearCacheAction()}}>
                            <View style={[styles.listItem,{marginBottom:0}]}>
                                <Image style={styles.introImg} source={require('../imgs/Set/Setup_icon_remove.png')}/>
                                <View style={styles.moreTitle}>
                                    <Text style={styles.textStyle}>清除缓存</Text>
                                </View>
                                <View style={styles.cacheText}>
                                    <Text style={styles.textStyle}>{cacheSize}</Text>
                                </View>
                                <Image style={styles.nextimg} source={require('../imgs/Login/list_next.png')}/>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View style={{width:k_Screen_Width,height:30,marginLeft:12,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#969696'}}>简介</Text>
                    </View>
                    <View>
                        {this.renderIntroduceView()}
                    </View>
                    <View style={{width:k_Screen_Width-24,height:30,marginLeft:12,marginTop:-10,justifyContent:'center'}}>
                        <Text style={{fontSize:12,color:'#969696'}}>更多联系方式</Text>
                    </View>
                    <View>
                        {this.renderMoreConnectView()}
                    </View>
                    <View>{this.renderBtnView()}</View>
                </ScrollView>
            </View>
        )
    }

    clearCacheAction(){
        Alert.alert(
            '提示',
            '您确定要清除缓存么，下次进入会重新缓存图片',
            [{text: '取消', onPress: () => console.log('Cancel Pressed!')},
             {text: '确定', onPress: () => {
                NativeModules.NativeEvent.removeCacheSize().then((size)=>{
                    this.setState({cacheSize:size});
                })
             }},
            ],
        )
    }

    switchAction(){
        const{dispatch,notifSwitch}=this.props;
        dispatch(NotifySwitchAction(!notifSwitch))
    }

    renderBtnView(){
        const {isLogin} = this.props;
        if(isLogin){
            return <View style={{marginTop:50}}>
                    <TouchableHighlight onPress={()=>this.loginOutAction()} underlayColor={'transparent'}>
                        <View style={styles.btnStyle}>
                            <Text style={{fontSize:16}}>注销账户</Text>
                        </View>
                    </TouchableHighlight>
                </View>
        }
    }

    renderIntroduceView(){
        var titleArr = ['关于我们','隐私政策','用户协议'];
        var imgArr = [require('../imgs/Set/Setup_icon_about.png'),
                      require('../imgs/Set/Setup_icon_secret.png'),
                      require('../imgs/Set/Setup_icon_agreenment.png'),];
        let views = [];
        titleArr.map((title,index)=>{
            views.push(
                <TouchableHighlight key={index} onPress={()=>{this.introduceItemAction(index)}}>
                    <View style={styles.listItem}>
                        <Image style={styles.introImg} source={imgArr[index]}/>
                        <View style={styles.introTitle}>
                            <Text style={styles.textStyle}>{title}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        })
        return views;
    }

    renderMoreConnectView(){
        var titleArr = ['网站','新浪微博','微信公众号'];
        var contentArr = ['www.baidu.com','@webo123','wechat'];
        let views = [];
        titleArr.map((title,index)=>{
            views.push(
                <TouchableHighlight key={index} onPress={()=>{this.moreItemAction(index)}}>
                    <View style={styles.listItem}>
                        <View style={styles.moreTitle}>
                            <Text style={styles.textStyle}>{title}</Text>
                        </View>
                        <View style={styles.moreContent}>
                            <Text style={styles.textStyle}>{contentArr[index]}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        })
        return views;
     }

     introduceItemAction(index){
        var titleArr = ['关于我们','隐私政策','用户协议'];
        var htmlArr = [require('../about/关于我们.html'),
                      require('../about/隐私政策.html'),
                      require('../about/用户协议.html'),];
         const {navigator}=this.props;
         navigator.push({component:StaticHtml,passProps:{title:titleArr[index],source:htmlArr[index]}});
     }

     moreItemAction(index){
         let url='http://www.tbo98.com';
         if(index===0){
            Linking.openURL(url)  
            .catch((err)=>{  
              console.log('An error occurred', err);  
            });  
         }
         return;
     }
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    listItem:{
        width:k_Screen_Width,height:40,backgroundColor:'#191919',flexDirection:'row',alignItems:'center',marginBottom:10,
    },
    introImg:{
        width:22,height:22,marginLeft:12,
    },
    introTitle:{
        width:k_Screen_Width-56,height:22,marginLeft:10,justifyContent:'center',
    },
    moreTitle:{
        width:100,height:40,justifyContent:'center', marginLeft:12,
    },
    moreContent:{
        width:k_Screen_Width-134,height:40,justifyContent:'center',alignItems:'flex-end', marginLeft:10,
    },
    textStyle:{
        fontSize:14,color:'white',
    },
    cacheText:{
        width:k_Screen_Width-181,height:40,justifyContent:'center',alignItems:'flex-end', marginLeft:10,
    },
    nextimg:{
        width:10,height:15,marginLeft:5,
    },
    btnStyle:{
        width:k_Screen_Width-40,height:30,backgroundColor:'#d3a14a',marginLeft:20,justifyContent:'center',alignItems:'center',borderRadius:3,
    }
})

function mapStateToProps(store){
    return{
        notifSwitch:store.LoginReduce.notifSwitch,
        isLogin:store.LoginReduce.isLogin,
    }
}

export default connect(mapStateToProps)(Setting);