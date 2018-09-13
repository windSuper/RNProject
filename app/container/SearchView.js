import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TextInput,
    FlatList,
    TouchableHighlight,
    Dimensions,
    DeviceEventEmitter,
    Keyboard,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import { CachedImage } from "react-native-img-cache";
import {LocalDataManager,HttpRequest,ToastShort} from '../libs';
import {PlayGameScene} from './';
import { NOLoadingAction,LoadingAction} from '../action/LoginAction.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

var dismissKeyboard = require('dismissKeyboard');  

var Host='http://www.tbetios1.com';
LocalDataManager.queryLocalDataWithKey('Host',(result)=>{
    if(result){Host=result;}
});

class SearchView extends Component {
    
    state={
        searchText:'',
        gameData:[],
    }
    componentWillUnmount() {
        dismissKeyboard();
    }

    _requestKeyword(text){
        const {dispatch} = this.props;
        var opt = {'plattype':'mobile','gametitle':text};
        HttpRequest.requestDataWithParams(
            '/game/get_list.do',
            opt,
            (responseData)=>{
                this.setState({gameData:responseData.Data.data})
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
               {this.renderNavView()}
            <FlatList style={styles.listStyle}
                data={this.state.gameData}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                automaticallyAdjustContentInsets={false}
                numColumns={4}
                getItemLayout={(data,index)=>(
                    {length: 120, offset: (120) * index, index}
                )}
                />
            </View>
            )
    }
    keyExtractor=(item,index)=>{
        return item.key?item.key:index;
    }
    
    renderItem=(item)=>{
        let imageUrl = (item.item.img_url.indexOf('http')===-1) ? Host+item.item.img_url : item.item.img_url;       
        return <TouchableHighlight onPress={()=>this.requestGameUrl(item.item)}>
            <View style={styles.listItem}>
                <CachedImage style={styles.gameIcon} source={{uri:imageUrl}}/>
                <View style={{justifyContent:'center',width:60,height:30,alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:10}} numberOfLines={1}>{item.item.game_title}</Text>
                </View>
                <View style={{justifyContent:'center',width:60,height:20,alignItems:'center'}}>
                    <Image style={{position:'absolute',width:60,height:20}} source={require('../imgs/Game/egame/game_lost_but.png')}/>
                    <Text style={{color:'white',fontSize:13}} numberOfLines={1}>立即游戏</Text>
                </View>
            </View>
        </TouchableHighlight>
    }

    renderNavView(){
        const{navigator}=this.props;
        return <View style={styles.navView}>
            <View style={styles.rowContainer}>
                <Image
                source={require('../imgs/Home/home_nav_icon_search.png')}
                style={styles.seachImageStyle}
                />
                <View style={{flex:1,marginLeft:5}}>
                    <TextInput style={[styles.generalText,{color:'white'}]}
                    placeholder={'热门搜索:船长的宝藏'}
                    placeholderTextColor={'#d3a14a'}
                    returnKeyType={'search'}
                    onChangeText={(text)=>this.setState({searchText:text})}
                    onSubmitEditing={()=>{this.startSeachAction()}}/>
                </View>
            </View>
            <TouchableHighlight onPress={()=>{navigator.pop()}}>
                <View style={styles.backView}>
                    <Text style={[styles.generalText,{fontSize:16}]}>取消</Text>
                </View>
            </TouchableHighlight>
        </View>
    }

    startSeachAction(){
        dismissKeyboard();
        const{searchText}=this.state;
        this._requestKeyword(searchText);
    }
    
    requestGameUrl(item){
        const {dispatch,navigator} = this.props;
        var opt = {'plat':item.plat_form,'gametype':item.game_type,
                   'gamename':item.game_name,'gameid':item.game_id,
                   'gamekind':item.game_kind,};
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/game/login.do',
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                navigator.push({component:PlayGameScene,passProps:{'url':responseData.Data.login_url}})
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
    navView:{
        width:k_Screen_Width-24,marginLeft:12,height:44,marginTop:20,flexDirection:'row',alignItems:'center',
    },
    rowContainer:{
        width:k_Screen_Width-74,height:30,alignItems:'center',flexDirection:'row',borderWidth:1,borderColor:'#d3a14a',borderRadius:15,
    },
    backView:{
        width:40,height:30,marginLeft:10,justifyContent:'center',alignItems:'center'
    },
    generalText:{
        color:'#d3a14a',fontSize:14,
    },
    seachImageStyle:{
        width:17,height:17,marginLeft:7,
    },
    listStyle:{
        flex:1,backgroundColor:'#0c0c0c'
    },
    listItem:{
        width:60,height:120,alignItems:'center',justifyContent:'center',marginLeft:(k_Screen_Width-240)/5,marginTop:10,
    },
    gameIcon:{
        width:60,height:60,
    },
})

export default connect()(SearchView);