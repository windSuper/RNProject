import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
}from 'react-native';

import { connect } from 'react-redux';
import {NoticeMessageRequestAction} from '../action/HomeAction.js'
import { NoticeMessage } from '../container';
var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/414;

var containerHeight = 210;


class HomeGameType extends Component {

    static defaultProps={
        noticeData:null,
        selectedTypeCallBack:null,
        selectedTypeAndIndexCallBack:null,
    }
    state={selectGameType:0}
    componentWillMount(){
        this.props.dispatch(NoticeMessageRequestAction());
    }
    _noticeAction(){
        this.props.navigator.push({component:NoticeMessage})
    }
    _selectedTypeIndex(index){
        this.setState({selectGameType:index});
        this.props.selectedTypeCallBack&&this.props.selectedTypeCallBack(index);
    }
    _selectedItemIndex(index){
        this.props.selectedTypeAndIndexCallBack&&this.props.selectedTypeAndIndexCallBack(this.state.selectGameType,index);
    }
    _initContent(){
        let index = this.state.selectGameType;
        var contentes=[];
        var titleArr = [];
        var imgArr = [];
        if(index){//平台
            imgArr=[require('../imgs/Home/home_bth_game_mg.png'),require('../imgs/Home/home_bth_game_pt.png'),
                    require('../imgs/Home/home_bth_game_ttg.png'),require('../imgs/Home/home_bth_game_gg.png'),
                    require('../imgs/Home/home_bth_game_gpi.png'),require('../imgs/Home/home_bth_game_tgp.png'),
                    require('../imgs/Home/home_bth_game_ag.png'),require('../imgs/Home/home_bth_game_bbin.png'),];
            titleArr = ["平台1","平台2","平台3","平台4","平台5","平台6","平台7","平台8"];
            imgArr.map((item,index)=>{
                contentes.push(
                    <GameTypeItem key={index} index={index} imgUrl={item} title={titleArr[index]} 
                    selectItemIndexCallback={(index)=>this._selectedItemIndex(index)}/>
                )
            })

        }else{//分类
            imgArr=[require('../imgs/Home/home_bth_game_slotmachines.png'),
                    require('../imgs/Home/home_bth_game_live.png'),
                    require('../imgs/Home/home_bth_game_football.png'),
                    require('../imgs/Home/home_bth_game_caipao.png')];
            titleArr = ["游戏1","游戏2","游戏3","游戏4"];
            imgArr.map((item,index)=>{
                contentes.push(
                    <GameTypeItem key={index} index={index} imgUrl={item} title={titleArr[index]} 
                    selectItemIndexCallback={(index)=>this._selectedItemIndex(index)}/>
                )
            })
        }
        return contentes;
    }
    render() {
        const{noticeData}=this.props;
        var noticeText='';
        noticeData.map((item,index)=>{
            index<1 ? noticeText = item.content : noticeText = noticeText+noticeData[1].content;
        })
        var contentes = this._initContent();
        //类型切换
        containerHeight = this.state.selectGameType ? 300 : 200 ;
        var typeStyle1=this.state.selectGameType ? styles.typeNormalStyle : styles.typeSelectedStyle;
        var typeStyle2=this.state.selectGameType ? styles.typeSelectedStyle : styles.typeNormalStyle;
        var bgColor1=this.state.selectGameType ? 'transparent' : '#d3a14a';
        var bgColor2=this.state.selectGameType ? '#d3a14a' : 'transparent';
        return (
            <View style={[styles.container,{height:containerHeight}]}>
                <TouchableHighlight activeOpacity={0.5}
                underlayColor={'transparent'} onPress={()=>this._noticeAction()}>
                    <View style={styles.noticeContainer}>
                        <Image source={require('../imgs/Home/home_icon_notice.png')} style={styles.noticeImageStyle}/>
                        <View style={styles.noticeTitleStyle}>
                            <Text style={{color:'#d3a14a',fontSize:14,}}> 最新公告:</Text>
                        </View>
                        <View style={styles.noticeContentStyle}>
                            <Text style={{color:'#d3a14a',fontSize:12,}}
                            numberOfLines={1}
                            >{noticeText}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <View style={styles.typeBtnContainer}>
                    <TouchableHighlight style={{flex:1}} activeOpacity={0.5}
                    underlayColor={'transparent'} onPress={this._selectedTypeIndex.bind(this,0)}>
                        <View style={[styles.gameTypeStyle,{backgroundColor:bgColor1}]}>
                            <Text style={typeStyle1}>游戏类型</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight style={{flex:1}} activeOpacity={0.5}
                    underlayColor={'transparent'} onPress={this._selectedTypeIndex.bind(this,1)}>
                        <View style={[styles.gameTypeStyle,{backgroundColor:bgColor2}]}>
                            <Text style={typeStyle2}>热门平台</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.contentContainer,{height:containerHeight-100}]}>
                    {contentes}
                </View>
            </View>           
        )
    }
}


export class GameTypeItem extends Component{

    static defaultProps={
        imgUrl:'',
        title:'',
        index:0,
        selectItemIndexCallback:null,
    }
    render(){
        const {imgUrl,title,index} = this.props;
        return(
            <TouchableHighlight activeOpacity={0.5}
                underlayColor={'transparent'} onPress={()=>this.props.selectItemIndexCallback(index)}>
                <View style={styles.itemContainer}>
                    <Image source={imgUrl} style={styles.itemImgStyle}/>
                    <Text style={styles.itemTitleStyle}>{title}</Text>
                </View>
            </TouchableHighlight>
        )
    }

}

var styles = StyleSheet.create({
    container:{
        width:k_Screen_Width-24,height:containerHeight,flexDirection:'column',marginLeft:12,backgroundColor:'#0c0c0c',
    },
    noticeContainer:{
        width:k_Screen_Width-24,height:40,flexDirection:'row',alignItems:'center',        
    },
    noticeImageStyle:{
        width:20,height:20,marginLeft:10,
    },
    noticeTitleStyle:{
        width:70,height:20,marginLeft:5,justifyContent:'center',alignItems:'center',
    },
    noticeContentStyle:{
        width:k_Screen_Width-154,height:20,marginLeft:5,justifyContent:'center',alignItems:'center',
    },
    typeBtnContainer:{
        width:k_Screen_Width>320?k_Screen_Width-44:k_Screen_Width-24,
        height:40,flexDirection:'row',marginTop:5,
        marginLeft:k_Screen_Width>320 ? 10 : 0,
        borderRadius:5,borderWidth:1,borderColor:'#d3a14a',
    },
    gameTypeStyle:{
        flex:1,justifyContent:'center',alignItems:'center',
    },
    typeNormalStyle:{
        fontSize:15,fontWeight:'bold',color:'white'
    },
    typeSelectedStyle:{
        fontSize:15,fontWeight:'bold',backgroundColor:'#d3a14a',
    },
    contentContainer:{
        width:k_Screen_Width>320?k_Screen_Width-44:k_Screen_Width-24,
        height:k_Screen_Height-100,
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:15,
        marginLeft:k_Screen_Width>320 ? 10 : 0,
    },

    itemContainer:{
        width:k_Screen_Width>320?(k_Screen_Width-44)/4:(k_Screen_Width-24)/4,
        height:100,
        justifyContent:'center',
        alignItems:'center',
    },
    itemImgStyle:{
        width:64,
        height:64,
    },
    itemTitleStyle:{
        width:64,
        height:20,
        marginTop:5,
        color:'white',
        fontSize:12,
        textAlign:'center',
    }


})

function select(store){
    return{
        noticeData:store.HomeReduce.noticeData,
    }
}

export default  connect(select)(HomeGameType);