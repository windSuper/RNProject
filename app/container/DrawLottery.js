import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    WebView,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {LocalDataManager} from '../libs';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class DrawLottery extends Component {
    
    state={
        username:'',
    }

    componentWillMount() {
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            this.setState({username:result.username});
        })
    }

    render(){
        const {navigator} = this.props;
        const {username} = this.state;
        let Url = 'http://slot.tbetag.com/iframe_index.php?account='+username;
        return (
            <View style={styles.container}>
                <SubNav title={'抽奖'} navigator={navigator}/>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={{flex:1,backgroundColor:'black'}}
                    source={{uri:Url}}
                    scalesPageToFit={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    decelerationRate="normal"
                    onShouldStartLoadWithRequest={(e)=>this.onShouldStartLoadWithRequest(e)}
                />
            </View>
            )
    }
    onShouldStartLoadWithRequest(event) {
        return true;
    }
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
    },
})

export default DrawLottery;