import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableHighlight,
} from 'react-native';

import {
    RecommandFriends,UserAccountList,StaticHtml,CompeletePersonInfo,
    WebsiteMessage,
} from '../container';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;

class MyAccountHeader extends PureComponent {

    _renderMenuView(){
        var views=[];
        var titleArr = ['账户清单','VIP尊享','推荐有礼','站内信'];
        var imgArr = [require('../imgs/MyAccount/myaccount_icon_accounts.png'),
                      require('../imgs/MyAccount/myaccount_icon_vip.png'),
                      require('../imgs/MyAccount/myaccount_icon_friend.png'),
                      require('../imgs/MyAccount/myaccount_icon_email.png'),];
        imgArr.map((img,index)=>{
            views.push(
                <TouchableHighlight key={index} onPress={()=>this._menuSelected(index)} activeOpacity={0.6} underlayColor={'transparent'}>
                    <View style={styles.menuItem}>
                        <Image style={styles.menuItemIcom} source={img}/>
                        <View style={styles.menuItemTitle}>
                            <Text style={{color:'white',fontSize:12,}}>{titleArr[index]}</Text>
                        </View>
                    </View>
                </TouchableHighlight>
            )
        })
        return views;
    }


    _menuSelected(index){
        const {navigator}=this.props;
        switch(index){
            case 0:
                navigator.push({component:UserAccountList});
            break;
            case 1:
                navigator.push({component:StaticHtml,passProps:{title:'VIP尊享',source:require('../about/VIP尊享.html')}});
            break;
            case 2:
                navigator.push({component:RecommandFriends});
            break;
            case 3:
                navigator.push({component:WebsiteMessage});
            break;
        }
    }
    _compeleteInfroAction(){
        const {navigator}=this.props;
        navigator.push({component:CompeletePersonInfo});
    }

    render() {
        const {data} = this.props;
        let img = this._vipLevelStrTurnToImg(data.level);
        let vipName = this._vipLevelStrTurnToName(data.level);
        return (
            <View style={styles.container}>
                {/* 用户信息头 */}
                <View style={styles.bgView}>
                    <View style={{flexDirection:'row'}}>
                        <Image style={styles.userIcon} source={img}/>
                        <View style={styles.userNameText}>
                            <Text style={{color:'white',fontSize:14,}}>{data.username}</Text>
                        </View>
                    </View>
                    <View style={styles.vipLevelView}>
                        <Image style={styles.vipIcon} source={require('../imgs/MyAccount/myaccount_bth_vip.png')}/>
                        <View style={styles.vipLevelText}>
                            <Text style={{color:'white',fontSize:14,}}>{vipName}</Text>
                        </View>
                    </View>
                </View>
                {/* 四个按钮视图 */}
                <View style={styles.menuView}>
                {this._renderMenuView()}
                </View>
                {/* 完善个人信息视图 */}
                <View style={styles.compeleteView}>
                    <View style={styles.compeleteText}>
                        <Text style={{color:'#d3a14a',fontSize:13,}} onPress={()=>this._compeleteInfroAction()}>
                            完善个人绑定信息，更多优惠特权
                        </Text>
                    </View>
                </View>
            </View>
        );
    }

    _vipLevelStrTurnToName(levelStr){
        var name = '';
        switch(parseInt(levelStr)){
            case 0:
            name='普通会员';
            break;
            case 2000:
            name='特邀会员';
            break;
            case 2101:
            name='白银会员';
            break;
            case 2102:
            name='黄金会员';
            break;
            case 2103:
            name='钻石会员';
            break;
            case 2111:
            name='精英会员';
            break;
            case 2112:
            name='明星会员';
            break;
            case 2113:
            name='大师会员';
            break;
            default:
            name='普通会员';
            break;
        }
        return name;
    }

    _vipLevelStrTurnToImg(levelStr){
        var img;
        switch (parseInt(levelStr)) {
            case 0:
                img = require('../imgs/Level/portrait_ordinary.png');
                break;
            case 2000:
                img = require('../imgs/Level/portrait_guest.png');
                break;
            case 2101:
                img = require('../imgs/Level/portrait_silver.png');
                break;
            case 2102:
                img = require('../imgs/Level/portrait_gold.png');
                break;
            case 2103:
                img = require('../imgs/Level/portrait_diamond.png');
                break;
            case 2111:
                img = require('../imgs/Level/portrait_elite.png');
                break;
            case 2112:
                img = require('../imgs/Level/portrait_star.png');
                break;
            case 2113:
                img = require('../imgs/Level/portrait_master.png');
                break;
            default:
                img = require('../imgs/Level/portrait_ordinary.png');
                break;
        }
        return img;
    }

}

var styles = StyleSheet.create({
    container:{
        width:k_Screen_Width,
        height:215,
    },
    bgView:{
        width:k_Screen_Width,
        height:60,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        backgroundColor:'black',
    },
    userIcon:{
        width:40,
        height:40,
        marginLeft:12,
    },
    userNameText:{
        width:150,
        height:40,
        marginLeft:10,
        justifyContent:'center',
    },
    vipLevelView:{
        width:110,
        height:30,
    },
    vipIcon:{
        position:'absolute',
        zIndex:-1,
        width:110,
        height:30,
    },
    vipLevelText:{
        width:70,
        height:30,
        alignSelf:'flex-end',
        marginRight:12,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'transparent'
    },
    menuView:{
        width:k_Screen_Width,
        height:100,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
        backgroundColor:'black',
    },
    menuItem:{
        width:60,
        height:47,
        alignItems:'center',
        justifyContent:'center',
    },
    menuItemIcom:{
        width:22,
        height:22,
    },
    menuItemTitle:{
        width:60,
        height:20,
        marginTop:5,
        alignItems:'center',
        justifyContent:'center',
    },
    compeleteView:{
        width:k_Screen_Width,
        height:55,
        alignItems:'center',
        justifyContent:'center',
    },
    compeleteText:{
        width:220,
        height:30,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#d3a14a',
        borderWidth:1,
    },
})

export default MyAccountHeader;