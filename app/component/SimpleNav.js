import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableHighlight,
}from 'react-native';
var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class SimpleNav extends Component {

    backAction(){

        const{navigator}=this.props;
        if(navigator){
            navigator.pop();
        }
    }

    render() {
        return (
            <View style={styles.navStyle}>
                <View style={[styles.backBtn,{marginTop:20,marginLeft:10,}]}>
                    <TouchableHighlight onPress={()=>this.backAction()}>
                        <View style={styles.backBtn}>
                            <Text style={{color:'#d3a141',fontSize:14}}>取消</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.title}>
                    <Text style={{color:'#d3a141',fontSize:18}}>{this.props.title}</Text>
                </View>
            </View>
        );
    }
}
var styles = StyleSheet.create({
    navStyle:{
        height:120,
        width:k_Screen_Width,
        backgroundColor:'transparent',
    },
    backBtn:{
        height:30,width:50,justifyContent:'center',
    },
    title:{
        height:20,width:200,justifyContent:'center',alignItems:'center',marginTop:20,marginLeft:(k_Screen_Width-200)/2
    },
});
export default SimpleNav;