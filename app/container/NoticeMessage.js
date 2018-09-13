import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    FlatList,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {LocalDataManager,HttpRequest,ToastShort} from '../libs';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class NoticeMessage extends Component {
    

    state={
        noticeData:[],
    }

    componentWillMount() {
        this._requestWebsiteData();
    }

    _requestWebsiteData(){
        const {dispatch} = this.props;
        HttpRequest.requestData(
            '/public/notice.do',
            (responseData)=>{
                this.setState({noticeData:responseData.Data.notice})
            },
            (error)=>{
                ToastShort.show(error);
            },
        )
        
    }

    render(){
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'站内信详情'} navigator={navigator}/>
                <FlatList style={{flex:1}} automaticallyAdjustContentInsets={false}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                data={this.state.noticeData}
                ListHeaderComponent={this.listHeaderComponent}
                />
                
            </View>
            )
    }
    keyExtractor=(item,index)=>{
        return item.key?item.key:index;
    }
    
    renderItem=(item)=>{
        return <View key={item.index} style={{flex:1,marginBottom:15}}>
            <View style={styles.detailContent} >
                <View style={styles.titleView}>
                    <View style={styles.title}>
                        <Text style={[styles.generalText,{color:'#d3a14a'}]}>【{item.item.title}】</Text>
                    </View>
                    <View style={styles.date}>
                        <Text style={[styles.pholderText]}>{item.item.c_date}</Text>
                    </View>
                </View>
                <Text style={styles.content}>{item.item.content}</Text>
            </View>
        </View>
    }

    listHeaderComponent=()=>{
        return <View style={styles.dateView}>
            <View style={styles.date}>
                <Text style={styles.pholderText}>最近消息通知</Text>
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
        height:120,width:k_Screen_Width-24,marginLeft:12,backgroundColor:'#191919'
    },
    titleView:{
        height:30,width:k_Screen_Width,flexDirection:'row',alignItems:'center',
    },
    title:{
        width:k_Screen_Width-180,height:20,marginLeft:10,marginTop:10,justifyContent:'center',backgroundColor:'transparent'
    },
    content:{
        width:k_Screen_Width-44,height:80,marginLeft:10,marginTop:5,color:'white',fontSize:12,lineHeight:20,backgroundColor:'transparent'
    },
    generalText:{
        color:'white',fontSize:14,
    },
    pholderText:{
        color:'#6b6b6b',fontSize:12,
    },

})

export default connect()(NoticeMessage);