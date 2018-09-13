import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {LocalDataManager} from '../libs';


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class Recharge extends Component {
    
    componentWillMount() {
        const{dispatch}=this.props;
    }

    render(){
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'充值'} navigator={navigator}/>
                
            </View>
            )
    }
    
}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
})

export default connect()(Recharge);