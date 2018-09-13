import React, { Component } from 'react';
import{
    View,
    Image,
    StyleSheet,
    Platform,
    DeviceEventEmitter,
    StatusBar,
    Dimensions,
}from 'react-native';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

import { connect } from 'react-redux';
import { StackNavigator,TabNavigator,addNavigationHelpers } from 'react-navigation';

import Loading from '../libs/Loading.js';
import MainTabBar from './MainTabBar.js';
import TabBarItem from '../libs/TabBarItem.js';

//注册路由

import Login from './Login.js';
import Home from './Home.js';
import SignUp from './SignUp.js';
import CustomService from './CustomService.js';
import Promtions from './Promtions.js';
import DetailPromtions from './DetailPromtions.js';

//Tab要声明在前面
const Tab = TabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '首页',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/TabBar/home_but.png')}
                        selectedImage={require('../imgs/TabBar/home_but_hove.png')}
                    />
                )
            }),
        },
        SignUp: {
            screen: SignUp,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '天天签到',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/TabBar/home_but_signin.png')}
                        selectedImage={require('../imgs/TabBar/home_but_signin_hover.png')}
                    />
                )
            }),
        },
        CustomService: {
            screen: CustomService,
            navigationOptions: ({ navigation }) => ({
                tabBarLabel: '在线客服',
                tabBarIcon: ({ focused, tintColor }) => (
                    <TabBarItem
                        tintColor={tintColor}
                        focused={focused}
                        normalImage={require('../imgs/TabBar/home_but_service.png')}
                        selectedImage={require('../imgs/TabBar/home_but_service_hover.png')}
                    />
                )
            }),
        },
    },
    {
        tabBarPosition: 'bottom',
        lazy: true,
        tabBarOptions: {
            activeTintColor: '#d3a14a',
            inactiveTintColor: '#ffffff',
            style: { backgroundColor: '#000' },
        },
    }
);


export const StackNav = StackNavigator(
    {   Tab:{screen:Tab,},
        Home:{screen:Home,},
        SignUp:{screen:SignUp,},
        CustomService:{screen:CustomService,},
        Login:{screen:Login,},
        Promtions:{screen:Promtions,},
        DetailPromtions:{screen:DetailPromtions,},
    },
    {
        initialRouteName: 'Tab', // 默认显示界面
        navigationOptions:{
                header:null,
        },
    }
)

class Main extends Component{


    render(){
        const{dispatch,nav,loading}=this.props;
        var load = loading ? <Loading/> : null;
        return(
            <View style={{flex:1}}>
                {load}
                <StackNav  navigation={addNavigationHelpers({
                        dispatch: this.props.dispatch,
                        state: this.props.nav})}/> 
            </View>
        )
    }
}

function mapStateToProps(state){
    return{
        nav:state.NavReduce,
        loading:state.LoadingReduce.loading,
    }
}

export default connect(mapStateToProps)(Main);