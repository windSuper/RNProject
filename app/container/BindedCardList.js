import React, { Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Dimensions,
    FlatList,
    Alert,
}from 'react-native';

import {SubNav} from '../component';
import {connect} from 'react-redux';
import {BindedCardListRequestAction} from '../action/BankAction.js'
import {LocalDataManager} from '../libs'
import {BindCard,MyAccount} from './'


var k_Screen_Width = Dimensions.get('screen').width;
var k_Screen_Height = Dimensions.get('screen').height;
var k_Scale_Size = Dimensions.get('screen').width/320;

class BindedCardList extends Component {

    state={
        bgImgArr:[require('../imgs/Bank/bank_background1.png'),
                  require('../imgs/Bank/bank_background2.png'),
                  require('../imgs/Bank/bank_background3.png'),],
        isBindTrueName:false,
        username:'',
    }
    
    componentWillMount() {
        const{dispatch}=this.props;
        dispatch(BindedCardListRequestAction())
        LocalDataManager.queryLocalDataWithKey('userInfo',(result)=>{
            this.setState({username:result.true_name,isBindTrueName:true});
        })
    }

    render() {  
        const{navigator,bindedCardData}=this.props;  
        
        return (
            <View style={styles.container}>
                <SubNav title={'银行卡'} navigator={navigator}/>
                <TouchableHighlight onPress={()=>{this.addBankCardAction()}} underlayColor={'transparent'}>
                    <View style={styles.increaseView}>
                        <Image style={styles.increaseImg} source={require('../imgs/Bank/bank_increase.png')}/>
                        <View style={styles.increaseText}>
                            <Text style={{color:'white',fontSize:15}}>添加银行卡</Text>
                        </View>
                        <Image style={styles.arrowImg} source={require('../imgs/Login/list_next.png')}/>
                    </View>
                </TouchableHighlight>
                <FlatList style={{flex:1,marginTop:15}} automaticallyAdjustContentInsets={false}
                          data={bindedCardData}
                          keyExtractor={this.keyExtractor}
                          renderItem={this.renderListItem}
                />
            </View>
        );
    }

    addBankCardAction(){
        const {navigator}=this.props;
        const {isBindTrueName,username}=this.state;
        if(isBindTrueName){
            navigator.push({component:BindCard,passProps:{username:username}})
        }else{
            const {navigator} = this.props;
            Alert.alert(
                '提示',
                '您还未绑定真实姓名，前去我的账户进行实名绑定么？',
                [{text: '取消', onPress: () => console.log('Cancel Pressed!')},
                 {text: '确定', onPress: () => {navigator.push({component:MyAccount})}},
                ],
            )
        }
    }

    keyExtractor=(item,index)=>{
        return item.index ? item.index : index;
    }
    
    renderListItem=(item)=>{
        let index = item.index;
        let bgImg = this.state.bgImgArr[index%3];
        return <TouchableHighlight onPress={()=>this.selectedBankCard(item.item)}>
            <View style={styles.listItem}>
                <Image style={styles.listBg} source={bgImg}/>
                <View style={styles.listInfo}>
                    <Image style={styles.listBankLogo} source={this.turnBankCodeToBankLogo(item.item.banktypecode)}/>
                    <View style={styles.listCardOwnerInfo}>
                        <Text style={{color:'white',fontSize:14}}>{this.turnBankCodeToBankName(item.item.banktypecode)}</Text>
                        <Text style={{color:'white',fontSize:14,marginTop:5,}}>{item.item.cardname}</Text>
                    </View>
                    <View style={styles.listCardBranch}>
                        <Text style={{color:'white',fontSize:14}}>{item.item.branchbank}</Text>
                    </View>
                </View>
                <View style={styles.listCardNum}>
                    <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>{item.item.cardnumber}</Text>
                </View>
            </View> 
        </TouchableHighlight>
    }

    selectedBankCard(item){
        const{withDrawCallBack,navigator}=this.props;
        if(withDrawCallBack){
            withDrawCallBack(item)
            navigator.pop();
        }else{return}
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
}

var styles = StyleSheet.create({

    container:{
        width:k_Screen_Width,
        height:k_Screen_Height,
        backgroundColor:'black',
    },
    increaseView:{
        width:k_Screen_Width,height:40,backgroundColor:'#191919',flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:10,
    },
    increaseImg:{
        width:12,height:12,marginLeft:12,
    },
    increaseText:{
        width:k_Screen_Width-66,height:20,marginLeft:10,justifyContent:'center'
    },
    arrowImg:{
        width:10,height:15,marginRight:22,
    },
    listItem:{
        width:k_Screen_Width-24,height:110,marginLeft:12,backgroundColor:'transparent',marginBottom:10,
    },
    listBg:{
        position:'absolute', width:k_Screen_Width-24,height:110,resizeMode:'stretch'
    },
    listInfo:{
        width:k_Screen_Width-24,height:60,flexDirection:'row',
    },
    listBankLogo:{
        width:30,height:30,marginLeft:16,marginTop:10,
    },
    listCardOwnerInfo:{
        width:140,height:50,marginLeft:10,marginTop:10,
    },
    listCardBranch:{
        width:k_Screen_Width-240,height:20,marginLeft:10,marginTop:10,alignItems:'flex-end',
    },
    listCardNum:{
        width:k_Screen_Width-70,height:30,marginLeft:56,marginTop:10,justifyContent:'center'
    },
})
function propsFromStore(store){
    return{
        bindedCardData:store.BankReduce.bindedCardData,
    }
}

export default connect(propsFromStore)(BindedCardList);
