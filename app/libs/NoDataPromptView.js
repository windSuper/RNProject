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

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class NoDataPromptView extends Component {
    
    render(){
        const {title} = this.props;
        return (
            <View style={styles.container}>
                <Image style={{marginLeft:(k_Screen_Width-303)/2,width:303,height:180,marginTop:60}} 
                source={require('../imgs/RecommandFriend/friend_nodata.png')}/>
                <View style={{width:k_Screen_Width-60,marginLeft:30,height:20,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:15}}>{title}</Text>
                </View>
            </View>
            )
    }
    
    renderContentView(){
        const {listData} = this.state;
        
    }
}
var styles = StyleSheet.create({

    container:{
        marginTop:64,
        height:k_Screen_Height-64,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
})

export default NoDataPromptView;