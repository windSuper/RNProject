import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Clipboard,
    TouchableHighlight,
    DeviceEventEmitter,
} from 'react-native';

import {connect} from 'react-redux'
import {HttpRequest,LocalDataManager} from '../libs';
import ToastShort from '../libs/ToastShort.js';
import Orientation from 'react-native-orientation';
import { NOLoadingAction,LoadingAction} from '../action/LoginAction.js';
import WKWebView from 'react-native-wkwebview-reborn';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class PlayGameScene extends PureComponent {

    state={
        width:k_Screen_Width,
        height:k_Screen_Height,
    }

    componentWillMount(){   
       //将视图锁定到Landscape模式
       Orientation.addOrientationListener(this._orientationDidChange);
       
     }
     componentWillUnmount() {
        Orientation.removeOrientationListener(this._orientationDidChange);
     }
     _orientationDidChange=(orientation)=> {
        if(orientation === 'LANDSCAPE'){
          //做一些景观布局 
          this.setState({height:k_Screen_Width,width:k_Screen_Height});
       }else{
        this.setState({height:k_Screen_Height,width:k_Screen_Width});
       }
     }

    render(){
        const{navigator,url}=this.props;
        const{width,height}=this.state;
        console.log('protrait width height',width,height)
        return (
            <View style={{height:height,width:width}}>
                {this.rendWebView()}
                {this.renderBackBtn()}
            </View>
        );
    }

    rendWebView(){
        const{navigator,url}=this.props;
        const{width,height}=this.state;
        return <WKWebView
            style={{height:height,width:width,backgroundColor:'black'}}
            automaticallyAdjustContentInsets={false}
            source={{uri:url}}
            onLoadStart={()=>{this.onLoadStart()}}
            onLoadEnd={()=>{this.onLoadEnd()}}
            />
    }

    renderBackBtn(){
        const{navigator}=this.props;
        return <View style={styles.backBtn}>
            <TouchableHighlight onPress={()=>{navigator.pop()}}>
                <View style={{width:60,height:30,justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                    <Image style={{width:16,height:16}} source={require('../imgs/MyAccount/nav_back_icon.png')}/>
                    <Text style={{color:'#d3a14a',fontSize:14}}>返回</Text>
                </View>
            </TouchableHighlight>
        </View>
    }

    onLoadStart(){
        const{dispatch}=this.props;
        dispatch(LoadingAction());
    }

    onLoadEnd(){
        const{dispatch}=this.props;
        dispatch(NOLoadingAction());
    }

}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0c0c0c'
    },
    backBtn:{
        position:'absolute',marginTop:30,marginLeft:10,width:60,height:30,
    },
})

export default connect()(PlayGameScene);