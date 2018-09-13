import React, { Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    FlatList,
    Dimensions,
    TextInput,
}from 'react-native';

import {connect} from 'react-redux'
import {SubNav} from '../component';
import {BankList} from './';
import {HttpRequest,ToastShort} from '../libs'
import {BindedCardListRequestAction} from '../action/BankAction.js';
import { NOLoadingAction,LoadingAction} from '../action/LoginAction.js';

var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class BindCard extends Component {

    listHeaderComponent=()=>{
        const {username,navigator,dispatch} = this.props;
        return <BindCardContentView username={username} navigator={navigator} dispatch={dispatch}
            submitBindAction={(opt)=>this.submitBindAction(opt)}
        />

    }

    submitBindAction(opt){

    }

    render() {
        const{navigator}=this.props;  
        return (
            <View style={styles.container}>
                <SubNav title={'绑定银行卡'} navigator={navigator}/>
                <FlatList style={{flex:1,}} automaticallyAdjustContentInsets={false}
                          ListHeaderComponent={this.listHeaderComponent}/>
            </View>
        );
    }
}

var contentHeight = k_Screen_Height-64;
export class BindCardContentView extends Component{

    state={
        bankTypeCode:'',
        branch:'',
        cardNum:'',
        confirmNum:'',
    }
    bankTypeAction(){
        const {navigator} = this.props;
        navigator.push({component:BankList,passProps:{'callBack':(bankTypeCode)=>{
            this.setState({bankTypeCode:bankTypeCode})
        }}})
    }
    branchTextChangeAction(value){
        this.setState({branch:value});
        
    }

    cardNumTextChangeAction(value){
        this.setState({cardNum:value});
    }

    confirmNumTextChangeAction(value){
        this.setState({confirmNum:value});
    }

    bindBtnAction(){
        const {navigator,dispatch} = this.props;
        const {bankTypeCode,branch,cardNum,confirmNum} = this.state;
        console.log('branch=',branch);
        if(!bankTypeCode){
            alert('请选择银行类型');
            return;
        }
        if(!branch.length){
            alert('请填写开户银行支行');
            return;
        }
        if(!cardNum.length||!confirmNum.length){
            alert('请填写银行卡号');
            return;
        }
        if(cardNum !== confirmNum){
            alert('银行卡号不一致，请仔细填写');
            return;
        }
        dispatch(LoadingAction());
        HttpRequest.requestDataWithParams(
            '/cash/bank_add.do',
            {'bank_code':bankTypeCode,'yhkh':cardNum,'khhzh':branch,},
          (responseData)=>{
            ToastShort.show('绑定成功')
            dispatch(NOLoadingAction());
            dispatch(BindedCardListRequestAction());
            navigator.pop();
          },(error)=>{
            dispatch(NOLoadingAction());
            alert(error)
        });
    }
    turnBankCodeToBankName(bankCode){
        switch(bankCode){
            case 'CCB'||'ccb':
                return '建设银行';
            case 'ABC'||'abc':
                return '农业银行';
            case 'ICBC'||'icbc':
                return '工商银行';
            case 'BOC'||'boc':
                return '中国银行';
            case 'CMBC'||'cmbc':
                return '民生银行';
            case 'CMB'||'cmb':
                return '招商银行';
            case 'CIB'||'cib':
                return '兴业银行';
            case 'BCCB'||'bccb':
                return '北京银行';
            case 'BOCOM'||'bocom':
                return '交通银行';
            case 'CEB'||'ceb':
                return '中国光大银行';
            case 'GDB'||'gdb':
                return '广东发展银行';
            case 'SPDB'||'spdb':
                return '上海浦东发展银行';
            case 'PSBC'||'psbc':
                return '中国邮政';
            case 'HXB'||'hxb':
                return '深圳发展银行';
            case 'PAB'||'pab':
                return '平安银行';
            case 'CNCB'||'cncb':
                return '中信银行';
            case 'SRCB'||'srcb':
                return '上海农商银行';
            case 'BOS'||'bos':
                return '上海银行';
            case 'BOCSH'||'bocsh':
                return '中国农商银行';
            default:
                return '建设银行';
        }
    }

    render(){
        const {username} = this.props;
        const {bankTypeCode} = this.state;
        var bankTypeText=bankTypeCode.length>1 ?  this.turnBankCodeToBankName(bankTypeCode): '选择银行类型，例如：农业银行 储蓄卡';
        var bankTypeColor=bankTypeCode.length>1 ?  'white' : '#969696';
        contentHeight = k_Screen_Height-64<640 ? 640 : k_Screen_Height-64;
        return(
            <View style={{width:k_Screen_Width,height:contentHeight}}>
                <View style={{height:30,justifyContent:'center',width:k_Screen_Width-24,marginLeft:12}}>
                    <Text style={{color:'#969696'}}> 请绑定持卡人本人的银行卡</Text>
                </View>
                <View style={[styles.itemStyle,{marginTop:5}]}>
                    <View style={styles.textView}>
                        <Text style={styles.textStyle}> 持卡人</Text>
                    </View>
                    <TextInput style={styles.textInputStyle}
                           editable={false}
                           value={username}/>
                </View>
                <View style={styles.itemStyle}>
                    <TouchableHighlight onPress={()=>this.bankTypeAction()}>
                        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                            <View style={styles.textView}>
                                <Text style={styles.textStyle}> 银行类型</Text>
                            </View>
                            <View style={{height:20,width:k_Screen_Width-144,marginLeft:10,justifyContent:'center'}}>
                                <Text style={{color:bankTypeColor}} numberOfLines={1}>{bankTypeText}</Text>
                            </View>
                            <Image style={{width:10,height:15,marginLeft:10}} source={require('../imgs/Login/list_next.png')}/>
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={styles.itemStyle}>
                    <View style={styles.textView}>
                        <Text style={styles.textStyle}> 开户行</Text>
                    </View>
                    <TextInput style={styles.textInputStyle}
                           placeholder={'填写开户行 例如：北京中关村支行'}
                           placeholderTextColor={'#969696'}
                           onChangeText={(value)=>this.branchTextChangeAction(value)}/>
                </View>
                <View style={styles.itemStyle}>
                    <View style={styles.textView}>
                        <Text style={styles.textStyle}> 银行卡号</Text>
                    </View>
                    <TextInput style={styles.textInputStyle}
                           placeholder={'填写银行卡号'}
                           placeholderTextColor={'#969696'}
                           onChangeText={(value)=>this.cardNumTextChangeAction(value)}/>
                </View>
                <View style={styles.itemStyle}>
                    <View style={styles.textView}>
                        <Text style={styles.textStyle}> 确认卡号</Text>
                    </View>
                    <TextInput style={styles.textInputStyle}
                           placeholder={'确认银行卡号'}
                           placeholderTextColor={'#969696'}
                           onChangeText={(value)=>this.confirmNumTextChangeAction(value)}/>
                </View>
                <View style={{marginTop:50}}>
                    <TouchableHighlight onPress={()=>this.bindBtnAction()}>
                        <View style={styles.btnStyle}>
                            <Text style={{fontSize:16}}>提交绑定</Text>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

var styles = StyleSheet.create({

    container:{
        width:k_Screen_Width,
        height:k_Screen_Height,
        backgroundColor:'black',
    },
    itemStyle:{
        height:40,width:k_Screen_Width,backgroundColor:'#191919',marginTop:15,flexDirection:'row',alignItems:'center'
    },
    textInputStyle:{
        height:20,width:k_Screen_Width-144,marginLeft:10,color:'white',fontSize:14,
    },
    textView:{
        height:20,width:80,justifyContent:'center',marginLeft:22,
    },
    textStyle:{
        color:'white',fontSize:14,
    },
    btnStyle:{
        width:k_Screen_Width-40,height:30,backgroundColor:'#d3a14a',marginLeft:20,justifyContent:'center',alignItems:'center',borderRadius:3,
    }
})

export default connect()(BindCard);