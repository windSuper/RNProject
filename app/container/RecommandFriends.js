import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
    Clipboard,
    TouchableHighlight,
} from 'react-native';
import {RecommandFriendsList} from './';
import {HttpRequest,LocalDataManager} from '../libs';
import {SubNav,MyAccountHeader,MyAccountFooter,MyAccountInfoView,MyAccountRechargeView} from '../component'
import ToastShort from '../libs/ToastShort.js';


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
class RecommandFriends extends PureComponent {

    state={
        tjCode:'',
    }

    componentWillMount() {
        
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            if(!result.tj_code.length){
                this.requestTJCodeAction();
            }else{
                this.setState({tjCode:result.tj_code});
            }
        });

    }
    requestTJCodeAction(){
        HttpRequest.requestDataWithParams('/ext/tj_code.do',{'tj_code':'true'},(result)=>{
            this.setState({tjCode:result.Data.tj_code})
        },(error)=>{
            alert(error);
        })
    }

    clipBoardContentAction(code){
        Clipboard.setString(code);
        var content= Clipboard.getString();
        ToastShort.show('已复制推荐码'+code);
    }

    _recommandBtnAction(){
        const{tjCode}=this.state;
        this.props.navigator.push({component:RecommandFriendsList,passProps:{'tjCode':tjCode}})
    }

    render() {
        const{tjCode}=this.state;
        console.log('tjcode=',tjCode);
        const{navigator}=this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'好友推荐'} navigator={navigator}/>
                <ScrollView style={{backgroundColor:'#0c0c0c'}} automaticallyAdjustContentInsets={false} contentContainerStyle={styles.scrollStyle}>    
                    {/* Logo图 */}
                    <View>
                        <Image source={require('../imgs/RecommandFriend/friend_png_title.png')} style={{width:233,height:65,marginLeft:(k_Screen_Width-233)/2,marginTop:10,}}/>
                    </View>
                    {/* 分享推荐吗 */}
                    <View style={{marginTop:15}}>
                        <Image source={require('../imgs/RecommandFriend/friend_background1.png')} style={styles.shareCodeBgView}/>
                        <View>
                            <Image source={require('../imgs/RecommandFriend/friend_background_title.png')} style={styles.shareCodeTitleBg}/>
                            <View style={styles.shareCodeTitleView}>
                                <Text style={{color:'#d3a14a',fontSize:14}}>分享推荐码</Text>
                            </View>
                            <View style={{width:k_Screen_Width-44,height:30,marginLeft:22,marginTop:17.5,}}>
                                <Text style={{color:'white',fontSize:12}}>
                                    复制您的专属6位推荐码
                                    <Text onPress={()=>this.clipBoardContentAction(tjCode)} style={{color:'#d3a141'}}>【{tjCode}】</Text>
                                    <Text>分享至好友</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* 好友注册并首存 */}
                    <View style={{marginTop:30}}>
                        <Image source={require('../imgs/RecommandFriend/friend_background2.png')} style={styles.friendsRegisterBG}/>
                        <View>
                            <Image source={require('../imgs/RecommandFriend/friend_background_title.png')} style={styles.shareCodeTitleBg}/>
                            <View style={styles.shareCodeTitleView}>
                                <Text style={{color:'#d3a14a',fontSize:14}}>好友注册并首存</Text>
                            </View>
                            <View style={{width:k_Screen_Width-44,height:60,marginLeft:22,marginTop:10,}}>
                                <Text style={{color:'white',fontSize:12}}>
                                好友注册您的邀请链接注册，并在一周内首存成功，您即可
                                    <Text style={{color:'#d3a141'}}>获得好友首存的30%的奖励</Text>
                                    <Text>同时好友获得首存奖励。每邀请成功一个好友，就可获得好友首存的30%奖励，多邀多得，上不封顶!</Text>
                                </Text>
                            </View>
                        </View>
                        <View style={styles.friendsRegisterImgStep}>
                            <Image style={styles.friendsRegisterImg} source={require('../imgs/RecommandFriend/friend_icon1.png')}/>
                            <Image style={{height:60,width:(k_Screen_Width-260)/2,resizeMode:'center'}} source={require('../imgs/RecommandFriend/friend_icon.png')}/>
                            <Image style={styles.friendsRegisterImg} source={require('../imgs/RecommandFriend/friend_icon2.png')}/>
                            <Image style={{height:60,width:(k_Screen_Width-260)/2,resizeMode:'center'}} source={require('../imgs/RecommandFriend/friend_icon.png')}/>
                            <Image style={styles.friendsRegisterImg} source={require('../imgs/RecommandFriend/friend_icon3.png')}/>
                        </View>
                        <View style={styles.friendsRegisterTextStep}>
                            <Text style={styles.friendsRegisterText}>邀请好友{'\n'}填写推荐码注册</Text>
                            <View style={{width:(k_Screen_Width-300)/2}}></View>
                            <Text style={styles.friendsRegisterText}>好友首存{'\n'}获得首存奖励</Text>
                            <View style={{width:(k_Screen_Width-300)/2}}></View>
                            <Text style={styles.friendsRegisterText}>邀请人获得{'\n'}好友首存30%奖励</Text>
                        </View>
                    </View>
                    {/* 好友晋级VIP */}
                    <View style={{marginTop:30}}>
                        <Image source={require('../imgs/RecommandFriend/friend_background3.png')} style={styles.shareCodeBgView}/>
                        <View>
                            <Image source={require('../imgs/RecommandFriend/friend_background_title.png')} style={styles.shareCodeTitleBg}/>
                            <View style={styles.shareCodeTitleView}>
                                <Text style={{color:'#d3a14a',fontSize:14}}>好友晋级VIP</Text>
                            </View>
                            <View style={{width:k_Screen_Width-44,height:30,marginLeft:22,marginTop:17.5,}}>
                                <Text style={{color:'white',fontSize:12}}>
                                    好友晋级VIP会员您还可获得额外的
                                    <Text style={{color:'#d3a141'}}>【晋级奖励888元】</Text>
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* 查看已推荐列表按钮 */}
                    <View style={styles.recommandBtn}>
                        <TouchableHighlight underlayColor={'transparent'} activeOpacity={0.8} onPress={()=>this._recommandBtnAction()}>
                            <View style={{width:k_Screen_Width-40,height:30,alignItems:'center',justifyContent:'center',}}>
                                <Text style={{fontSize:15}}>查看推荐好友状态</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
    },
    scrollStyle:{
        width:k_Screen_Width,height:660,backgroundColor:'#0c0c0c',
    },
    shareCodeBgView:{
        position:'absolute',zIndex:-1, width:k_Screen_Width-24,height:80,marginLeft:12,marginTop:15,resizeMode:'stretch',
    },
    shareCodeTitleBg:{
        position:'absolute',width:k_Screen_Width-200,height:30,marginLeft:100,resizeMode:'stretch',
    },
    shareCodeTitleView:{
        width:k_Screen_Width,height:30,alignItems:'center',justifyContent:'center'
    },
    friendsRegisterBG:{
        position:'absolute',zIndex:-1, width:k_Screen_Width-24,height:220,marginLeft:12,marginTop:15,resizeMode:'stretch',
    },
    friendsRegisterImgStep:{
        width:k_Screen_Width-80,height:60,marginTop:10,marginLeft:40,flexDirection:'row',alignItems:'center',
    },
    friendsRegisterImg:{
        width:60,height:60,
    },
    friendsRegisterTextStep:{
        width:k_Screen_Width-60,height:35,marginTop:10,marginLeft:30,flexDirection:'row',alignItems:'center',
    },
    friendsRegisterText:{
        width:80,height:45,textAlign:'center',fontSize:13,color:'#d3a14a',marginTop:10,
    },
    recommandBtn:{
        backgroundColor:'#d3a14a',width:k_Screen_Width-40,height:30,marginTop:60,marginLeft:20,alignItems:'center',justifyContent:'center',
    }

})

export default RecommandFriends;