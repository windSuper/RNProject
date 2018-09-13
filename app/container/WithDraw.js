import React, { Component } from 'react';
import{
    View,
	StyleSheet,
    Image,
    Text,
    TextInput,
    TouchableHighlight,
    Dimensions,
    ScrollView,
    DeviceEventEmitter,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {LocalDataManager,HttpRequest,ToastShort} from '../libs';
import {BindedCardList} from './';
import {LoadingAction,NOLoadingAction} from '../action/LoginAction.js'

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;


class WithDraw extends Component {
    
    state={
        bankCardInfo:null,
        drawMoney:'',
        canDrawMoney:'0.00',
    }

    componentWillMount() {
        const{dispatch}=this.props;
        HttpRequest.requestData(
            '/user/show_cash.do',
            (responseData)=>{
                this.setState({canDrawMoney:responseData.Data.cash})
            },
            (error)=>{
                ToastShort.show(error);
            },
        )
    }

    render(){
        const {navigator} = this.props;
        return (
            <ScrollView contentContainerStyle={[styles.container]} bounces={false} automaticallyAdjustContentInsets={false}>
                <SubNav title={'提现'} navigator={navigator}/>
                {this.renderBankCardInfoView()}
                {this.renderMoneyView()}
                <View style={{marginTop:35}}>
                    <TouchableHighlight onPress={()=>this.bindBtnAction()}>
                        <View style={styles.btnStyle}>
                            <Text style={{fontSize:16}}>确认提款</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        )
    }

    renderBankCardInfoView(){
        const{bankCardInfo}=this.state;
        if(bankCardInfo){
            return <TouchableHighlight onPress={()=>this.goToBankList()}>
                <View style={styles.bankCardItem}>
                    <View style={{width:k_Screen_Width-22}}>
                        <View style={styles.bankInfoView}>
                            <Image style={[styles.bankLogo,{marginTop:5,}]} source={this.turnBankCodeToBankLogo(bankCardInfo.banktypecode)}/>
                            <View style={{width:120,height:20,marginLeft:10,marginTop:5,justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'white'}}>{bankCardInfo.bank_title}</Text>
                            </View>
                            <View style={{width:100,height:20,marginTop:5,justifyContent:'center'}}>
                                <Text style={{fontSize:14,color:'white'}}>{bankCardInfo.cardname}</Text>
                            </View>
                        </View>
                        <View style={{height:20,marginTop:10,marginLeft:42,justifyContent:'center'}}>
                            <Text style={{fontSize:12,color:'#969696'}}>尾号为{bankCardInfo.cardnumber.substring(bankCardInfo.cardnumber.length-4,bankCardInfo.cardnumber.length)}储蓄卡</Text>
                        </View>
                    </View>
                    <Image style={styles.arrowImg} source={require('../imgs/Login/list_next.png')}/>
                </View>
            </TouchableHighlight>
        }else{
            return <TouchableHighlight onPress={()=>this.goToBankList()}>
                <View style={[styles.bankCardItem]}>
                    <Image style={styles.bankLogo} source={require('../imgs/Pay/pay_icon_Methodofpayment_wechat_manual.png')}/>
                    <View style={{width:k_Screen_Width-64,height:60,justifyContent:'center',marginLeft:10}}>
                        <Text style={{color:'white',fontSize:15,}}>请选择要提现的银行卡</Text>
                    </View>
                    <Image style={styles.arrowImg} source={require('../imgs/Login/list_next.png')}/>
                </View>
            </TouchableHighlight>
        }
    }

    renderMoneyView(){
        const{drawMoney,canDrawMoney}=this.state;
        return <View style={styles.moneyItem}>
            <View style={styles.generalTextContainer}>
                <Text style={styles.generalText}>提现金额</Text>
            </View>
            <View style={{width:k_Screen_Width,height:30,marginTop:10,flexDirection:'row',alignItems:'center'}}>
                <View style={[styles.generalTextContainer,{height:30,width:20}]}>
                    <Text style={{color:'white',fontSize:20}}>¥</Text>
                </View>
                <TextInput style={[styles.generalTextContainer,styles.generalText,{height:30}]}
                onChangeText={(text)=>this.setState({drawMoney:text})}/>
            </View>
            <View style={[styles.generalTextContainer,{height:1,backgroundColor:'#464646'}]}></View>
            <View style={[styles.generalTextContainer,{marginTop:10}]}>
                <Text style={styles.generalText}>可提现金额{canDrawMoney}元</Text>
            </View>
        </View>
    }
    
    goToBankList(){
        const{navigator}=this.props;
        navigator.push({component:BindedCardList,passProps:{'withDrawCallBack':(cardInfo)=>{
            this.setState({bankCardInfo:cardInfo})
        }}})
    }

    bindBtnAction(){
        const{navigator,dispatch}=this.props;
        const{bankCardInfo,drawMoney}=this.state;
        if(!bankCardInfo){ToastShort.show('请选择要提现的银行卡'); return;}
        var opt={'bank_id':bankCardInfo.id,'amount':drawMoney}
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/cash/withdrawals.do',
            opt,
            (responseData)=>{
                dispatch(NOLoadingAction());
                ToastShort.show('提现订单申请成功，等待财务专员审核');
                navigator.pop();
            },
            (error)=>{
                dispatch(NOLoadingAction());
                ToastShort.show(error);
            },
        )
    }

    turnBankCodeToBankLogo(bankCode){
        switch(bankCode){
            case 'CCB'||'ccb':
                return require('../imgs/Bank/bank_icon_ccb.png');
            case 'ABC'||'abc':
                return require('../imgs/Bank/bank_icon_abc.png');
            case 'ICBC'||'icbc':
                return require('../imgs/Bank/bank_icon_icbc.png');
            case 'BOC'||'boc':
                return require('../imgs/Bank/bank_icon_boc.png');
            case 'CMBC'||'cmbc':
                return require('../imgs/Bank/bank_icon_cmbc.png');
            case 'CMB'||'cmb':
                return require('../imgs/Bank/bank_icon_cmb.png');
            case 'CIB'||'cib':
                return require('../imgs/Bank/bank_icon_cib.png');
            case 'BCCB'||'bccb':
                return require('../imgs/Bank/bank_icon_bob.png');
            case 'BOCOM'||'bocom':
                return require('../imgs/Bank/bank_icon_bcm.png');
            case 'CEB'||'ceb':
                return require('../imgs/Bank/bank_icon_ceb.png');
            case 'GDB'||'gdb':
                return require('../imgs/Bank/bank_icon_gdb.png');
            case 'SPDB'||'spdb':
                return require('../imgs/Bank/bank_icon_spdb.png');
            case 'PSBC'||'psbc':
                return require('../imgs/Bank/bank_icon_psbc.png');
            case 'HXB'||'hxb':
                return require('../imgs/Bank/bank_icon_hxb.png');
            case 'PAB'||'pab':
                return require('../imgs/Bank/bank_icon_pab.png');
            case 'CNCB'||'cncb':
                return require('../imgs/Bank/bank_icon_cncb.png');
            case 'SRCB'||'srcb':
                return require('../imgs/Bank/bank_icon_shny.png');
            case 'BOS'||'bos':
                return require('../imgs/Bank/bank_icon_sh.png');
            case 'BOCSH'||'bocsh':
                return require('../imgs/Bank/bank_icon_boc.png');
            default:
                return require('../imgs/Bank/bank_icon_icbc.png');
        }
    }

}
var styles = StyleSheet.create({

    container:{
        height:k_Screen_Height,
        width:k_Screen_Width,
        backgroundColor:'black',
    },
    bankCardItem:{
        width:k_Screen_Width,height:60,backgroundColor:'#191919',justifyContent:'center',flexDirection:'row',alignItems:'center',
    },
    bankInfoView:{
        height:20,flexDirection:'row',alignItems:'center',
    },
    bankLogo:{
        width:20,height:20,marginLeft:12,
    },
    arrowImg:{
        width:10,height:15,
    },
    moneyItem:{
        width:k_Screen_Width,height:110,backgroundColor:'#191919',marginTop:15,
    },
    btnStyle:{
        width:k_Screen_Width-40,height:30,backgroundColor:'#d3a14a',marginLeft:20,justifyContent:'center',alignItems:'center',borderRadius:3,
    },
    generalText:{
        color:'white',fontSize:14,
    },
    generalTextContainer:{
        width:k_Screen_Width-24,height:20,marginLeft:12,justifyContent:'center',
    }
})

export default connect()(WithDraw);