import React, { PureComponent } from 'react';
import{
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions,
} from 'react-native';
import LocalDataManager from '../libs/LocalDataManager.js';
import {SubNav,MyAccountHeader,MyAccountFooter,MyAccountInfoView,MyAccountRechargeView} from '../component'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
class MyAccount extends PureComponent {

    state={
        userInfoData:{},
    }

    componentWillMount() {
        
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            this.setState({userInfoData:result});
        });

    }

    render() {
        const{userInfoData}=this.state;
        const{navigator}=this.props;
        return (
            <View style={styles.container}>
                <SubNav title={'我的账户'} navigator={navigator}/>
                <ScrollView style={{backgroundColor:'#0c0c0c'}} automaticallyAdjustContentInsets={false} contentContainerStyle={styles.scrollStyle}>    
                    {/* 头部控件 */}
                    <MyAccountHeader navigator={navigator} data={userInfoData}/>
                    {/* 用户信息控件 */}
                    <MyAccountInfoView navigator={navigator} data={userInfoData}/>
                    {/* 充值控件 */}
                    <MyAccountRechargeView navigator={navigator} data={userInfoData}/>
                    {/* 尾部控件 */}
                    <MyAccountFooter/>
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
        width:k_Screen_Width,
        height:750,
        backgroundColor:'#0c0c0c',

    }

})

export default MyAccount;