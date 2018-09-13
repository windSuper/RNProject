import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    Dimensions,
    Clipboard,
    TouchableHighlight,
    DeviceEventEmitter,
} from 'react-native';

import {HttpRequest,LocalDataManager} from '../libs';
import {SubNav,MyAccountHeader,MyAccountFooter,MyAccountInfoView,MyAccountRechargeView} from '../component'
import ToastShort from '../libs/ToastShort.js';
import Menu, { MenuContext, MenuOptions, MenuOption, MenuTrigger } from 'react-native-menu';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
class PromotionsApply extends PureComponent {

    state={
        menuTitle:'请选择',
    }

    render() {
        const{navigator}=this.props;
        const{menuTitle}=this.state;
        return (
            <MenuContext style={{ flex: 1 }}>
                <View style={styles.container}>
                    <SubNav title={'优惠申请'} navigator={navigator}/>
                    <View style={styles.itemView}>
                        <Image style={styles.itemImg} source={require('../imgs/Pay/pay_icon_Preferentialapplication_firstdeposit.png')}/>
                        <Text style={{ fontSize: 14,color:'white',marginLeft:10}}>优惠申请</Text>
                        <View style={styles.menuView}>
                            <Menu onSelect={(value) => this.menuAction(value)}>
                                <MenuTrigger>
                                <Text style={{fontSize:14,color:'white' }}>{menuTitle}</Text>
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption value={'联系在线客服'}>
                                        <Text>联系在线客服</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </View>
                    </View>
                    <View style={styles.serviceBtn}>
                        <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.8} onPress={()=>this._serviceAction()}>
                            <View style={{width:k_Screen_Width-40,height:30,alignItems:'center',justifyContent:'center',}}>
                                <Text style={{fontSize:15}}>联系在线客服</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
            </MenuContext >
        );
    }
    menuAction(value){
        this.setState({menuTitle:value})
    }

    _serviceAction(){
        const {navigator}=this.props;
        DeviceEventEmitter.emit('tabBarSwitch','2');
        navigator.popToTop();
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0c0c0c'
    },
    itemView:{
        width:k_Screen_Width,height:40,marginTop:10,flexDirection:'row',alignItems:'center',backgroundColor:'#191919',
    },
    itemImg:{
        width:20,height:20,marginLeft:12,
    },
    serviceBtn:{
        width:k_Screen_Width-40,height:30,marginTop:40,marginLeft:20,backgroundColor:'#d3a14a'
    },
    menuView:{
        width:100,height:20,justifyContent:'center',alignItems:'center',marginLeft:k_Screen_Width-210
    }
})

export default PromotionsApply;