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
} from 'react-native';

import {HttpRequest,LocalDataManager} from '../libs';
import {SubNav,MyAccountHeader,MyAccountFooter,MyAccountInfoView,MyAccountRechargeView} from '../component'
import ToastShort from '../libs/ToastShort.js';


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
class RecommandFriendsList extends PureComponent {

    state={
        friendsListData:null,
        requestSuccess:false,
    }

    componentWillMount() {
        
        this.requesFriendsListAction();

    }
    requesFriendsListAction(){
        HttpRequest.requestDataWithParams('/ext/tj_user.do',{'page':'','rows':'40',},(result)=>{
            this.setState({friendsListData:result.Data.user_to,requestSuccess:true})
        },(error)=>{
            alert(error);
        })
    }
    render() {
        const{navigator}=this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'推荐好友列表'} navigator={navigator}/>
                {this.renderContentView()}
            </View>
        );
    }

    renderContentView(){
        const {friendsListData,requestSuccess}=this.state;
        return  requestSuccess ? (friendsListData.length ? this.renderListView() : this.renderNODataView() ) : null
    }

    renderListView(){
        return <FlatList style={styles.contentView}
                    data={this.state.friendsListData}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
                />
    }

    renderNODataView(){
        const{tjCode}=this.props;
        return <View style={styles.contentView}>
            <Image style={{marginLeft:(k_Screen_Width-303)/2,width:303,height:180,marginTop:60}} 
            source={require('../imgs/RecommandFriend/friend_nodata.png')}/>
            <View style={{width:k_Screen_Width-60,marginLeft:30,height:20,marginTop:20,justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'white',fontSize:15}}>暂无推荐好友.....</Text>
            </View>
            <View style={{width:k_Screen_Width-30,marginLeft:15,height:30,marginTop:40,backgroundColor:'#d3a14a',justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:15}}>发送您的推荐码【{tjCode}】至好友得奖金</Text>
            </View>
        </View>
    }

    keyExtractor=(item,index)=>{
        return item.index ? item.index : index;
    }

    renderItem=(item)=>{
        let username = item.item.username;
        let secretStr = username.substring(3,6);
        username = username.replace(secretStr,'***');
        return <View style={styles.listItem}>
                    {/* 序号 */}
                    <View style={styles.indexView}>
                        <Image style={styles.indexImg} source={require('../imgs/RecommandFriend/friend_list_number.png')}/>
                        <Text style={{fontSize:14,color:'white'}}>{item.index+1}</Text>
                    </View>
                    {/* 用户名 */}
                    <View style={styles.usernameView}>
                        <Text style={{fontSize:14,color:'white'}}>{username}</Text>
                    </View>
                    {/* 会员等级 */}
                    <View style={styles.vipLevel}>
                        <Text style={{fontSize:14,color:'white'}}>{this.vipCodeTurnText(item.item.level)}</Text>
                    </View>
                    {/* 注册一周内首存 */}
                    <View style={styles.registerDetail}>
                        <Text style={{fontSize:14,color:'white'}}>注册一周内首存</Text>
                        <Text style={{fontSize:14,color:'white'}}>{'¥'+item.item.cash7day}</Text>
                    </View>
                </View>
    }

    vipCodeTurnText(vipCode){
        var name = '普通会员';
        switch(vipCode){
            case 0:
                name = '普通会员';
            break;
            case 2000:
                name = '特邀会员';
            break;
            case 2101:
                name = '白银会员';
            break;
            case 2102:
                name = '黄金会员';
            break;
            case 2103:
                name = '钻石会员';
            break;
            case 2111:
                name = '精英会员';
            break;
            case 2112:
                name = '明星会员';
            break;
            case 2113:
                name = '大师会员';
            break;
        }
        return name;
    }

}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#0c0c0c'
    },
    contentView:{
        flex:1,
    },
    listItem:{
        width:k_Screen_Width,height:50,marginTop:10,flexDirection:'row',alignItems:'center',backgroundColor:'#191919'
    },
    indexView:{
        width:20,height:20,justifyContent:'center',alignItems:'center',marginLeft:12,backgroundColor:'transparent'
    },
    indexImg:{
        position:'absolute',width:20,height:20,
    },
    usernameView:{
        width:80,height:20,justifyContent:'center',marginLeft:10,
    },
    vipLevel:{
        width:70,height:20,justifyContent:'center',marginLeft:10,
    },
    registerDetail:{
        width:k_Screen_Width-214,height:40,alignItems:'center',marginLeft:10,justifyContent:'center',
    }
})

export default RecommandFriendsList;