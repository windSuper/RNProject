
'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
    View,
	StyleSheet,
    WebView,
    Dimensions,
} = ReactNative;

var HEADER = '#3b5998';
var BGWASH = 'rgba(255,255,255,0.8)'
var DISABLED_WASH = 'rgba(255,255,255,0.25)'

var TEXT_INPUT_REF = 'urlInput';
var WEBVIEW_REF = 'webview';
var DEFAULT_URL = 'https://chat.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=387948&configID=47009&jid=6484960942&s=1';

import TitleNav from '../component/TitleNav.js';
import Loading from '../libs/Loading.js';
var MePage = React.createClass({
    getInitialState:function(){

        return{
            url:DEFAULT_URL,
            loading:false,
        };
    },
    
    render(){
        console.log("URL="+this.state.url);
        var load = this.state.loading ? <Loading/> :null
        return (
            <View style={{flex:1}}>
                {load}
                <TitleNav title={'在线客服'}/>
                <View style={styles.webView}>
                    <WebView
                        ref={WEBVIEW_REF}
                        automaticallyAdjustContentInsets={false}
                        style={{flex:1}}
                        source={{uri: this.state.url}}
                        javaScriptEnabled={true}
                        domStorageEnabled={true} 
                        decelerationRate="normal"
                        onLoadStart={this.startLoading}
                        onLoadEnd={this.endLoading}
                        onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                    /> 
                </View>
            </View>
    );
  },

  onShouldStartLoadWithRequest: function(event) {
    // Implement any custom loading logic here, don't forget to return!
    return true;
  },

  startLoading() {this.setState({loading:true})},
  endLoading() {this.setState({loading:false})},

});

var styles = StyleSheet.create({
 
  webView: {
    position:'absolute',
    marginTop:64,
    marginBottom:49,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height-64-49,
    backgroundColor: BGWASH,
  },
});

module.exports = MePage;