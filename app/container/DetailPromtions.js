import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    WebView,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';

import { connect } from 'react-redux';

import SubNav from '../component/SubNav.js';
import CookieManager from 'react-native-cookies';
import LocalDataManager from '../libs/LocalDataManager.js';
import NavigationActions from 'react-navigation';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

var Source;
var HostStr;

class DetailPromtions extends Component {

    state={
        source:null,
    }
   
    componentWillMount() {

        
        LocalDataManager.queryLocalDataWithKey('Host',(result)=>{
            HostStr = result+'/ios_activeDom.shtml?';
            const{actID,url,htmlStr}=this.props;
            LocalDataManager.queryLocalDataWithKey('isLogin',(result)=>{
                if(result==='true'){
                    var hostStr = HostStr;
                    CookieManager.getAll()
                    .then((res)=>{
                        let sessionID=res.beegosessionID.value;
                        HostStr = hostStr+'sessionid='+sessionID;
                        HostStr = HostStr+'&class_id='+actID;
                        LocalDataManager.queryLocalDataWithKey('loginDic',(result)=>{
                            let loginDic = result;
                            HostStr = HostStr+'&account='+loginDic.username;
                            if(url.indexOf('http')!==-1){//包含http
                                HostStr = url;
                            }
                            Source={uri:HostStr}
                            this.setState({source:Source})
                        })

                    });
                }else{
                    Source={html:htmlStr}
                    this.setState({source:Source})
                }
            })
        })
    }
    render(){
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'优惠详情'} navigator={navigator}/>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={{flex:1,backgroundColor:'black'}}
                    source={Source}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onLoadStart={()=>this.startLoading}
                    onLoadEnd={()=>this.endLoading}
                    onShouldStartLoadWithRequest={(e)=>this.onShouldStartLoadWithRequest(e)}
                />
            </View>
            )
    }
    onShouldStartLoadWithRequest(event) {
        const{title,navigator}=this.props;
        if(event.url==='about:blank'){
            return true;
        }else if((title.indexOf('天天签到，日日返利')!==-1)&&(event.url.indexOf('ios_activeDom.shtml')===-1)){
            DeviceEventEmitter.emit('tabBarSwitch','1');
            navigator.popToTop();
            return false;
        }else{
            return true;
        }
    }

    _resetRoute(){
        const {routes,navigation} = this.props;
        routes.map((item,index)=>{
            console.log('routes=',item,index);
        })
        let key = routes[1].key;
        navigation.goBack(key);
    }
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
    },
})

function mapStateToProps(store){
    return{
        routes:store.NavReduce.routes,
    }
}


export default connect()(DetailPromtions);