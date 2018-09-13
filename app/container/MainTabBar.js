import React, { PureComponent } from 'react';
import{
    View,
    Image,
    StyleSheet,
    Platform,
    DeviceEventEmitter,
    StatusBar,
    Dimensions,
    NavigatorIOS,
}from 'react-native';

import { connect } from 'react-redux';
import Loading from '../libs/Loading.js';

//导入第三方框架react-native-tab-navigator若没有则在项目目录下输入如下命令
//npm i react-native-tab-navigator --save
import TabNavigator from 'react-native-tab-navigator';
import Home from './Home.js';
import SignUp from './SignUp.js';
import CustomService from './CustomService.js';
import Orientation from 'react-native-orientation';


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class MainTabBar extends PureComponent {
    
    state={
        width:k_Screen_Width,
        height:k_Screen_Height,
    }

    componentWillMount(){   
        Orientation.addOrientationListener(this._orientationDidChange);
        
      }
      componentWillUnmount() {
         Orientation.removeOrientationListener(this._orientationDidChange);
      }
      _orientationDidChange=(orientation)=> {
         if(orientation === 'LANDSCAPE'){
           //做一些景观布局 
           this.setState({height:k_Screen_Width,width:k_Screen_Height});
        }else{
            this.setState({height:k_Screen_Height,width:k_Screen_Width});
        }
      }




    render(){
        const {loading} = this.props;
        const {width,height} = this.state;
        var load = loading ? <Loading/> : null;
        return (
            <View style={{width:width,height:height}}>
                {load}
                <NavigatorIOS
                initialRoute={{
                        title:'',
                        component: TabBar
                    }}
                navigationBarHidden = {true}
                style={{width:width,height:height}}/>
            </View>
        );

    }
}

export class TabBar extends PureComponent{

    state={
        selectedTab:'Home',
        isHiddenTabBar:false, 
    }

    componentWillMount() {
        this.tabBarNotification = DeviceEventEmitter.addListener('tabBarSwitch', (data)=>{this._tabBarNotifyAction(data)});
        this.hiddenTabBar = DeviceEventEmitter.addListener('isHiddenTabBar', (hidden)=>{this.setState({isHiddenTabBar:hidden});});

    }
    componentWillUnmount() {
        this.tabBarNotification.remove();
        this.hiddenTabBar.remove();
    }
    _tabBarNotifyAction(index){
        switch(parseInt(index)){
            case 0:{
                this.setState({selectedTab:'Home'});
            }
            break;
            case 1:{
                this.setState({selectedTab:'SignUp'});
            }
            break;
            case 2:{
                this.setState({selectedTab:'CustomService'});
            }
            break;
            default:{
                this.setState({selectedTab:'Home'});
            }
        }
    }
    renderTabBarItem(title,tabName,image,selectedImage,ctrl){
        //首页隐藏导航栏
        return(
            <TabNavigator.Item
                selected = {this.state.selectedTab===tabName}
                title    = {title}
                titleStyle = {{color:'white'}}
                selectedTitleStyle = {{color:'orange'}}
                renderIcon = {()=><Image source={image} style={styles.tabbarIconStyle}/>}
                renderSelectedIcon = {()=><Image source={selectedImage} style={styles.tabbarIconStyle}/>}
                onPress = {()=>this.setState({selectedTab:tabName})}
            >
            {ctrl}
            </TabNavigator.Item>
        );
    }

    render() {
        const {navigator}=this.props;
        let HomeScreen = <Home navigator={navigator}/>
        let SignUpScreen = <SignUp navigator={navigator}/>
        let CustomServiceScreen = <CustomService navigator={navigator}/>

        return (
                <TabNavigator
                tabBarStyle={this.state.isHiddenTabBar !== true ? {backgroundColor:'black'} : {height:0,overflow:'hidden'}}
                sceneStyle ={this.state.isHiddenTabBar !== true ? {} : {paddingBottom:0}} 
                >
                {this.renderTabBarItem('首页','Home',require('../imgs/TabBar/home_but.png'),require('../imgs/TabBar/home_but_hove.png'),HomeScreen)}
                {this.renderTabBarItem('天天签到','SignUp',require('../imgs/TabBar/home_but_signin.png'),require('../imgs/TabBar/home_but_signin_hover.png'),SignUpScreen)}
                {this.renderTabBarItem('在线客服','CustomService',require('../imgs/TabBar/home_but_service.png'),require('../imgs/TabBar/home_but_service_hover.png'),CustomServiceScreen)}
                </TabNavigator>
            
        );
    }
}

const styles = StyleSheet.create({
    tabbarIconStyle: {
        width:Platform.OS === 'ios' ? 25 : 25,
        height:Platform.OS === 'ios' ? 25 : 25,
    },
});


function mapStateToProps(state){
    return{
        loading:state.LoadingReduce.loading,
    }
}

export default connect(mapStateToProps)(MainTabBar);
