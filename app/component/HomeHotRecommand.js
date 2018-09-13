import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    ScrollView,
}from 'react-native';

import { connect } from 'react-redux';
import CarouselView from '../libs/CarouselView.js';
import { CachedImage } from "react-native-img-cache";
import LocalDataManager from '../libs/LocalDataManager.js';
  

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/414;

var Host='http://www.tbetios1.com';
LocalDataManager.queryLocalDataWithKey('Host',(result)=>{
    if(result){Host=result;}
});

class HomeHotRecommand extends Component {
    static defaultProps={
        hotRecommandData:[],
        hotSelectedCallBack:null,
    }
    state={
        currentPage:0,
    }
    componentWillUnmount() {
        this.timer && clearInterval(this.timer);  
    }
    
    componentDidMount() {
        if(!this.timer){
            console.log('timerstart');
            this._startTimer();
        }
    }

     _startTimer(){  
        let scrollView = this.hotScroll;  
        this.timer = setInterval(  
        ()=>{   
            let imageCount = parseInt(this.props.hotRecommandData.length/3+(this.props.hotRecommandData.length%3>0?1:0));  
            console.log(imageCount);
            //4.1 设置圆点  
            let activePage = 0;  
            //4.2判断  
            if(this.state.currentPage>=imageCount-1){  
                activePage = 0;  
            }else{  
                activePage = this.state.currentPage+1;  
            }  
            //4.3 更新状态机  
            this.setState({currentPage:activePage});  
            //4.4 让scrollview 滚动起来  
            let offsetX = activePage * k_Screen_Width;  
            scrollView.scrollTo({x:offsetX,y:0,animated:true});  
        },  
        3000  
        );  
    }  

    render() {
        const {hotRecommandData}=this.props;
        var itemViews=[];
        hotRecommandData.map((item,index)=>{
            let right = ((index+1)%3===0&&index!==0)?(24):(k_Screen_Width>320?(k_Screen_Width-24-330)/2:(k_Screen_Width-24-270)/2);
            let imageUrl = (item.img_url.indexOf('http')===-1) ? Host+item.img_url : item.img_url;
            itemViews.push(
                <View key={index}>
                    <TouchableHighlight
                        activeOpacity={0.5}
                        underlayColor={'transparent'}
                        onPress={()=>this.props.hotSelectedCallBack(index)}>
                            <View style={[styles.hotItemContainerStyle,{marginRight:right}]}>
                                <Image style={styles.hotItemBGStyle} source={require('../imgs/Home/homeHotBG.png')}/>
                                <Image style={styles.hotIconStyle} source={require('../imgs/Home/home_label_hot.png')}/>
                                <CachedImage style={styles.hotItemImgStyle} source={{uri:imageUrl}}/>
                                <View style={styles.hotItemTextStyle}>
                                    <Text style={{fontSize:14}}>{item.game_title}</Text>
                                </View>
                            </View>
                    </TouchableHighlight>
                </View>
            )
        })
        return (
            <View>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleStyle}>热门推荐</Text>
                    <TouchableHighlight onPress={()=>this.moreHotGameAction()}
                        activeOpacity={0.5}
                        underlayColor={'transparent'}>
                        <Text style={styles.moreTitleStyle}>更多>></Text>
                    </TouchableHighlight>
                </View>
                <View>
                    <ScrollView 
                    ref={(e)=>this.hotScroll=e}
                    contentContainerStyle={[styles.scrollHotContainer,{width:k_Screen_Width*hotRecommandData.length/3}]}
                    alwaysBounceVertical={false}
                    pagingEnabled={true}>
                    {itemViews}
                    </ScrollView>
                </View>
            </View>         
        );
    }

    moreHotGameAction(){
        const{isLogin,navigator}=this.props
        if(isLogin){
            
        }
        else{

        }
    }
}

const styles = StyleSheet.create({

    titleContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor:'#d3a14a',
        height:30,
        width:k_Screen_Width-24,
        marginLeft:12,
        marginTop:20,
    },
    titleStyle:{
        fontSize:12,
        marginLeft:10,
        height:15,
        width:100,
    },
    moreTitleStyle:{
        fontSize:12,
        height:15,
        width:50,
    },
    scrollHotContainer:{
        flexDirection:'row',
        alignItems:'center',
        height:k_Screen_Width>320?140:120,
        width:k_Screen_Width*3,
        marginTop:15,
        marginLeft:12,
        marginRight:12,
    },
    hotItemContainerStyle:{
        width:k_Screen_Width>320?110:90,
        height:k_Screen_Width>320?140:120,
    },
    hotItemBGStyle:{
        position:'absolute',
        width:k_Screen_Width>320?110:90,
        height:k_Screen_Width>320?140:120,
        resizeMode:'stretch',
    },
    hotIconStyle:{
        position:'absolute',
        width:23,
        height:24,
    },
    hotItemImgStyle:{
        zIndex:-2,
        width:k_Screen_Width>320?100:80,
        height:k_Screen_Width>320?100:80,
        marginTop:5,
        alignSelf:'center',

    },
    hotItemTextStyle:{
        width:k_Screen_Width>320?110:90,
        height:30,
        marginTop:5,
        justifyContent:'center',
        alignItems:'center',
    }


});



function select(store){
    return{
        isLogin:store.LoginReduce.isLogin,
        hotRecommandData:store.HomeReduce.hotRecommandData,
    }
}

export default  connect(select)(HomeHotRecommand);