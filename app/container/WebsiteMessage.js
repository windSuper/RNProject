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
import {LocalDataManager,HttpRequest,ToastShort,NoDataPromptView} from '../libs';
import {WebsiteDetailMessage} from './';
import {LoadingAction,NOLoadingAction} from '../action/LoginAction.js'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class WebsiteMessage extends Component {
    
    state={
        listData:[],
        showNoDataView:false,
        unReadIcon:require('../imgs/Website/email_unread.png'),
        iconArr:[require('../imgs/Website/email_icon1.png'),
                 require('../imgs/Website/email_icon2.png'),
                 require('../imgs/Website/email_icon3.png'),
                 require('../imgs/Website/email_icon4.png'),],
    }

    componentWillMount() {
        this._requestWebsiteData();
    }

    _requestWebsiteData(){
        const {dispatch} = this.props;
        var opt={'page':'1','rows':'20','status':''};
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/cms/msg_user_list.do',
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                this.setState({listData:responseData.Data.msg_list,showNoDataView:true,})
            },
            (error)=>{
                dispatch(NOLoadingAction());
                ToastShort.show(error);
            },
        )
    }

    render(){
        const {navigator} = this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'站内信'} navigator={navigator}/>
                {this.renderContentView()}
            </View>
            )
    }
    
    renderContentView(){
        const {listData,iconArr,unReadIcon,showNoDataView} = this.state;
        if(listData.length){
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            return <SwipeListView
                    ref={(e)=>this.swipeView=e}
                    dataSource={ds.cloneWithRows(listData)}
                    closeOnRowBeginSwipe={true}
                    disableRightSwipe={true}
                    renderRow={ (data, secId, rowId, rowMap) => (
                        <View style={{marginTop:10}}>
                            <TouchableHighlight onPress={()=>this.selectedRowWebsiteAction(data)}>
                                <View style={styles.rowFront}>
                                    <Image style={styles.icon} source={iconArr[rowId%4]}/>
                                    <View style={styles.title}>
                                        <Text style={styles.generalText}>{data.title}</Text>
                                    </View>
                                    <View style={styles.date}>
                                        <Text style={{color:'#969696',fontSize:12}}>{data.c_date.substring(5,data.c_date.length)}</Text>
                                    </View>
                                    <Image style={styles.arrowImg} source={require('../imgs/Login/list_next.png')}/>
                                </View>
                            </TouchableHighlight>
                                <Image style={styles.unReadIcon} source={(data.u_status==='1'?unReadIcon:null)}/>
                        </View>
                    )}
                    renderHiddenRow={ (data, secId, rowId, rowMap) => (
                        <View style={{marginTop:10}}>
                            <TouchableHighlight onPress={()=>this.deleteRowWebsiteData(data,secId, rowId, rowMap)}>
                                <View style={styles.rowBack}>
                                    <Text style={styles.generalText}>删除</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    )}
                    rightOpenValue={-70}
                />
        }else{
            return showNoDataView ? <NoDataPromptView title={'暂无站内信'}/> : null;
        }
    }

    selectedRowWebsiteAction(data){
        const {navigator} = this.props;
        navigator.push({component:WebsiteDetailMessage,passProps:{'data':data}})
    }

    deleteRowWebsiteData(date,secId, rowId, rowMap){
        const {dispatch} = this.props;
        var opt={'msg_edit':date.u_id+'_3'};
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/cms/msg_user_edit.do',
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                rowMap[`${secId}${rowId}`].closeRow()
                const {listData} = this.state;
                const newData = listData;
                newData.splice(rowId, 1);
                this.setState({listData: newData});
            },
            (error)=>{
                dispatch(NOLoadingAction());
                ToastShort.show(error);
            },
        )

    }
}

var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    rowFront: {
		height: 40,width:k_Screen_Width,alignItems: 'center',flexDirection: 'row',backgroundColor: '#191919',
	},
	rowBack: {
		width:70,height:40,marginLeft:k_Screen_Width-70,flexDirection: 'row',justifyContent: 'flex-end',paddingRight: 15,alignItems: 'center',backgroundColor: 'red',
    },
    generalText:{
        color:'white',fontSize:14,
    },
    icon:{
        width:20,height:20,marginLeft:12,zIndex:-1,
    },
    unReadIcon:{
        position:'absolute',width:8,height:8,marginTop:6,marginLeft:28,
    },
    title:{
        width:k_Screen_Width-180,height:20,marginLeft:10,justifyContent:'center'
    },
    date:{
        width:100,height:20,marginLeft:10,justifyContent:'center'
    },
    arrowImg:{
        width:10,height:15,marginLeft:6,
    },

})

export default connect()(WebsiteMessage);