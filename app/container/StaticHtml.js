import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    WebView,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';


import {SubNav} from '../component';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class StaticHtml extends Component {
    componentWillMount() {

    }
    render(){
        const {source,title,navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={title} navigator={navigator}/>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    style={{flex:1,backgroundColor:'black'}}
                    source={source}
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


export default StaticHtml;