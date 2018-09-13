import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    ListView,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {LocalDataManager,HttpRequest,ToastShort} from '../libs';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class WebsiteDetailMessage extends Component {
    

    componentWillMount() {
        this._requestWebsiteData();
    }

    _requestWebsiteData(){
        const {dispatch,data} = this.props;
        if(data.u_status==='1'){
            var opt={'msg_edit':data.u_id+'_2'};
            HttpRequest.requestDataWithParams(
                '/cms/msg_user_edit.do',
                opt,
                (responseData)=>{
                },
                (error)=>{
                },
            )
        }
    }

    render(){
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'站内信详情'} navigator={navigator}/>
                {this.renderContentView()}
            </View>
            )
    }
    
    renderContentView(){
        const{data}=this.props;
        return <View style={{flex:1}}>
            <View style={styles.dateView}>
                <View style={styles.date}>
                    <Text style={styles.pholderText}>{data.c_date}</Text>
                </View>
            </View>
            <View style={styles.detailContent} >
                <Image style={styles.icon} source={require('../imgs/Website/email_logo.png')}/>
                <View style={styles.contentView}>
                    <Image style={styles.bgContent} source={require('../imgs/Website/email_input.png')}/>
                    <View style={styles.title}>
                        <Text style={[styles.generalText,{color:'#d3a14a'}]}>{data.title}</Text>
                    </View>
                    <Text style={styles.content}>{data.content}</Text>
                </View>
            </View>
        </View>
    }
}

var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    dateView:{
        height:60,width:k_Screen_Width,justifyContent:'center',alignItems:'center',
    },
    date:{
        height:30,width:140,justifyContent:'center',alignItems:'center',backgroundColor:'#191919'
    },
    detailContent:{
        height:100,width:k_Screen_Width,flexDirection:'row',
    },
    contentView:{
        height:80,width:k_Screen_Width-70,
    },
    bgContent:{
        position:'absolute',height:80,width:k_Screen_Width-70,resizeMode:'stretch',marginTop:10,
    },
    icon:{
        height:40,width:40,marginLeft:12,marginTop:10,
    },
    title:{
        width:k_Screen_Width-114,height:20,marginLeft:22,marginTop:10,justifyContent:'center',backgroundColor:'transparent'
    },
    content:{
        width:k_Screen_Width-114,height:60,marginLeft:22,marginTop:5,color:'#969696',fontSize:12,backgroundColor:'transparent'
    },
    generalText:{
        color:'white',fontSize:14,
    },
    pholderText:{
        color:'#6b6b6b',fontSize:12,
    },

})

export default connect()(WebsiteDetailMessage);