import React, { PureComponent } from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Dimensions,
    ScrollView,
    TouchableHighlight,
    Modal,
    NativeEventEmitter,
    NativeModules,
}from 'react-native';

//redux
import { connect } from 'react-redux';
import {ShowLoginModal,HiddenLoginModal,LogoutAction} from '../action/LoginAction.js'
import {AutoLoginAction} from '../action/HomeAction.js'

//libs
import LocalDataManager from '../libs/LocalDataManager.js';

//container
import {
    Login,Promtions,DetailPromtions,MyAccount,UserAccountList,
    RecommandFriends,PromotionsApply,BindedCardList,DrawLottery,
    Setting,NumLock,EditPassword,WebsiteMessage,SearchView,
} from './';



//component
import {
    HomeNav,HomeBanner,HomeMenu,
    HomeGameType,HomeHotRecommand
}from '../component';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class Home extends PureComponent {

    state={
        isLogin:false,
        showLogin:false,
        contentHeight:210+k_Screen_Width/3+k_Screen_Width * 320 / 750.0+(k_Screen_Width>320 ? 200 : 170),

    } 
    
    componentWillMount(){
        //自动跳转详情
        const showDetailPromtionsEmitter = new NativeEventEmitter(NativeModules.NotifycationToReactNative);
        
        const subscription = showDetailPromtionsEmitter.addListener(
          'ShowDetailPromtions',
          (data)=>{this.promotionsEmitterAction(data)}
        );

        LocalDataManager.queryLocalDataWithKey('isLogin',(result)=>{
            if(result==='true'){

                LocalDataManager.queryLocalDataWithKey('loginDic',(opt)=>{
                    this.props.dispatch(AutoLoginAction(opt));
                })
            }else{
                this.props.dispatch(ShowLoginModal())
            }
        })
    }

    componentWillUnmount() {
        subscription.remove();        
    }

    promotionsEmitterAction(data){
        const {navigator}=this.props;
        let dataJson = data.name;
        if(parseInt(dataJson.is_jump)){
            let actID = dataJson.active.id;
            if(actID.length){
                navigator.push({
                    component:DetailPromtions,
                    passProps:{'actID':actID,'url':'','title':'','htmlStr':''}
                })
            }else{
                navigator.push({
                    component:Promtions,
                })
            }
        }else{
        }
    }

    //跳转到站内信
    _websiteBtnAction(){
        const {navigator}=this.props;
        navigator.push({component:WebsiteMessage,})
    }
    //跳转搜索
    _searchBtnAction(){
        const {navigator}=this.props;
        navigator.push({component:SearchView,})
    }
    //跳转到游戏记录
    _historyBtnAction(){
        alert('去历史记录');
    }
    //轮播图点击事件
    _tapADView(data){
        const {navigator}=this.props;
        navigator.push({
            component:DetailPromtions,
            passProps:{'url':data.url,'actID':data.id,'title':data.title,'htmlStr':data.content,}
        })
    }
    _selectMenuIndex(index){
        const {isLogin,navigator}=this.props;
        if(index===1||index===7){
            index===1 ? navigator.push({component:Promtions})
                      : navigator.push({component:Setting}) ; 
        }else{
            if(isLogin){
                switch(index){
                    case 0:
                        navigator.push({component:MyAccount});
                    break;
                    case 2:
                        navigator.push({component:RecommandFriends});
                    break;
                    case 3:
                        navigator.push({component:PromotionsApply});
                    break;
                    case 4:
                        navigator.push({component:BindedCardList});
                    break;
                    case 5:
                        navigator.push({component:UserAccountList});
                    break;
                    case 6:
                        navigator.push({component:NumLock});
                    break;
                    case 8:
                        navigator.push({component:EditPassword});
                    break;
                    case 9:
                        navigator.push({component:DrawLottery});
                    break;
                    break;
                }
            }
            else{
                navigator.push({component:Login});
            }
        }
    }
    _selectedType(type){
        height=type?320:220;
        this.setState({       
             contentHeight:height+k_Screen_Width/3+k_Screen_Width * 320 / 750.0+(k_Screen_Width>320 ? 200 : 170),
        })
    }
    _selectedTypeAndIndex(type,index){
        alert('selected gametype'+type+'index'+index);
    }
    _hotItemSelectd(index){

        alert('selected hot'+index);
    }

    render() {
        const {showLogin,isLogin,navigator}=this.props;
        {/* 登陆 */}
        if(showLogin){
            return(
                <Modal  
                    animationType='slide'  
                    transparent={true}  
                    visible={showLogin}
                    onRequestClose={()=>{}}>
                    <Login/> 
                </Modal>
             )
        }
        return (
            <View style={styles.container}> 
                {/* 导航栏 */}
                <HomeNav 
                    _websiteBtnAction={this._websiteBtnAction.bind(this)}
                    _searchBtnAction={this._searchBtnAction.bind(this)}
                    _historyBtnAction={this._historyBtnAction.bind(this)}
                />
                <ScrollView automaticallyAdjustContentInsets={false} style={{backgroundColor:'black'}} contentContainerStyle={[styles.contentStyle,{height:this.state.contentHeight}]}>
                {/* Banner */}
                <HomeBanner selectBannerIndex={(index)=>this._tapADView(index)}/>
                 {/* 菜单栏 */}
                <HomeMenu selectMenuIndex={(index)=>this._selectMenuIndex(index)}/>
                {/* 游戏类型 */}
                <HomeGameType navigator={navigator}
                selectedTypeCallBack={(type)=>this._selectedType(type)}
                selectedTypeAndIndexCallBack={(type,index)=>{this._selectedTypeAndIndex(type,index)}}/>
                {/* 热门推荐 */}
                <HomeHotRecommand 
                    navigator={navigator}
                    hotSelectedCallBack={(index)=>this._hotItemSelectd(index)}/>
                </ScrollView>
            </View>
        );
    }
}

function select(store){
    return{
        isLogin:store.LoginReduce.isLogin,
        showLogin:store.LoginReduce.showLogin,
    }
}
var styles = StyleSheet.create({

    container:{
        width:k_Screen_Width,
        height:k_Screen_Height-49,
        marginTop:0,
        backgroundColor:'black',
        flexDirection:'column',
    },
    contentStyle:{
        width:k_Screen_Width,
    }
})
export default connect(select)(Home);