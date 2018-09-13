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

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/414;


class HomeMenu extends Component {

    static defaultProps={
        isLogin:false,
    }
    state={
        imgArr:[require('../imgs/Home/home_menu_login.png'),
                require('../imgs/Home/home_menu_preferential.png'),
                require('../imgs/Home/home_menu_recommended.png'),
                require('../imgs/Home/home_menu_Preferentialapplication.png'),
                require('../imgs/Home/home_menu_Bankcard.png'),
                require('../imgs/Home/home_menu_Listaccounts.png'),
                require('../imgs/Home/home_menu_lock.png'),
                require('../imgs/Home/home_menu_setup.png'),
                require('../imgs/Home/home_menu_Changepassword.png'),
                require('../imgs/Home/home_menu_Luckydraw.png')],
        titleArr:["注册／登录","优惠活动","好友推荐","优惠申请","银行卡","账户清单","图形锁","设置","修改密码","抽奖"],
    }
    
    _initViews(isLogin){
        var views=[];
        const{imgArr,titleArr}=this.state;
        if(isLogin){
            titleArr[0]='我的账户';
        }else{
            titleArr[0]='注册／登录';
        }
        for(let i=0;i<10;i++){
            views.push(
                <MenuItem index={i} key={i} 
                title={titleArr[i]} imgUrl={imgArr[i]} selectMenuIndex={(index)=>this.props.selectMenuIndex(index)}/>
            )
        }
        return views;
    }
   
    render() {
        const {isLogin}=this.props;
        var views = this._initViews(isLogin);
        return (
            <View style = {style=styles.container}>
                {views}
            </View>
        );
    }
}

export class MenuItem extends Component{
    render(){
        const{index,title,imgUrl,selectMenuIndex}=this.props;
        return(
            <TouchableHighlight activeOpacity={0.5}
                underlayColor={'transparent'} onPress={()=>this.props.selectMenuIndex(index)}>   
                <View style={styles.menuItemStyle}>
                    <Image style={styles.menuImgStyle} source={imgUrl}/>
                    <Text style={styles.menuTitleStyle}>{title}</Text>
                </View>
            </TouchableHighlight>
        )
    }
}

var styles = StyleSheet.create({

    container:{
        flexDirection:'row',
        flexWrap:'wrap',
        width:k_Screen_Width,
        height:k_Screen_Width * 320 / 750.0,
    },
    menuItemStyle:{
        alignItems:'center',
        justifyContent:'center',
        width:k_Screen_Width/5,
        height:90*k_Scale_Size,
    },
    menuImgStyle:{
        width:50*k_Scale_Size,
        height:50*k_Scale_Size,
    },
    menuTitleStyle:{
        width:k_Screen_Width/5,
        height:20*k_Scale_Size,
        marginTop:3,
        color:'white',
        fontSize:14*k_Scale_Size,
        textAlign:'center',
    },

})

function select(store){
    return{
        isLogin:store.LoginReduce.isLogin,
    }
}

export default  connect(select)(HomeMenu);