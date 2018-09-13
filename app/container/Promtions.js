
import React, { Component } from 'react';
import{
    View,
    Text,
    TextInput,
    Image,
    TouchableHighlight,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
}from 'react-native';

import { connect } from 'react-redux';
import { CachedImage } from "react-native-img-cache"


import SubNav from '../component/SubNav.js';
import Loading from '../libs/Loading.js';
import DetailPromtions from './DetailPromtions.js';

import {PromtionsClassTitleRequestAction,PromtionsListRequestAction} from '../action/HomeAction.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class Promtions extends Component{
    
    static defaultProps={
        loading:false,
        classTitleArr:[],
        listDataArr:[],
    }

    state={
        currentSeletedIndex:0,
        listData:[],
    }

    componentWillMount() {
        const {dispatch} = this.props;
        dispatch(PromtionsClassTitleRequestAction());
        dispatch(PromtionsListRequestAction());
    }
    componentDidMount() {
        const {listDataArr} = this.props;
        this.setState({listData:listDataArr});
    }
    // 布局头部分类
    _renderClassHeadTitle(classTitleArr){
        var views = [];
        var norImgArr = [require('../imgs/Promotion/preferential_tab_all.png'),require('../imgs/Promotion/preferential_tab_live.png'),
                         require('../imgs/Promotion/preferential_tab_sports.png'),require('../imgs/Promotion/preferential_tab_slot.png'),
                         require('../imgs/Promotion/preferential_tab_lottery.png'),require('../imgs/Promotion/preferential_tab_vip.png'),
                         require('../imgs/Promotion/preferential_tab_send.png'),require('../imgs/Promotion/preferential_tab_other.png'),
                         require('../imgs/Promotion/preferential_tab_everyday.png')];
        var seletedImgArr = [require('../imgs/Promotion/preferential_tab_all_hover.png'),require('../imgs/Promotion/preferential_tab_live_hover.png'),
                         require('../imgs/Promotion/preferential_tab_sports_hover.png'),require('../imgs/Promotion/preferential_tab_slot_hover.png'),
                         require('../imgs/Promotion/preferential_tab_lottery_hover.png'),require('../imgs/Promotion/preferential_tab_vip_hover.png'),
                         require('../imgs/Promotion/preferential_tab_send_hover.png'),require('../imgs/Promotion/preferential_tab_other_hover.png'),
                         require('../imgs/Promotion/preferential_tab_everyday_hover.png')];;
        const{currentSeletedIndex}=this.state;
        classTitleArr.map((item,index)=>{
            if(index===currentSeletedIndex){
                views.push(
                    <HeadTitleItem
                    key={index} 
                    id={index} img={seletedImgArr[index]} 
                    title={item.title}
                    headCilckCallBack={(id)=>this._headCilck(id)}/>
                )
            }else{
                views.push(
                    <HeadTitleItem
                    key={index} 
                    id={index} img={norImgArr[index]} 
                    title={item.title}
                    headCilckCallBack={(id)=>this._headCilck(id)}/>
                ) 
            }  
        });
        return views;
    }

    //点击分类事件
    _headCilck(id){//id 为下标
        const {classTitleArr,listDataArr} = this.props;
        let classID = classTitleArr[id].id;
        var dataArr =[];
        if (classID ==='0'){dataArr=listDataArr}
        else{
            listDataArr.map((item,index)=>{
                if(item.class_id === classID){
                    dataArr.push(item);
                }
            })
        }
        this.setState({listData:dataArr,currentSeletedIndex:id});
        this.headScorll.scrollTo(this._scrollOffset(100,classTitleArr.length,k_Screen_Width,id));
    }

    //计算滑动距离
    _scrollOffset(itemWidth,itemCount,superViewWidth,index){
        let offset={x:0,y:0,animated:'true'};
        let left =  itemWidth*index>superViewWidth/2 ? true : false;
        let right =  itemWidth*(itemCount-index-1)>superViewWidth/2 ? true : false;
        if(left&&right){
            offset = {x:+(itemWidth*index+itemWidth/2)-superViewWidth/2,y:0,animated:'true'};
        }else {//针对最左边，最右边的处理-左右滑动
        
            if (!left && right) {//能看到最左端
                offset = {x:0 ,y: 0,animated:'true'};
            } else {
                offset = {x:itemCount*itemWidth-superViewWidth ,y: 0,animated:'true'};
            }
        }
        return offset;
    }

    //活动列表render
    _renderListItem(item){
        var iconImg;
        let index = item.index;
        if(index===0){iconImg = require('../imgs/Promotion/preferential_newlabel.png')}
        else if(index===1||index===2){
            iconImg = require('../imgs/Promotion/preferential_hotlabel.png')
        }else{
            iconImg = require('../imgs/Promotion/preferential_salelabel.png')
        }
        return <ListItem index={index} data={item} titleIcon={iconImg}
            listItemCilckCallBack={(index)=>this._selectedCellIndex(index)}/>
    }
    _keyExtractorAction(item,index){
        return item.key ? item.key : index;
    }
    // 选中活动下标
    _selectedCellIndex(index){
        const{listData}=this.state;
        const{navigator}=this.props;
        var data = listData[index];
        navigator.push({component:DetailPromtions,passProps:{
            'url':data.url,'actID':data.id,
            'title':data.title,'htmlStr':data.content,
        }});
    }

    //render方法
    render(){
        const {navigator,classTitleArr,listDataArr} = this.props;
        let dataArr = this.state.listData.length ? this.state.listData : listDataArr;
        let scrollWidth = 100 * classTitleArr.length;
        return (
            <View style={styles.container}>
                <SubNav title={'优惠列表'} navigator={navigator}/>
                <ScrollView automaticallyAdjustContentInsets={false} ref={(e)=>this.headScorll=e} contentContainerStyle={[styles.headTitleStyle,{width:scrollWidth}]}
                bounces={false}>
                    {this._renderClassHeadTitle(classTitleArr)}
                </ScrollView>
                <View style={{width:k_Screen_Width,height:k_Screen_Height-114,backgroundColor:'black'}}>
                    <FlatList
                        data = {dataArr}
                        keyExtractor = {(item,index)=>this._keyExtractorAction(item,index)}
                        renderItem={(item,index)=>this._renderListItem(item,index)}
                    />
                </View>

            </View>
            )
    }
}


//头部分类组件
export class HeadTitleItem extends Component{

    static defaultProps={
        img:null,
        title:'',
        id:'',
        headCilckCallBack:null,
    }
    
    render(){
        const{img,id,title,headCilckCallBack}=this.props;
        return(
            <TouchableHighlight activeOpacity={0.8} underlayColor={'transparent'}
            onPress={()=>headCilckCallBack(id)}>
                <View style={styles.headItemStyle}>
                    <Image style={styles.headImageStyle} source={img}/>
                    <Text style={styles.headTextStyle}>{title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

//列表Item组件
export class ListItem extends Component{

    static defaultProps={
        index:0,
        titleIcon:null,
        data:null,
        listItemCilckCallBack:null,
    }
    
    render(){
        const{data,index,titleIcon,listItemCilckCallBack}=this.props;
        data.item.sub_title.length?data.item.sub_title:data.item.title
        return(
            <TouchableHighlight activeOpacity={0.8} underlayColor={'transparent'}
            onPress={()=>listItemCilckCallBack(index)}>
                <View style={styles.listItemStyle}>
                    <View style={styles.listTitleContainerStyle}>
                        {/* new or hot */}
                        <Image style={styles.titleIconStyle} source={titleIcon}/>
                        <View style={styles.titleTextStyle}>
                        {/* title */}
                            <Text style={{color:'#d3a14a',fontSize:12}}>{data.item.title}</Text>
                        </View>
                    </View>
                    {/* bigImage */}
                    <CachedImage style={styles.listPosterStyle} source={{uri:data.item.img3}}/>
                    {/* subtitle */}
                    <View style={styles.listSubTitleStyle}>
                        <Text numberOfLines={1} style={{color:'white',fontSize:12,}}>{data.item.sub_title}</Text>
                    </View>
                    {/* separote line */}
                    <View style={styles.listLineStyle}></View>
                    {/* look deteil */}
                    <View style={styles.listDetailContainerStyle}>
                        <View style={styles.detailTitleStyle}>
                            <Text style={{color:'#d3a14a',fontSize:12}}>点击查看更多</Text>
                        </View>
                        <Image style={styles.detailArrowStyle} source={require('../imgs/Promotion/preferential_icon_more.png')}/>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

var styles = StyleSheet.create({

    listItemStyle:{
        height:220,
        width:k_Screen_Width-24,
        marginLeft:12,
        marginTop:10,
        backgroundColor:'#191919',
    },
    listTitleContainerStyle:{
        flexDirection:'row',
        width:k_Screen_Width-24,
        height:40,
        alignItems:'center',
    },
    titleIconStyle:{
        width:50,
        height:20,
        marginLeft:10,
    },
    titleTextStyle:{
        marginLeft:10,
        height:20,
        width:k_Screen_Width-24-80,
        justifyContent:'center',
    },
    listPosterStyle:{
        height:100,
        width:k_Screen_Width-44,
        marginLeft:10,
    },
    listSubTitleStyle:{
        height:20,
        width:k_Screen_Width-44,
        marginLeft:10,
        marginTop:10,
        justifyContent:'center',

    },
    listLineStyle:{
        height:1,
        width:k_Screen_Width-44,
        marginLeft:10,
        marginTop:10,
        backgroundColor:'#464646'
    },
    listDetailContainerStyle:{
        flexDirection:'row',
        width:k_Screen_Width-24,
        height:40,
        alignItems:'center',
    },
    detailTitleStyle:{
        width:k_Screen_Width-54,
        marginLeft:10,
        height:20,
        justifyContent:'center',

    },
    detailArrowStyle:{
        width:10,
        height:15,
    },

    
  container: {
    width:k_Screen_Width,
    height:k_Screen_Height,
    backgroundColor: 'black',
  },
  headTitleStyle:{
      width:k_Screen_Width,
      height:50,
      marginLeft:12,
      flexDirection:'row',
      alignItems:'center',
  },
  headItemStyle:{
    width:84,
    height:30,
    marginRight:16,
    justifyContent:'center',
    alignItems:'center',
  },
  headTextStyle:{
      color:'white',
      fontSize:14,
  },
  headImageStyle:{
    position:'absolute',
    width:84,
    height:30,
  },

});

function select(store){
    return{
        classTitleArr:store.HomeReduce.promotionClassData,
        listDataArr:store.HomeReduce.promotionListData,
    }
}

export default connect(select)(Promtions);